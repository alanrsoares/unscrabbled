import { describe, test, expect } from "vitest";
import { either } from "./misc";

describe("either", () => {
  test("true | '' => true", () => {
    const eitherFn = either(
      () => "",
      () => true
    );

    expect(eitherFn()).toBe(true);
  });

  test("should do the thing, but not", () => {
    const eitherFn = either(
      () => "",
      () => false
    );

    expect(eitherFn()).toBe(false);
  });

  test("should do the thing with parameters", () => {
    const eitherFn = either(
      (n: number) => n > 10,
      (n: number) => n < 5
    );

    expect(eitherFn(4)).toBe(true);
  });

  test("should do the thing with parameters", () => {
    const eitherFn = either(
      (n: number) => n > 10,
      (n: number) => n < 5
    );

    expect(eitherFn(4)).toBe(true);
  });
});
