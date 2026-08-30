import { describe, test, expect, vi } from "vitest";
import {
  either,
  neither,
  clamp,
  toChars,
  dedupeString,
  capitalize,
  sanitizePattern,
  toRgexp,
  memoize,
} from "./misc";

describe("misc utils", () => {
  describe("either", () => {
    test("true | '' => true", () => {
      const eitherFn = either(
        () => "",
        () => true,
      );

      expect(eitherFn()).toBe(true);
    });

    test("should do the thing, but not", () => {
      const eitherFn = either(
        () => "",
        () => false,
      );

      expect(eitherFn()).toBe(false);
    });

    test("should do the thing with parameters", () => {
      const eitherFn = either(
        (n: number) => n > 10,
        (n: number) => n < 5,
      );

      expect(eitherFn(4)).toBe(true);
      expect(eitherFn(7)).toBe(false);
      expect(eitherFn(11)).toBe(true);
    });
  });

  describe("neither", () => {
    test("false & false => true", () => {
      const neitherFn = neither(
        () => false,
        () => false,
      );
      expect(neitherFn()).toBe(true);
    });

    test("true & false => false", () => {
      const neitherFn = neither(
        () => true,
        () => false,
      );
      expect(neitherFn()).toBe(false);
    });
  });

  describe("clamp", () => {
    test("should clamp value between min and max", () => {
      expect(clamp({ min: 0, max: 10 }, 5)).toBe(5);
      expect(clamp({ min: 0, max: 10 }, -1)).toBe(0);
      expect(clamp({ min: 0, max: 10 }, 11)).toBe(10);
    });

    test("should work with partial options", () => {
      expect(clamp({ min: 5 }, 2)).toBe(5);
      expect(clamp({ max: 5 }, 10)).toBe(5);
    });
  });

  describe("toChars", () => {
    test("should convert string to lowercase char array", () => {
      expect(toChars("Hello")).toEqual(["h", "e", "l", "l", "o"]);
    });
  });

  describe("dedupeString", () => {
    test("should remove duplicate characters", () => {
      expect(dedupeString("hello")).toBe("helo");
      expect(dedupeString("Mississippi")).toBe("misp");
    });
  });

  describe("capitalize", () => {
    test("should capitalize the first letter", () => {
      expect(capitalize("hello")).toBe("Hello");
    });
  });

  describe("sanitizePattern", () => {
    test("should sanitize and slice pattern", () => {
      expect(sanitizePattern("A_B C", 5)).toBe("a*b*c");
      expect(sanitizePattern("abcdef", 3)).toBe("abc");
    });
  });

  describe("toRgexp", () => {
    test("should convert pattern with * to RegExp", () => {
      const re = toRgexp("a*c");
      expect(re.test("abc")).toBe(true);
      expect(re.test("acc")).toBe(true);
      expect(re.test("abcd")).toBe(false);
    });
  });

  describe("memoize", () => {
    test("should memoize function calls", () => {
      const fn = vi.fn((x: number) => x * 2);
      const memoized = memoize(fn);

      expect(memoized(2)).toBe(4);
      expect(memoized(2)).toBe(4);
      expect(fn).toHaveBeenCalledTimes(1);

      expect(memoized(3)).toBe(6);
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
});
