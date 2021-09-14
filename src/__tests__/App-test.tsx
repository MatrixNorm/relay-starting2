import * as React from "react";
import * as tr from "react-test-renderer";
import * as tu from "../testUtils";
import { createRootComponent } from "../App";
import { createManuallyControlledRelayEnvironment } from "../env";

describe("xxx", () => {
  test("t_1 manuallyControlledRelayEnvironment", async () => {
    const { relayEnv, pending } = createManuallyControlledRelayEnvironment();
    const Root = createRootComponent({ relayEnv });
    const renderer = tr.create(<Root />);
    console.log(pending.getAll());
    console.log(JSON.stringify(renderer.toJSON(), null, 2));

    const initialReq = pending.getByName("AppInitialQuery");
    initialReq?.resolverFn({
      composers: [{ id: "1", name: "Prokofiev", country: "Russia", works: null }],
      country: { enumValues: [{ name: "Russia" }, { name: "Austria" }] },
      workKind: { enumValues: [{ name: "Piano sonata" }, { name: "Symphony" }] },
    });
    await tu.eventLoopNextTick();
    console.log(pending.getAll());
    console.log(JSON.stringify(renderer.toJSON(), null, 2));
  });
});
