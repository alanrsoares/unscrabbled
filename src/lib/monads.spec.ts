import { describe, test, expect } from "vitest";
import { Maybe } from "./monads";

describe("Maybe monad", () => {
  test("Maybe.of should wrap a value", () => {
    const maybe = Maybe.of("hello");
    expect(maybe.isSome).toBe(true);
    expect(maybe.valueOr("default")).toBe("hello");
  });

  test("Maybe.of should handle null/undefined", () => {
    expect(Maybe.of(null).isSome).toBe(false);
    expect(Maybe.of(undefined).isSome).toBe(false);
  });

  test("Maybe.ofFalsy should handle empty string/zero", () => {
    expect(Maybe.ofFalsy("").isSome).toBe(false);
    expect(Maybe.ofFalsy(0).isSome).toBe(false);
    expect(Maybe.ofFalsy(false).isSome).toBe(false);
  });

  test("valueOr should return default value if none", () => {
    const maybe = Maybe.of<string>(null);
    expect(maybe.valueOr("default")).toBe("default");
  });

  test("map should transform the value", () => {
    const maybe = Maybe.of(2).map((n) => n * 3);
    expect(maybe.valueOr(0)).toBe(6);
  });

  test("map should not execute if none", () => {
    const maybe = Maybe.of<number>(null).map((n) => n * 3);
    expect(maybe.isSome).toBe(false);
  });

  test("mapOr should return default or transform", () => {
    expect(Maybe.of(2).mapOr(0, (n) => n * 3)).toBe(6);
    expect(Maybe.of<number>(null).mapOr(0, (n) => n * 3)).toBe(0);
  });

  test("mapOrUndefined should return undefined if none", () => {
    expect(Maybe.of(2).mapOrUndefined((n) => n * 3)).toBe(6);
    expect(Maybe.of<number>(null).mapOrUndefined((n) => n * 3)).toBe(undefined);
  });

  test("mapOrNull should return null if none", () => {
    expect(Maybe.of(2).mapOrNull((n) => n * 3)).toBe(6);
    expect(Maybe.of<number>(null).mapOrNull((n) => n * 3)).toBe(null);
  });
});
