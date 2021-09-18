import * as rrc from "react-router-config";
import * as h from "history";
import type { PreloadedQuery } from "react-relay/hooks";
import type * as rr from "react-router";

type History = h.BrowserHistory<h.State>;
export type Location = h.Location<h.State>;

export type PreloadedMatch = {
  component: any; // fuck typing
  preloaded: {
    query: PreloadedQuery<any, Record<string, unknown>>;
  } | null;
  routeData: rr.match<{}>;
};

export type RouteValue = {
  location: Location;
  preloadedMatches: PreloadedMatch[];
};

export type Router = {
  history: History;
  getValue: () => RouteValue;
  preload: (location: Location) => void;
  subscribe: (observer: Observer) => Unsubscribe;
};

type Observer = (routeValue: RouteValue) => void;
type Unsubscribe = () => void;

type RouterInternalState = {
  currentValue: RouteValue;
  nextId: number;
  subscribers: Map<number, Observer>;
};

type RouteTreeNode = {
  path?: string | undefined;
  exact?: boolean;
  component: any; // fuck typing
  preload?:
    | ((params: any, location: Location) => { query: PreloadedQuery<any> })
    | undefined;
  routes?: RouteTree | undefined;
};

export type RouteTree = RouteTreeNode[];

function isTheSameLocation(loc1: Location, loc2: Location): boolean {
  return loc1.pathname === loc2.pathname && loc1.search === loc2.search;
}

/**
 * A custom router built from the same primitives as react-router. Each object in `routes`
 * contains both a Component and a preload() function that can preload data for the component.
 * The router watches for changes to the current location via the `history` package, maps the
 * location to the corresponding route entry, and then preloads the code and data for the route.
 */
export function createRouter(
  routes: RouteTree,
  options?: any
): { cleanupFn: () => void; router: Router } {
  const history = h.createBrowserHistory(options);

  // Find the initial match and preload it
  const initialMatches = matchRoute(routes, history.location);
  const initialPreloadedMatches = preloadMatches$effect(initialMatches, history.location);

  const __state: RouterInternalState = {
    currentValue: {
      location: history.location,
      preloadedMatches: initialPreloadedMatches,
    },
    nextId: 0,
    // maintain a set of subscribers to the active entry
    subscribers: new Map(),
  };

  // Listen for location changes, match to the route entry, prepare the entry,
  // and notify subscribers. Note that this pattern ensures that data-loading
  // occurs *outside* of - and *before* - rendering.
  const cleanupFn = history.listen(({ location }) => {
    if (isTheSameLocation(location, __state.currentValue.location)) {
      return;
    }
    const matches = matchRoute(routes, location);
    const preloadedMatches = preloadMatches$effect(matches, location);

    const nextEntry: RouteValue = {
      location,
      preloadedMatches,
    };
    __state.currentValue = nextEntry;
    __state.subscribers.forEach((observer) => observer(nextEntry));
  });

  // The actual object that will be passed on the RoutingContext.
  const router: Router = {
    history,
    getValue() {
      return __state.currentValue;
    },
    preload(location: Location) {
      // preload data for a route, without storing the result
      const matches = rrc.matchRoutes(routes, location.pathname);
      preloadMatches$effect(matches, location);
    },
    subscribe(observer: any) {
      const id = __state.nextId++;
      __state.subscribers.set(id, observer);
      return () => {
        __state.subscribers.delete(id);
      };
    },
  };

  // Return both the context object and a cleanup function
  return { cleanupFn, router };
}

/**
 * Match the current location to the corresponding route entry.
 */
function matchRoute(routes: RouteTree, location: Location) {
  const matchedRoutes = rrc.matchRoutes(routes, location.pathname);
  if (!Array.isArray(matchedRoutes) || matchedRoutes.length === 0) {
    throw new Error("No route for " + location.pathname);
  }
  return matchedRoutes;
}

/**
 * Start loading the data for the matched route,
 * provided with params extracted from the route.
 */
function preloadMatches$effect(
  matches: rrc.MatchedRoute<{}, RouteTreeNode>[],
  location: Location
): PreloadedMatch[] {
  return matches.map((match) => {
    const { route, match: matchData } = match;
    const preloaded = route.preload ? route.preload(matchData.params, location) : null;
    return { component: route.component, preloaded, routeData: matchData };
  });
}
