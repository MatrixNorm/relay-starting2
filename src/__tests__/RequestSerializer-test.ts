import { RequestSerializer } from "../env";

describe("RequestSerializer", () => {
  test("t_1 first promise is unchanged", async () => {
    const rs = new RequestSerializer();
    const p = Promise.resolve();
    const resp = rs.add(p);
    expect(resp === p).toBe(true);
  });

  test("t_2 second promise starts execution after first promise is done", async () => {
    const rs = new RequestSerializer();

    let resolveP1: any;
    const p1 = () =>
      new Promise((resolve) => {
        resolveP1 = resolve;
      });

    let mockFn = jest.fn();
    const p2 = () =>
      new Promise((resolve) => {
        mockFn();
        resolve(0);
      });

    rs.add(p1);
    rs.add(p2);
    expect(mockFn.mock.calls.length).toBe(0);

    resolveP1();
    Promise.resolve().then((_) => expect(mockFn.mock.calls.length).toBe(1));
  });
});
