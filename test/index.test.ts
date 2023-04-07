import { test, expect } from "@jest/globals"
import Emitter from "../src/scripts/index"

class A extends Emitter<A, {
  test: {
    a: number
    b: string
  }
}> { }

const aa = new A;

const handler1 = () => { }
const handler2 = () => { }
const handler3 = () => { }

{
  aa.on("test", handler1);
  let count = aa['Emitter$items'].length;
  test("on(): 1", () => expect(count).toBe(1));
}

{
  aa.on("test", handler2);
  let count = aa['Emitter$items'].length;
  test("on(): 2", () => expect(count).toBe(2));
}

{
  aa.on("test", handler3);
  aa.off("test", handler3);

  let count = aa['Emitter$items'].length;
  test("off(): 2", () => expect(count).toBe(2));
}

{
  aa.off("*");

  let count = aa['Emitter$items'].length;
  test("off(*)", () => expect(count).toBe(0));
}

{
  aa.on("test", (event) => {
    test("emit(): type", () => expect(event.type).toBe("test"));
    test("emit(): target", () => expect(event.target).toBe(aa));
    test("emit(): a", () => expect(event.a).toBe(1));
    test("emit(): b", () => expect(event.b).toBe("A"));
  }, {
    once: true,
  });

  aa.emit("test", {
    a: 1,
    b: "A",
  });
}

{
  let count = aa['Emitter$items'].length;
  test("once", () => expect(count).toBe(0));
}