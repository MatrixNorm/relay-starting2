import * as React from "react";
import * as ReactDOM from "react-dom";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { createMockedRelayEnvironment as createRelayEnv } from "./env";
import { createRouter } from "./routing/Router";
import { RouterRenderer } from "./routing/RouteRenderer";
import RoutingContext from "./routing/RoutingContext";
import { getRouteTree } from "./routeTree";
import type { IEnvironment } from "relay-runtime";

function App({ env }: { env: IEnvironment }) {
  return (
    <RelayEnvironmentProvider environment={env}>
      <RoutingContext.Provider value={router}>
        <RouterRenderer />
      </RoutingContext.Provider>
    </RelayEnvironmentProvider>
  );
}

const relayEnv = createRelayEnv({ timeout: 2000 });
const { router } = createRouter(getRouteTree(relayEnv));

ReactDOM.render(<App env={relayEnv} />, document.getElementById("app"));
