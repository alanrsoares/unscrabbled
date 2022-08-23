import { memoize, neither, either } from "./misc";

const getMobileDetect = memoize((userAgent: string) => {
  const isAndroid = () => Boolean(userAgent.match(/Android/i));
  const isIos = () => Boolean(userAgent.match(/iPhone|iP(a|o)d/i));
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
  const isWindows = () => Boolean(userAgent.match(/IEMobile/i));
  const isSSR = () => userAgent === "SSR";

  const isMobile = either(isAndroid, isIos, isOpera, isWindows);

  const isDesktop = neither(isMobile, isSSR);

  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR,
  };
});

export const useMobileDetect = () => {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  return getMobileDetect(userAgent);
};
