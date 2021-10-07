import { addMocksToSchema, createMockStore } from "@graphql-tools/mock";
import * as gql from "graphql";
import * as rr from "relay-runtime";
import schema from "./schema";
import * as utils from "./utils";

const store = createMockStore({
  schema,
  mocks: {
    // Query: () => ({
    //   composers: [...new Array(2)],
    // }),
    Composer: () => ({
      name: () => {
        let goats = [
          "Beethoven",
          "Mussorgsky",
          "Prokofiev",
          "Rachmaninoff",
          "Rimsky-Korsakov",
          "Scriabin",
          "Tchaikovsky",
        ];
        return goats[Math.floor(Math.random() * goats.length)];
      },
      works: [...new Array(2)],
    }),
    Work: () => ({
      name: `Op. ${Math.floor(Math.random() * 100) + 1}`,
    }),
    ComposerWindowPaginationPage: () => ({
      items: [...new Array(9)],
    }),
  },
});

const mockedSchema = addMocksToSchema({
  schema,
  store,
  resolvers: (store) => ({
    Query: {
      composerById: (_, { composerId }) => {
        if (composerId === "__404__") {
          return null;
        }
        return store.get("Composer", composerId);
      },
      composerWindowPagination: (_, { input }) => {
        const pageNumber = input.pageNumber || 0;
        // IF gql request has variables like {} (that is
        // 'country' key is missing) then here 'country'
        // will have value of 'undefined'. But if variables
        // are like {country: undefined} then value will
        // be 'null'.
        const paginationRef: any = store.get(
          "Query",
          "ROOT",
          "composerWindowPagination",
          utils.removeNullAndUndefine({
            country: input.country,
            workKind: input.workKind,
          })
        );

        const composerRefs: any = store.get(
          "ComposerWindowPaginationPage",
          paginationRef.$ref.key,
          "items"
        );

        if (!utils.isNil(input.country)) {
          for (let ref of composerRefs) {
            store.set("Composer", ref.$ref.key, "country", input.country);
          }
        }

        // if (!ut.isNil(workKind)) {
        //   for (let ref of composerRefs) {
        //     const workRefs: any = store.get("Composer", ref.$ref.key, "works");
        //     for (let wRef of workRefs) {
        //       store.set("Work", wRef.$ref.key, "kind", workKind);
        //     }
        //   }
        // }

        return {
          pageNumber,
          pageMaxNumber: 2,
          items: composerRefs.slice(3 * pageNumber, 3 * (pageNumber + 1)),
        };
      },
    },
    Composer: {
      works: (composer, { kind }) => {
        const workRefs: any = store.get(
          "Composer",
          composer.$ref.key,
          "works",
          !utils.isNil(kind) ? { kind } : undefined
        );

        if (!utils.isNil(kind)) {
          for (let ref of workRefs) {
            store.set("Work", ref.$ref.key, "kind", kind);
          }
        }

        return workRefs;
      },
    },
  }),
});

/**
 * Environment that serializes responses.
 * Each response waits until previous response is done.
 * Every response takes equal `timeout` to simulate network delay.
 */
export class RequestSerializer {
  private latestPromise: Promise<any> | null;

  constructor() {
    this.latestPromise = null;
  }

  add(responseFn: () => Promise<any>) {
    if (this.latestPromise === null) {
      this.latestPromise = responseFn();
    } else {
      const serializedResponseFn = async () => {
        await this.latestPromise;
        return await responseFn();
      };
      this.latestPromise = serializedResponseFn();
    }
    return this.latestPromise;
  }
}

export const createMockedRelayEnvironment = (
  { timeout }: { timeout: number } = { timeout: 500 }
) => {
  const requestSerializer = new RequestSerializer();

  const fetchFn = (
    request: rr.RequestParameters,
    variables: rr.Variables
  ): Promise<rr.GraphQLResponse> => {
    return requestSerializer.add(async function () {
      await utils.sleepPromise(timeout);
      let data = gql.graphqlSync({
        schema: mockedSchema,
        source: request.text || "",
        variableValues: variables,
      });
      console.log(data);
      return data;
    }) as Promise<rr.GraphQLResponse>;
  };

  const network = rr.Network.create(fetchFn);
  const store = new rr.Store(new rr.RecordSource());
  const environment = new rr.Environment({ network, store });
  // @ts-ignore
  window.__relayStore = environment.getStore()._recordSource._records;
  return environment;
};

/**
 * This environment is useful for testing.
 *
 */

type PendingRequest = {
  request: rr.RequestParameters;
  variables: rr.Variables;
  resolverFn: (data: any) => void;
};

export const createManuallyControlledRelayEnvironment = () => {
  let __pendingResponses: PendingRequest[] = [];

  const network = rr.Network.create(
    (request: rr.RequestParameters, variables: rr.Variables) => {
      let resolverFn = (_: rr.PayloadData) => {};

      const responsePromise = new Promise((resolve) => {
        resolverFn = (data: rr.PayloadData) => {
          resolve({ data });
        };
      });

      responsePromise.finally(() => {
        const j = __pendingResponses.findIndex((pending) => {
          if (request.id) {
            return pending.request.id === request.id;
          }
          if (request.cacheID) {
            return pending.request.cacheID === request.cacheID;
          }
          return pending.request.text === request.text && pending.variables === variables;
        });
        __pendingResponses.splice(j, 1);
      });

      __pendingResponses.push({ request, variables, resolverFn });

      return responsePromise as Promise<rr.GraphQLResponse>;
    }
  );

  const store = new rr.Store(new rr.RecordSource());
  const relayEnv = new rr.Environment({ network, store });
  return {
    relayEnv,
    pending: {
      getAll() {
        return __pendingResponses;
      },
      getByName(name: string) {
        return __pendingResponses.find((pending) => pending.request.name === name);
      },
    },
  };
};
