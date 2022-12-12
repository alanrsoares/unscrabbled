import { pipe, join, split, toLower, uniq } from "rambda";

export const preventDefault = <T extends MouseEvent>(e: T) =>
  e.preventDefault();

export const clamp = ({ max = Infinity, min = -Infinity }, value: number) => {
  return value < min ? min : value > max ? max : value;
};

export const toChars = pipe(toLower, split(""));

export const dedupeString = pipe(toChars, uniq, join(""));

export const capitalize = (x: string) => x[0].toUpperCase().concat(x.slice(1));

export const sanitizePattern = (pattern: string, patternLength: number) =>
  pattern.toLowerCase().slice(0, patternLength).replaceAll(/[\s_]/gi, "*");

export const toRgexp = (pattern: string) =>
  new RegExp(`^${pattern.replaceAll("*", "\\w")}$`);

export function memoize<A extends unknown[], R>(fn: (...args: A) => R) {
  const memo = new Map<string, R>();

  return (...args: A) => {
    const key = JSON.stringify(args, null, "");

    if (memo.has(key)) {
      return memo.get(key) as R;
    }

    return fn(...args);
  };
}

export type Booleanish = boolean | string | number;

/**
 * at least one of the given functions is truthy
 *
 * @param fns {Array<() => boolean | string | number>}
 * @returns - a function that returns true if at least one of the given functions is truthy
 */
export const either = <A extends unknown[]>(
  ...fns: Array<(...args: A) => Booleanish>
) => {
  return (...args: A) => fns.some((fn) => Boolean(fn(...args)));
};

/**
 * neither of the given functions are truthy
 *
 * @param fns
 * @returns a function that returns true if none of the given functions return a falsy value
 */
export const neither = <A extends unknown[]>(
  ...fns: Array<(...args: A) => Booleanish>
) => {
  return () => !either(...fns);
};

export const withDebugger =
  <R, A extends unknown[]>(
    opts: {
      groupLabel: string;
    },
    fn: (...args: A) => R
  ) =>
  (...args: A) => {
    console.group(opts.groupLabel, args.length > 0 ? JSON.stringify(args) : "");
    console.time("speed");
    const res = fn(...args);
    console.timeEnd("speed");
    console.groupEnd();
    return res;
  };
