import { r as readable } from "./index2.js";
import { j as getContext, c as create_ssr_component, k as createEventDispatcher, h as onMount, o as onDestroy, l as add_attribute, i as escape } from "./index.js";
import ky from "ky";
import { pipe, toLower, split, uniq, join } from "rambda";
class Subscribable {
  constructor() {
    this.listeners = [];
  }
  subscribe(listener) {
    const callback = listener || (() => void 0);
    this.listeners.push(callback);
    this.onSubscribe();
    return () => {
      this.listeners = this.listeners.filter((x) => x !== callback);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.length > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}
const isServer = typeof window === "undefined";
function noop() {
  return void 0;
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function ensureQueryKeyArray(value) {
  return Array.isArray(value) ? value : [value];
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function parseQueryArgs(arg1, arg2, arg3) {
  if (!isQueryKey(arg1)) {
    return arg1;
  }
  if (typeof arg2 === "function") {
    return Object.assign(Object.assign({}, arg3), { queryKey: arg1, queryFn: arg2 });
  }
  return Object.assign(Object.assign({}, arg2), { queryKey: arg1 });
}
function parseFilterArgs(arg1, arg2, arg3) {
  return isQueryKey(arg1) ? [Object.assign(Object.assign({}, arg2), { queryKey: arg1 }), arg3] : [arg1 || {}, arg2];
}
function mapQueryStatusFilter(active, inactive) {
  if (active === true && inactive === true || active == null && inactive == null) {
    return "all";
  } else if (active === false && inactive === false) {
    return "none";
  } else {
    const isActive = active !== null && active !== void 0 ? active : !inactive;
    return isActive ? "active" : "inactive";
  }
}
function matchQuery(filters, query) {
  const { active, exact, fetching, inactive, predicate, queryKey, stale } = filters;
  if (isQueryKey(queryKey)) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  const queryStatusFilter = mapQueryStatusFilter(active, inactive);
  if (queryStatusFilter === "none") {
    return false;
  } else if (queryStatusFilter !== "all") {
    const isActive = query.isActive();
    if (queryStatusFilter === "active" && !isActive) {
      return false;
    }
    if (queryStatusFilter === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (typeof fetching === "boolean" && query.isFetching() !== fetching) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, fetching, predicate, mutationKey } = filters;
  if (isQueryKey(mutationKey)) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashQueryKey(mutation.options.mutationKey) !== hashQueryKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (typeof fetching === "boolean" && mutation.state.status === "loading" !== fetching) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = (options === null || options === void 0 ? void 0 : options.queryKeyHashFn) || hashQueryKey;
  return hashFn(queryKey);
}
function hashQueryKey(queryKey) {
  const asArray = ensureQueryKeyArray(queryKey);
  return stableValueHash(asArray);
}
function stableValueHash(value) {
  return JSON.stringify(value, (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
    result[key] = val[key];
    return result;
  }, {}) : val);
}
function partialMatchKey(a, b) {
  return partialDeepEqual(ensureQueryKeyArray(a), ensureQueryKeyArray(b));
}
function partialDeepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    return !Object.keys(b).some((key) => !partialDeepEqual(a[key], b[key]));
  }
  return false;
}
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  const array = Array.isArray(a) && Array.isArray(b);
  if (array || isPlainObject(a) && isPlainObject(b)) {
    const aSize = array ? a.length : Object.keys(a).length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      copy[key] = replaceEqualDeep(a[key], b[key]);
      if (copy[key] === a[key]) {
        equalItems++;
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b;
}
function shallowEqualObjects(a, b) {
  if (a && !b || b && !a) {
    return false;
  }
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isQueryKey(value) {
  return typeof value === "string" || Array.isArray(value);
}
function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
function scheduleMicrotask(callback) {
  Promise.resolve().then(callback).catch((error) => setTimeout(() => {
    throw error;
  }));
}
function getAbortController() {
  if (typeof AbortController === "function") {
    return new AbortController();
  }
}
class FocusManager extends Subscribable {
  constructor() {
    super();
    this.setup = (onFocus) => {
      if (!isServer && (window === null || window === void 0 ? void 0 : window.addEventListener)) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        window.addEventListener("focus", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
          window.removeEventListener("focus", listener);
        };
      }
    };
  }
  onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  }
  onUnsubscribe() {
    var _a;
    if (!this.hasListeners()) {
      (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
      this.cleanup = void 0;
    }
  }
  setEventListener(setup) {
    var _a;
    this.setup = setup;
    (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
    this.cleanup = setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    });
  }
  setFocused(focused) {
    this.focused = focused;
    if (focused) {
      this.onFocus();
    }
  }
  onFocus() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }
  isFocused() {
    if (typeof this.focused === "boolean") {
      return this.focused;
    }
    if (typeof document === "undefined") {
      return true;
    }
    return [void 0, "visible", "prerender"].includes(document.visibilityState);
  }
}
const focusManager = new FocusManager();
class OnlineManager extends Subscribable {
  constructor() {
    super();
    this.setup = (onOnline) => {
      if (!isServer && (window === null || window === void 0 ? void 0 : window.addEventListener)) {
        const listener = () => onOnline();
        window.addEventListener("online", listener, false);
        window.addEventListener("offline", listener, false);
        return () => {
          window.removeEventListener("online", listener);
          window.removeEventListener("offline", listener);
        };
      }
    };
  }
  onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  }
  onUnsubscribe() {
    var _a;
    if (!this.hasListeners()) {
      (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
      this.cleanup = void 0;
    }
  }
  setEventListener(setup) {
    var _a;
    this.setup = setup;
    (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
    this.cleanup = setup((online) => {
      if (typeof online === "boolean") {
        this.setOnline(online);
      } else {
        this.onOnline();
      }
    });
  }
  setOnline(online) {
    this.online = online;
    if (online) {
      this.onOnline();
    }
  }
  onOnline() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }
  isOnline() {
    if (typeof this.online === "boolean") {
      return this.online;
    }
    if (typeof navigator === "undefined" || typeof navigator.onLine === "undefined") {
      return true;
    }
    return navigator.onLine;
  }
}
const onlineManager = new OnlineManager();
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function isCancelable(value) {
  return typeof (value === null || value === void 0 ? void 0 : value.cancel) === "function";
}
class CancelledError {
  constructor(options) {
    this.revert = options === null || options === void 0 ? void 0 : options.revert;
    this.silent = options === null || options === void 0 ? void 0 : options.silent;
  }
}
function isCancelledError(value) {
  return value instanceof CancelledError;
}
class Retryer {
  constructor(config) {
    let cancelRetry = false;
    let cancelFn;
    let continueFn;
    let promiseResolve;
    let promiseReject;
    this.abort = config.abort;
    this.cancel = (cancelOptions) => cancelFn === null || cancelFn === void 0 ? void 0 : cancelFn(cancelOptions);
    this.cancelRetry = () => {
      cancelRetry = true;
    };
    this.continueRetry = () => {
      cancelRetry = false;
    };
    this.continue = () => continueFn === null || continueFn === void 0 ? void 0 : continueFn();
    this.failureCount = 0;
    this.isPaused = false;
    this.isResolved = false;
    this.isTransportCancelable = false;
    this.promise = new Promise((outerResolve, outerReject) => {
      promiseResolve = outerResolve;
      promiseReject = outerReject;
    });
    const resolve = (value) => {
      var _a;
      if (!this.isResolved) {
        this.isResolved = true;
        (_a = config.onSuccess) === null || _a === void 0 ? void 0 : _a.call(config, value);
        continueFn === null || continueFn === void 0 ? void 0 : continueFn();
        promiseResolve(value);
      }
    };
    const reject = (value) => {
      var _a;
      if (!this.isResolved) {
        this.isResolved = true;
        (_a = config.onError) === null || _a === void 0 ? void 0 : _a.call(config, value);
        continueFn === null || continueFn === void 0 ? void 0 : continueFn();
        promiseReject(value);
      }
    };
    const pause = () => {
      return new Promise((continueResolve) => {
        var _a;
        continueFn = continueResolve;
        this.isPaused = true;
        (_a = config.onPause) === null || _a === void 0 ? void 0 : _a.call(config);
      }).then(() => {
        var _a;
        continueFn = void 0;
        this.isPaused = false;
        (_a = config.onContinue) === null || _a === void 0 ? void 0 : _a.call(config);
      });
    };
    const run = () => {
      if (this.isResolved) {
        return;
      }
      let promiseOrValue;
      try {
        promiseOrValue = config.fn();
      } catch (error) {
        promiseOrValue = Promise.reject(error);
      }
      cancelFn = (cancelOptions) => {
        var _a;
        if (!this.isResolved) {
          reject(new CancelledError(cancelOptions));
          (_a = this.abort) === null || _a === void 0 ? void 0 : _a.call(this);
          if (isCancelable(promiseOrValue)) {
            try {
              promiseOrValue.cancel();
            } catch (_b) {
            }
          }
        }
      };
      this.isTransportCancelable = isCancelable(promiseOrValue);
      Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
        var _a, _b, _c;
        if (this.isResolved) {
          return;
        }
        const retry = (_a = config.retry) !== null && _a !== void 0 ? _a : 3;
        const retryDelay = (_b = config.retryDelay) !== null && _b !== void 0 ? _b : defaultRetryDelay;
        const delay = typeof retryDelay === "function" ? retryDelay(this.failureCount, error) : retryDelay;
        const shouldRetry = retry === true || typeof retry === "number" && this.failureCount < retry || typeof retry === "function" && retry(this.failureCount, error);
        if (cancelRetry || !shouldRetry) {
          reject(error);
          return;
        }
        this.failureCount++;
        (_c = config.onFail) === null || _c === void 0 ? void 0 : _c.call(config, this.failureCount, error);
        sleep(delay).then(() => {
          if (!focusManager.isFocused() || !onlineManager.isOnline()) {
            return pause();
          }
        }).then(() => {
          if (cancelRetry) {
            reject(error);
          } else {
            run();
          }
        });
      });
    };
    run();
  }
}
class NotifyManager {
  constructor() {
    this.queue = [];
    this.transactions = 0;
    this.notifyFn = (callback) => {
      callback();
    };
    this.batchNotifyFn = (callback) => {
      callback();
    };
  }
  batch(callback) {
    let result;
    this.transactions++;
    try {
      result = callback();
    } finally {
      this.transactions--;
      if (!this.transactions) {
        this.flush();
      }
    }
    return result;
  }
  schedule(callback) {
    if (this.transactions) {
      this.queue.push(callback);
    } else {
      scheduleMicrotask(() => {
        this.notifyFn(callback);
      });
    }
  }
  batchCalls(callback) {
    return (...args) => {
      this.schedule(() => {
        callback(...args);
      });
    };
  }
  flush() {
    const queue = this.queue;
    this.queue = [];
    if (queue.length) {
      scheduleMicrotask(() => {
        this.batchNotifyFn(() => {
          queue.forEach((callback) => {
            this.notifyFn(callback);
          });
        });
      });
    }
  }
  setNotifyFunction(fn) {
    this.notifyFn = fn;
  }
  setBatchNotifyFunction(fn) {
    this.batchNotifyFn = fn;
  }
}
const notifyManager = new NotifyManager();
let logger = console;
function getLogger() {
  return logger;
}
class QueryObserver extends Subscribable {
  constructor(client2, options) {
    super();
    this.client = client2;
    this.options = options;
    this.trackedProps = [];
    this.previousSelectError = null;
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.remove = this.remove.bind(this);
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.length === 1) {
      this.currentQuery.addObserver(this);
      if (shouldFetchOnMount(this.currentQuery, this.options)) {
        this.executeFetch();
      }
      this.updateTimers();
    }
  }
  onUnsubscribe() {
    if (!this.listeners.length) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOnReconnect(this.currentQuery, this.options);
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOnWindowFocus(this.currentQuery, this.options);
  }
  destroy() {
    this.listeners = [];
    this.clearTimers();
    this.currentQuery.removeObserver(this);
  }
  setOptions(options, notifyOptions) {
    const prevOptions = this.options;
    const prevQuery = this.currentQuery;
    this.options = this.client.defaultQueryObserverOptions(options);
    if (typeof this.options.enabled !== "undefined" && typeof this.options.enabled !== "boolean") {
      throw new Error("Expected enabled to be a boolean");
    }
    if (!this.options.queryKey) {
      this.options.queryKey = prevOptions.queryKey;
    }
    this.updateQuery();
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(this.currentQuery, prevQuery, this.options, prevOptions)) {
      this.executeFetch();
    }
    this.updateResult(notifyOptions);
    if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || this.options.staleTime !== prevOptions.staleTime)) {
      this.updateStaleTimeout();
    }
    const nextRefetchInterval = this.computeRefetchInterval();
    if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || nextRefetchInterval !== this.currentRefetchInterval)) {
      this.updateRefetchInterval(nextRefetchInterval);
    }
  }
  updateOptions(options, notifyOptions) {
    const mergedOptions = Object.assign(Object.assign({}, this.options), options);
    if (options.queryKey && !options.queryHash && options.queryKey !== this.options.queryKey) {
      mergedOptions.queryHash = hashQueryKeyByOptions(options.queryKey, mergedOptions);
    }
    this.setOptions(mergedOptions, notifyOptions);
  }
  getOptimisticResult(options) {
    const defaultedOptions = this.client.defaultQueryObserverOptions(options);
    const query = this.client.getQueryCache().build(this.client, defaultedOptions);
    return this.createResult(query, defaultedOptions);
  }
  getCurrentResult() {
    return this.currentResult;
  }
  trackResult(result, defaultedOptions) {
    const trackedResult = {};
    const trackProp = (key) => {
      if (!this.trackedProps.includes(key)) {
        this.trackedProps.push(key);
      }
    };
    Object.keys(result).forEach((key) => {
      Object.defineProperty(trackedResult, key, {
        configurable: false,
        enumerable: true,
        get: () => {
          trackProp(key);
          return result[key];
        }
      });
    });
    if (defaultedOptions.useErrorBoundary || defaultedOptions.suspense) {
      trackProp("error");
    }
    return trackedResult;
  }
  getNextResult(options) {
    return new Promise((resolve, reject) => {
      const unsubscribe = this.subscribe((result) => {
        if (!result.isFetching) {
          unsubscribe();
          if (result.isError && (options === null || options === void 0 ? void 0 : options.throwOnError)) {
            reject(result.error);
          } else {
            resolve(result);
          }
        }
      });
    });
  }
  getCurrentQuery() {
    return this.currentQuery;
  }
  remove() {
    this.client.getQueryCache().remove(this.currentQuery);
  }
  refetch(options) {
    return this.fetch(Object.assign(Object.assign({}, options), { meta: { refetchPage: options === null || options === void 0 ? void 0 : options.refetchPage } }));
  }
  fetchOptimistic(options) {
    const defaultedOptions = this.client.defaultQueryObserverOptions(options);
    const query = this.client.getQueryCache().build(this.client, defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return this.executeFetch(fetchOptions).then(() => {
      this.updateResult();
      return this.currentResult;
    });
  }
  executeFetch(fetchOptions) {
    this.updateQuery();
    let promise = this.currentQuery.fetch(this.options, fetchOptions);
    if (!(fetchOptions === null || fetchOptions === void 0 ? void 0 : fetchOptions.throwOnError)) {
      promise = promise.catch(noop);
    }
    return promise;
  }
  updateStaleTimeout() {
    this.clearStaleTimeout();
    if (isServer || this.currentResult.isStale || !isValidTimeout(this.options.staleTime)) {
      return;
    }
    const time = timeUntilStale(this.currentResult.dataUpdatedAt, this.options.staleTime);
    const timeout = time + 1;
    this.staleTimeoutId = setTimeout(() => {
      if (!this.currentResult.isStale) {
        this.updateResult();
      }
    }, timeout);
  }
  computeRefetchInterval() {
    var _a;
    return typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.currentResult.data, this.currentQuery) : (_a = this.options.refetchInterval) !== null && _a !== void 0 ? _a : false;
  }
  updateRefetchInterval(nextInterval) {
    this.clearRefetchInterval();
    this.currentRefetchInterval = nextInterval;
    if (isServer || this.options.enabled === false || !isValidTimeout(this.currentRefetchInterval) || this.currentRefetchInterval === 0) {
      return;
    }
    this.refetchIntervalId = setInterval(() => {
      if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
        this.executeFetch();
      }
    }, this.currentRefetchInterval);
  }
  updateTimers() {
    this.updateStaleTimeout();
    this.updateRefetchInterval(this.computeRefetchInterval());
  }
  clearTimers() {
    this.clearStaleTimeout();
    this.clearRefetchInterval();
  }
  clearStaleTimeout() {
    clearTimeout(this.staleTimeoutId);
    this.staleTimeoutId = void 0;
  }
  clearRefetchInterval() {
    clearInterval(this.refetchIntervalId);
    this.refetchIntervalId = void 0;
  }
  createResult(query, options) {
    var _a;
    const prevQuery = this.currentQuery;
    const prevOptions = this.options;
    const prevResult = this.currentResult;
    const prevResultState = this.currentResultState;
    const prevResultOptions = this.currentResultOptions;
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : this.currentQueryInitialState;
    const prevQueryResult = queryChange ? this.currentResult : this.previousQueryResult;
    const { state } = query;
    let { dataUpdatedAt, error, errorUpdatedAt, isFetching, status } = state;
    let isPreviousData = false;
    let isPlaceholderData = false;
    let data;
    if (options.optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        isFetching = true;
        if (!dataUpdatedAt) {
          status = "loading";
        }
      }
    }
    if (options.keepPreviousData && !state.dataUpdateCount && (prevQueryResult === null || prevQueryResult === void 0 ? void 0 : prevQueryResult.isSuccess) && status !== "error") {
      data = prevQueryResult.data;
      dataUpdatedAt = prevQueryResult.dataUpdatedAt;
      status = prevQueryResult.status;
      isPreviousData = true;
    } else if (options.select && typeof state.data !== "undefined") {
      if (prevResult && state.data === (prevResultState === null || prevResultState === void 0 ? void 0 : prevResultState.data) && options.select === ((_a = this.previousSelect) === null || _a === void 0 ? void 0 : _a.fn) && !this.previousSelectError) {
        data = this.previousSelect.result;
      } else {
        try {
          data = options.select(state.data);
          if (options.structuralSharing !== false) {
            data = replaceEqualDeep(prevResult === null || prevResult === void 0 ? void 0 : prevResult.data, data);
          }
          this.previousSelect = {
            fn: options.select,
            result: data
          };
          this.previousSelectError = null;
        } catch (selectError) {
          getLogger().error(selectError);
          error = selectError;
          this.previousSelectError = selectError;
          errorUpdatedAt = Date.now();
          status = "error";
        }
      }
    } else {
      data = state.data;
    }
    if (typeof options.placeholderData !== "undefined" && typeof data === "undefined" && (status === "loading" || status === "idle")) {
      let placeholderData;
      if ((prevResult === null || prevResult === void 0 ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions === null || prevResultOptions === void 0 ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData() : options.placeholderData;
        if (options.select && typeof placeholderData !== "undefined") {
          try {
            placeholderData = options.select(placeholderData);
            if (options.structuralSharing !== false) {
              placeholderData = replaceEqualDeep(prevResult === null || prevResult === void 0 ? void 0 : prevResult.data, placeholderData);
            }
            this.previousSelectError = null;
          } catch (selectError) {
            getLogger().error(selectError);
            error = selectError;
            this.previousSelectError = selectError;
            errorUpdatedAt = Date.now();
            status = "error";
          }
        }
      }
      if (typeof placeholderData !== "undefined") {
        status = "success";
        data = placeholderData;
        isPlaceholderData = true;
      }
    }
    const result = {
      status,
      isLoading: status === "loading",
      isSuccess: status === "success",
      isError: status === "error",
      isIdle: status === "idle",
      data,
      dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: state.fetchFailureCount,
      isFetched: state.dataUpdateCount > 0 || state.errorUpdateCount > 0,
      isFetchedAfterMount: state.dataUpdateCount > queryInitialState.dataUpdateCount || state.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && status !== "loading",
      isLoadingError: status === "error" && state.dataUpdatedAt === 0,
      isPlaceholderData,
      isPreviousData,
      isRefetchError: status === "error" && state.dataUpdatedAt !== 0,
      isStale: isStale(query, options),
      refetch: this.refetch,
      remove: this.remove
    };
    return result;
  }
  shouldNotifyListeners(result, prevResult) {
    if (!prevResult) {
      return true;
    }
    const { notifyOnChangeProps, notifyOnChangePropsExclusions } = this.options;
    if (!notifyOnChangeProps && !notifyOnChangePropsExclusions) {
      return true;
    }
    if (notifyOnChangeProps === "tracked" && !this.trackedProps.length) {
      return true;
    }
    const includedProps = notifyOnChangeProps === "tracked" ? this.trackedProps : notifyOnChangeProps;
    return Object.keys(result).some((key) => {
      const typedKey = key;
      const changed = result[typedKey] !== prevResult[typedKey];
      const isIncluded = includedProps === null || includedProps === void 0 ? void 0 : includedProps.some((x) => x === key);
      const isExcluded = notifyOnChangePropsExclusions === null || notifyOnChangePropsExclusions === void 0 ? void 0 : notifyOnChangePropsExclusions.some((x) => x === key);
      return changed && !isExcluded && (!includedProps || isIncluded);
    });
  }
  updateResult(notifyOptions) {
    const prevResult = this.currentResult;
    this.currentResult = this.createResult(this.currentQuery, this.options);
    this.currentResultState = this.currentQuery.state;
    this.currentResultOptions = this.options;
    if (shallowEqualObjects(this.currentResult, prevResult)) {
      return;
    }
    const defaultNotifyOptions = { cache: true };
    if ((notifyOptions === null || notifyOptions === void 0 ? void 0 : notifyOptions.listeners) !== false && this.shouldNotifyListeners(this.currentResult, prevResult)) {
      defaultNotifyOptions.listeners = true;
    }
    this.notify(Object.assign(Object.assign({}, defaultNotifyOptions), notifyOptions));
  }
  updateQuery() {
    const query = this.client.getQueryCache().build(this.client, this.options);
    if (query === this.currentQuery) {
      return;
    }
    const prevQuery = this.currentQuery;
    this.currentQuery = query;
    this.currentQueryInitialState = query.state;
    this.previousQueryResult = this.currentResult;
    if (this.hasListeners()) {
      prevQuery === null || prevQuery === void 0 ? void 0 : prevQuery.removeObserver(this);
      query.addObserver(this);
    }
  }
  onQueryUpdate(action) {
    const notifyOptions = {};
    if (action.type === "success") {
      notifyOptions.onSuccess = true;
    } else if (action.type === "error" && !isCancelledError(action.error)) {
      notifyOptions.onError = true;
    }
    this.updateResult(notifyOptions);
    if (this.hasListeners()) {
      this.updateTimers();
    }
  }
  notify(notifyOptions) {
    notifyManager.batch(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      if (notifyOptions.onSuccess) {
        (_b = (_a = this.options).onSuccess) === null || _b === void 0 ? void 0 : _b.call(_a, this.currentResult.data);
        (_d = (_c = this.options).onSettled) === null || _d === void 0 ? void 0 : _d.call(_c, this.currentResult.data, null);
      } else if (notifyOptions.onError) {
        (_f = (_e = this.options).onError) === null || _f === void 0 ? void 0 : _f.call(_e, this.currentResult.error);
        (_h = (_g = this.options).onSettled) === null || _h === void 0 ? void 0 : _h.call(_g, void 0, this.currentResult.error);
      }
      if (notifyOptions.listeners) {
        this.listeners.forEach((listener) => {
          listener(this.currentResult);
        });
      }
      if (notifyOptions.cache) {
        this.client.getQueryCache().notify({ query: this.currentQuery, type: "observerResultsUpdated" });
      }
    });
  }
}
function shouldLoadOnMount(query, options) {
  return options.enabled !== false && !query.state.dataUpdatedAt && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldRefetchOnMount(query, options) {
  return options.enabled !== false && query.state.dataUpdatedAt > 0 && (options.refetchOnMount === "always" || options.refetchOnMount !== false && isStale(query, options));
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || shouldRefetchOnMount(query, options);
}
function shouldFetchOnReconnect(query, options) {
  return options.enabled !== false && (options.refetchOnReconnect === "always" || options.refetchOnReconnect !== false && isStale(query, options));
}
function shouldFetchOnWindowFocus(query, options) {
  return options.enabled !== false && (options.refetchOnWindowFocus === "always" || options.refetchOnWindowFocus !== false && isStale(query, options));
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return options.enabled !== false && (query !== prevQuery || prevOptions.enabled === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return query.isStaleByTime(options.staleTime);
}
function useQueryClient() {
  const queryClient = getContext("queryClient");
  if (!queryClient) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }
  return queryClient;
}
function setBatchCalls(options) {
  options.optimisticResults = true;
  if (options.onError) {
    options.onError = notifyManager.batchCalls(options.onError);
  }
  if (options.onSuccess) {
    options.onSuccess = notifyManager.batchCalls(options.onSuccess);
  }
  if (options.onSettled) {
    options.onSettled = notifyManager.batchCalls(options.onSettled);
  }
  return options;
}
function useQuery(arg1, arg2, arg3) {
  const options = parseQueryArgs(arg1, arg2, arg3);
  const client2 = useQueryClient();
  let defaultedOptions = client2.defaultQueryObserverOptions(options);
  defaultedOptions = setBatchCalls(defaultedOptions);
  const observer = new QueryObserver(client2, defaultedOptions);
  const { subscribe } = readable(observer.getCurrentResult(), (set) => {
    return observer.subscribe(notifyManager.batchCalls(set));
  });
  observer.updateResult();
  function setOptions(arg12, arg22, arg32) {
    const options2 = parseQueryArgs(arg12, arg22, arg32);
    let defaultedOptions2 = client2.defaultQueryObserverOptions(options2);
    defaultedOptions2 = setBatchCalls(defaultedOptions2);
    if (observer.hasListeners()) {
      observer.setOptions(defaultedOptions2, { listeners: false });
    }
  }
  function updateOptions(options2) {
    observer.updateOptions(options2);
  }
  function setEnabled(enabled) {
    updateOptions({ enabled });
  }
  return { subscribe, setOptions, updateOptions, setEnabled };
}
const toChars = pipe(toLower, split(""));
const dedupeString = pipe(toChars, uniq, join(""));
const capitalize = (x) => x[0].toUpperCase().concat(x.slice(1));
const sanitizePattern = (pattern, patternLength) => pattern.toLowerCase().slice(0, patternLength).replaceAll(/[\s_]/gi, "*");
const toRgexp = (pattern) => new RegExp(`^${pattern.replaceAll("*", "\\w")}$`);
function memoize(fn) {
  const memo = /* @__PURE__ */ new Map();
  return (...args) => {
    const key = JSON.stringify(args, null, "");
    if (memo.has(key)) {
      return memo.get(key);
    }
    return fn(...args);
  };
}
const either = (...fns) => {
  return (...args) => fns.some((fn) => Boolean(fn(...args)));
};
const neither = (...fns) => {
  return () => !either(...fns);
};
const withDebugger = (opts, fn) => (...args) => {
  console.group(opts.groupLabel, args.length > 0 ? JSON.stringify(args) : "");
  console.time("speed");
  const res = fn(...args);
  console.timeEnd("speed");
  console.groupEnd();
  return res;
};
class Maybe {
  _value;
  _isNone = false;
  constructor(value) {
    this._value = value;
    this._isNone = value === null || value === void 0;
  }
  static of(value) {
    return new Maybe(value);
  }
  static ofFalsy(value) {
    return new Maybe(value ? value : void 0);
  }
  get isSome() {
    return this._isNone === false;
  }
  valueOr(defaultValue) {
    if (this.isSome) {
      return this._value;
    }
    return defaultValue;
  }
  map(fn) {
    if (this.isSome) {
      return Maybe.of(fn(this._value));
    }
    return new Maybe(void 0);
  }
  mapOr(defaultValue, fn) {
    if (this.isSome) {
      return fn(this._value);
    }
    return defaultValue;
  }
  mapOrUndefined(fn) {
    return this.mapOr(void 0, fn);
  }
  mapOrNull(fn) {
    return this.mapOr(null, fn);
  }
}
const client = ky.extend({
  cache: "force-cache"
});
class ArgumentMissingException extends Error {
  constructor(argumentName) {
    super(`Argument missing: '${argumentName}'`);
  }
}
class DefinitionNotFoundException extends Error {
  constructor(word) {
    super(`Definition not found for: '${word}'`);
  }
}
const getWordDefinition = withDebugger(
  {
    groupLabel: "getWordDefinition"
  },
  async (word) => {
    try {
      if (!word) {
        throw new ArgumentMissingException("word");
      }
      const [initial] = [...word];
      const indexed = await client.get(`/db/dictionary/${initial}.json`).json();
      if (word in indexed) {
        return indexed[word];
      }
      throw new DefinitionNotFoundException(word);
    } catch (error) {
      if (error instanceof ArgumentMissingException || error instanceof DefinitionNotFoundException) {
        throw error;
      }
      throw new Error("Unknown Error: failed to fetch word definition", {
        cause: error
      });
    }
  }
);
const getWordsByLength = withDebugger(
  {
    groupLabel: "geWordsByLength"
  },
  async (length, pattern) => {
    try {
      const all2 = await client.get(`/db/words/by-length/${length}.json`).json();
      return Maybe.of(pattern).mapOr(
        all2,
        (pattern2) => all2.filter((word) => pattern2.test(word))
      );
    } catch (error) {
      return [];
    }
  }
);
const getMeta = async () => {
  return client.get("/meta.json").json();
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { title } = $$props;
  let { subtitle = "" } = $$props;
  let { open = false } = $$props;
  const dispatch = createEventDispatcher();
  const close = () => {
    if (!open)
      return;
    open = false;
    dispatch("close", false);
  };
  const onKeydown = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };
  onMount(() => {
    if (typeof document === "undefined")
      return;
    document.addEventListener("keydown", onKeydown);
  });
  onDestroy(() => {
    if (typeof document === "undefined")
      return;
    document.removeEventListener("keydown", onKeydown);
  });
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0)
    $$bindings.subtitle(subtitle);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  return `<input type="${"checkbox"}"${add_attribute("id", id, 0)} class="${"modal-toggle"}"${add_attribute("checked", open, 1)}>

<div role="${"dialog"}" class="${"modal modal-bottom sm:modal-middle"}"><div${add_attribute("class", "modal-box relative" + $$props.class, 0)}><button${add_attribute("for", id, 0)} class="${"btn btn-sm btn-circle absolute right-2 top-2 focus:ring"}" aria-label="${"Close modal"}">\u2A2F
    </button>
    ${slots.title ? slots.title({}) : `
      ${title ? `<h3 class="${"text-lg font-bold"}">${escape(title)}</h3>
        ${subtitle ? `<small class="${"text-sm text-gray-500"}">${escape(subtitle)}</small>` : ``}` : ``}
    `}
    ${slots.body ? slots.body({}) : `
      <p class="${"py-4"}">${slots.default ? slots.default({}) : ``}</p>
    `}</div></div>`;
});
export {
  capitalize as A,
  dedupeString as B,
  toRgexp as C,
  sanitizePattern as D,
  getWordsByLength as E,
  toChars as F,
  Modal as M,
  Retryer as R,
  Subscribable as S,
  isCancelledError as a,
  getLogger as b,
  notifyManager as c,
  matchMutation as d,
  ensureQueryKeyArray as e,
  functionalUpdate as f,
  getAbortController as g,
  hashQueryKeyByOptions as h,
  isValidTimeout as i,
  isCancelable as j,
  focusManager as k,
  parseQueryArgs as l,
  matchQuery as m,
  noop as n,
  onlineManager as o,
  parseFilterArgs as p,
  hashQueryKey as q,
  replaceEqualDeep as r,
  partialMatchKey as s,
  timeUntilStale as t,
  useQuery as u,
  getMeta as v,
  memoize as w,
  either as x,
  neither as y,
  getWordDefinition as z
};
