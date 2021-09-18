import * as React from "react";
import { useContext, useEffect, useState } from "react";
import RoutingContext from "./RoutingContext";
import type { PreloadedMatch, RouteValue } from "./Router";

/**
 * The `component` property from the route entry is a Resource, which may or may not be ready.
 * We use a helper child component to unwrap the resource with component.read(), and then
 * render it if its ready.
 *
 * NOTE: calling routeEntry.route.component.read() directly in RouteRenderer wouldn't work the
 * way we'd expect. Because that method could throw - either suspending or on error - the error
 * would bubble up to the *caller* of RouteRenderer. We want the suspend/error to bubble up to
 * our ErrorBoundary/Suspense components, so we have to ensure that the suspend/error happens
 * in a child component.
 */
function RouteComponent(props: PreloadedMatch & { children?: JSX.Element | null }) {
  const { component, children, routeData, preloaded } = props;
  return React.createElement(component, {
    preloadedQuery: preloaded?.query,
    routeData,
    children,
  });
}

/**
 * A component that accesses the current route entry from RoutingContext and renders
 * that entry.
 */
export function RouterRenderer() {
  const router = useContext(RoutingContext);
  const [routeValue, setRouteValue] = useState(router.getValue());

  useEffect(() => {
    // Check if the route has changed between the last render and commit:
    const currentValue = router.getValue();
    if (currentValue !== routeValue) {
      // if there was a concurrent modification, re-render and exit
      setRouteValue(currentValue);
      return;
    }
    // If there *wasn't* a concurrent change to the route, then the UI
    // is current: subscribe for subsequent route updates
    const dispose = router.subscribe((nextValue: RouteValue) => {
      setRouteValue(nextValue);
    });
    return dispose;
  }, [router]);

  // The current route value is an array of matching entries - one entry per
  // level of routes (to allow nested routes). We have to map each one to a
  // RouteComponent to allow suspending, and also pass its children correctly.
  // Conceptually, we want this structure:
  // ```
  // <RouteComponent
  //   component={entry[0].component}
  //   prepared={entry[0].prepared}>
  //   <RouteComponent
  //     component={entry[1].component}
  //     prepared={entry[1].prepared}>
  //       // continue for nested items...
  //   </RouteComponent>
  // </RouteComponent>
  // ```

  return routeValue.preloadedMatches.reduceRight<JSX.Element | null>((acc, match) => {
    const comp = <RouteComponent {...match}>{acc}</RouteComponent>;
    return match.preloaded?.query ? (
      <React.Suspense fallback={"Loading..."}>{comp}</React.Suspense>
    ) : (
      comp
    );
  }, null);
}
