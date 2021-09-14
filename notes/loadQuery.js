function loadQuery(environment, preloadableRequest, variables) {
  //
  let unsubscribeFromExecution;
  let didMakeNetworkRequest = false;
  //
  const checkAvailabilityAndExecute = (concreteRequest) => {
    const operation = createOperationDescriptor(
      concreteRequest,
      variables,
      networkCacheConfig
    );
    retainReference = environment.retain(operation);

    // N.B. If the fetch policy allows fulfillment from the store but the
    // environment already has the data for that operation cached in the store,
    // then we do nothing.
    const shouldFetch =
      fetchPolicy !== "store-or-network" ||
      environment.check(operation).status !== "available";
    
    if (shouldFetch) {
      executeDeduped(operation, () => {
        // N.B. Since we have the operation synchronously available here,
        // we can immediately fetch and execute the operation.
        const networkObservable = makeNetworkRequest(concreteRequest.params);
        const executeObservable = executeWithNetworkSource(operation, networkObservable);
        return executeObservable;
      });
    }
  };

  const executeDeduped = (operation, fetchFn) => {
    didMakeNetworkRequest = true;

    ({ unsubscribe: unsubscribeFromExecution } = fetchQueryDeduped(
      environment,
      operation.request.identifier,
      fetchFn
    ).subscribe({
      error(err) {
        executionSubject.error(err);
      },
      next(data) {
        executionSubject.next(data);
      },
      complete() {
        executionSubject.complete();
      },
    }));
  };

  const makeNetworkRequest = (params) => {
    didMakeNetworkRequest = true;

    let observable;
    const subject = new ReplaySubject();
    const identifier = "raw-network-request-" + getRequestIdentifier(params, variables);
    observable = fetchQueryDeduped(environment, identifier, () => {
      const network = environment.getNetwork();
      return network.execute(params, variables, networkCacheConfig);
    });

    const { unsubscribe } = observable.subscribe({
      error(err) {
        networkError = err;
        subject.error(err);
      },
      next(data) {
        subject.next(data);
      },
      complete() {
        subject.complete();
      },
    });
    unsubscribeFromNetworkRequest = unsubscribe;
    return Observable.create((sink) => {
      const subjectSubscription = subject.subscribe(sink);
      return () => {
        subjectSubscription.unsubscribe();
        unsubscribeFromNetworkRequest();
      };
    });
  };

  const graphQlTaggedNode = preloadableRequest;
  const request = getRequest(graphQlTaggedNode);
  params = request.params;
  queryId = params.cacheID != null ? params.cacheID : params.id;
  checkAvailabilityAndExecute(request);

  return {
    kind: "PreloadedQuery",
    environment,
    dispose() {
      if (isDisposed) {
        return;
      }
      releaseQuery();
      cancelNetworkRequest();
      isDisposed = true;
    },
    releaseQuery,
    cancelNetworkRequest,
    fetchKey,
    id: queryId,
    get isDisposed() {
      return isDisposed || isReleased;
    },
    get networkError() {
      return networkError;
    },
    name: params.name,
    networkCacheConfig,
    fetchPolicy,
    source: didMakeNetworkRequest ? returnedObservable : undefined,
    variables,
  };
}
