import * as h from "history";

describe("****", () => {
  test("t_1", () => {
    const p1 = Promise.resolve(1);
    console.log(p1);
    const x = (async () => {
      console.log("A");
      await p1;
      console.log("C");
    })();

    x.then(() => {
      console.log("D");
    });

    console.log("B");
  });

  test("t_2", () => {
    const p1 = Promise.resolve();
    const p2 = Promise.resolve();

    const x = (async () => {
      console.log("A");
      await p1;
      console.log("C");
      await p2;
      console.log("D");
    })();

    x.then(() => {
      console.log("E");
    });

    console.log("B");
  });

  test("t_h1 history bug", () => {
    const history = h.createMemoryHistory();
    history.push("/composers?country=Russia");
    history.push("/composers");
    expect(history.location.search).toEqual("");
  });

  test("t_h2 history bug walk-around", () => {
    const history = h.createMemoryHistory();
    history.push("/composers?country=Russia");
    history.push({ pathname: "/composers", search: "" });
    expect(history.location.search).toEqual("");
  });
});
