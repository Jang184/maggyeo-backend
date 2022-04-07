import { sayHello } from "./handler";

test("say hello", () => {
    expect(sayHello()).toEqual("hello");
});
