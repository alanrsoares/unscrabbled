var Xe=Object.defineProperty;var $e=(s,e,t)=>e in s?Xe(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var z=(s,e,t)=>($e(s,typeof e!="symbol"?e+"":e,t),t);import{Y as et,Z as tt,S as st,i as rt,s as nt,C as W,k as T,a as I,q as ne,l as k,c as U,m as j,r as ie,h as R,n as w,b as E,V as C,M as Q,_ as le,D as J,E as Y,F as G,f as Z,t as X,$ as it,a0 as ot,o as at,H as ut,I as ce,Q as he,e as x,u as Qe}from"./index-9c0b09c1.js";class oe{constructor(){this.listeners=[]}subscribe(e){const t=e||(()=>{});return this.listeners.push(t),this.onSubscribe(),()=>{this.listeners=this.listeners.filter(r=>r!==t),this.onUnsubscribe()}}hasListeners(){return this.listeners.length>0}onSubscribe(){}onUnsubscribe(){}}const M=typeof window>"u";function lt(){}function is(s,e){return typeof s=="function"?s(e):s}function fe(s){return typeof s=="number"&&s>=0&&s!==1/0}function $(s){return Array.isArray(s)?s:[s]}function ct(s,e){return Math.max(s+(e||0)-Date.now(),0)}function de(s,e,t){return H(s)?typeof e=="function"?Object.assign(Object.assign({},t),{queryKey:s,queryFn:e}):Object.assign(Object.assign({},e),{queryKey:s}):s}function os(s,e,t){return H(s)?[Object.assign(Object.assign({},e),{queryKey:s}),t]:[s||{},e]}function ht(s,e){return s===!0&&e===!0||s==null&&e==null?"all":s===!1&&e===!1?"none":(s!=null?s:!e)?"active":"inactive"}function as(s,e){const{active:t,exact:r,fetching:n,inactive:i,predicate:o,queryKey:a,stale:l}=s;if(H(a)){if(r){if(e.queryHash!==Le(a,e.options))return!1}else if(!Ie(e.queryKey,a))return!1}const c=ht(t,i);if(c==="none")return!1;if(c!=="all"){const f=e.isActive();if(c==="active"&&!f||c==="inactive"&&f)return!1}return!(typeof l=="boolean"&&e.isStale()!==l||typeof n=="boolean"&&e.isFetching()!==n||o&&!o(e))}function us(s,e){const{exact:t,fetching:r,predicate:n,mutationKey:i}=s;if(H(i)){if(!e.options.mutationKey)return!1;if(t){if(ee(e.options.mutationKey)!==ee(i))return!1}else if(!Ie(e.options.mutationKey,i))return!1}return!(typeof r=="boolean"&&e.state.status==="loading"!==r||n&&!n(e))}function Le(s,e){return((e==null?void 0:e.queryKeyHashFn)||ee)(s)}function ee(s){const e=$(s);return ft(e)}function ft(s){return JSON.stringify(s,(e,t)=>se(t)?Object.keys(t).sort().reduce((r,n)=>(r[n]=t[n],r),{}):t)}function Ie(s,e){return Ue($(s),$(e))}function Ue(s,e){return s===e?!0:typeof s!=typeof e?!1:s&&e&&typeof s=="object"&&typeof e=="object"?!Object.keys(e).some(t=>!Ue(s[t],e[t])):!1}function te(s,e){if(s===e)return s;const t=Array.isArray(s)&&Array.isArray(e);if(t||se(s)&&se(e)){const r=t?s.length:Object.keys(s).length,n=t?e:Object.keys(e),i=n.length,o=t?[]:{};let a=0;for(let l=0;l<i;l++){const c=t?l:n[l];o[c]=te(s[c],e[c]),o[c]===s[c]&&a++}return r===i&&a===r?s:o}return e}function dt(s,e){if(s&&!e||e&&!s)return!1;for(const t in s)if(s[t]!==e[t])return!1;return!0}function se(s){if(!pe(s))return!1;const e=s.constructor;if(typeof e>"u")return!0;const t=e.prototype;return!(!pe(t)||!t.hasOwnProperty("isPrototypeOf"))}function pe(s){return Object.prototype.toString.call(s)==="[object Object]"}function H(s){return typeof s=="string"||Array.isArray(s)}function pt(s){return new Promise(e=>{setTimeout(e,s)})}function ye(s){Promise.resolve().then(s).catch(e=>setTimeout(()=>{throw e}))}function ls(){if(typeof AbortController=="function")return new AbortController}class yt extends oe{constructor(){super(),this.setup=e=>{if(!M&&(window==null?void 0:window.addEventListener)){const t=()=>e();return window.addEventListener("visibilitychange",t,!1),window.addEventListener("focus",t,!1),()=>{window.removeEventListener("visibilitychange",t),window.removeEventListener("focus",t)}}}}onSubscribe(){this.cleanup||this.setEventListener(this.setup)}onUnsubscribe(){var e;this.hasListeners()||((e=this.cleanup)===null||e===void 0||e.call(this),this.cleanup=void 0)}setEventListener(e){var t;this.setup=e,(t=this.cleanup)===null||t===void 0||t.call(this),this.cleanup=e(r=>{typeof r=="boolean"?this.setFocused(r):this.onFocus()})}setFocused(e){this.focused=e,e&&this.onFocus()}onFocus(){this.listeners.forEach(e=>{e()})}isFocused(){return typeof this.focused=="boolean"?this.focused:typeof document>"u"?!0:[void 0,"visible","prerender"].includes(document.visibilityState)}}const Ne=new yt;class mt extends oe{constructor(){super(),this.setup=e=>{if(!M&&(window==null?void 0:window.addEventListener)){const t=()=>e();return window.addEventListener("online",t,!1),window.addEventListener("offline",t,!1),()=>{window.removeEventListener("online",t),window.removeEventListener("offline",t)}}}}onSubscribe(){this.cleanup||this.setEventListener(this.setup)}onUnsubscribe(){var e;this.hasListeners()||((e=this.cleanup)===null||e===void 0||e.call(this),this.cleanup=void 0)}setEventListener(e){var t;this.setup=e,(t=this.cleanup)===null||t===void 0||t.call(this),this.cleanup=e(r=>{typeof r=="boolean"?this.setOnline(r):this.onOnline()})}setOnline(e){this.online=e,e&&this.onOnline()}onOnline(){this.listeners.forEach(e=>{e()})}isOnline(){return typeof this.online=="boolean"?this.online:typeof navigator>"u"||typeof navigator.onLine>"u"?!0:navigator.onLine}}const bt=new mt;function vt(s){return Math.min(1e3*2**s,3e4)}function me(s){return typeof(s==null?void 0:s.cancel)=="function"}class De{constructor(e){this.revert=e==null?void 0:e.revert,this.silent=e==null?void 0:e.silent}}function gt(s){return s instanceof De}class cs{constructor(e){let t=!1,r,n,i,o;this.abort=e.abort,this.cancel=u=>r==null?void 0:r(u),this.cancelRetry=()=>{t=!0},this.continueRetry=()=>{t=!1},this.continue=()=>n==null?void 0:n(),this.failureCount=0,this.isPaused=!1,this.isResolved=!1,this.isTransportCancelable=!1,this.promise=new Promise((u,h)=>{i=u,o=h});const a=u=>{var h;this.isResolved||(this.isResolved=!0,(h=e.onSuccess)===null||h===void 0||h.call(e,u),n==null||n(),i(u))},l=u=>{var h;this.isResolved||(this.isResolved=!0,(h=e.onError)===null||h===void 0||h.call(e,u),n==null||n(),o(u))},c=()=>new Promise(u=>{var h;n=u,this.isPaused=!0,(h=e.onPause)===null||h===void 0||h.call(e)}).then(()=>{var u;n=void 0,this.isPaused=!1,(u=e.onContinue)===null||u===void 0||u.call(e)}),f=()=>{if(this.isResolved)return;let u;try{u=e.fn()}catch(h){u=Promise.reject(h)}r=h=>{var m;if(!this.isResolved&&(l(new De(h)),(m=this.abort)===null||m===void 0||m.call(this),me(u)))try{u.cancel()}catch{}},this.isTransportCancelable=me(u),Promise.resolve(u).then(a).catch(h=>{var m,p,b;if(this.isResolved)return;const O=(m=e.retry)!==null&&m!==void 0?m:3,v=(p=e.retryDelay)!==null&&p!==void 0?p:vt,_=typeof v=="function"?v(this.failureCount,h):v,d=O===!0||typeof O=="number"&&this.failureCount<O||typeof O=="function"&&O(this.failureCount,h);if(t||!d){l(h);return}this.failureCount++,(b=e.onFail)===null||b===void 0||b.call(e,this.failureCount,h),pt(_).then(()=>{if(!Ne.isFocused()||!bt.isOnline())return c()}).then(()=>{t?l(h):f()})})};f()}}class _t{constructor(){this.queue=[],this.transactions=0,this.notifyFn=e=>{e()},this.batchNotifyFn=e=>{e()}}batch(e){let t;this.transactions++;try{t=e()}finally{this.transactions--,this.transactions||this.flush()}return t}schedule(e){this.transactions?this.queue.push(e):ye(()=>{this.notifyFn(e)})}batchCalls(e){return(...t)=>{this.schedule(()=>{e(...t)})}}flush(){const e=this.queue;this.queue=[],e.length&&ye(()=>{this.batchNotifyFn(()=>{e.forEach(t=>{this.notifyFn(t)})})})}setNotifyFunction(e){this.notifyFn=e}setBatchNotifyFunction(e){this.batchNotifyFn=e}}const F=new _t;let wt=console;function be(){return wt}class Rt extends oe{constructor(e,t){super(),this.client=e,this.options=t,this.trackedProps=[],this.previousSelectError=null,this.bindMethods(),this.setOptions(t)}bindMethods(){this.remove=this.remove.bind(this),this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.length===1&&(this.currentQuery.addObserver(this),ve(this.currentQuery,this.options)&&this.executeFetch(),this.updateTimers())}onUnsubscribe(){this.listeners.length||this.destroy()}shouldFetchOnReconnect(){return St(this.currentQuery,this.options)}shouldFetchOnWindowFocus(){return Ct(this.currentQuery,this.options)}destroy(){this.listeners=[],this.clearTimers(),this.currentQuery.removeObserver(this)}setOptions(e,t){const r=this.options,n=this.currentQuery;if(this.options=this.client.defaultQueryObserverOptions(e),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=r.queryKey),this.updateQuery();const i=this.hasListeners();i&&ge(this.currentQuery,n,this.options,r)&&this.executeFetch(),this.updateResult(t),i&&(this.currentQuery!==n||this.options.enabled!==r.enabled||this.options.staleTime!==r.staleTime)&&this.updateStaleTimeout();const o=this.computeRefetchInterval();i&&(this.currentQuery!==n||this.options.enabled!==r.enabled||o!==this.currentRefetchInterval)&&this.updateRefetchInterval(o)}updateOptions(e,t){const r=Object.assign(Object.assign({},this.options),e);e.queryKey&&!e.queryHash&&e.queryKey!==this.options.queryKey&&(r.queryHash=Le(e.queryKey,r)),this.setOptions(r,t)}getOptimisticResult(e){const t=this.client.defaultQueryObserverOptions(e),r=this.client.getQueryCache().build(this.client,t);return this.createResult(r,t)}getCurrentResult(){return this.currentResult}trackResult(e,t){const r={},n=i=>{this.trackedProps.includes(i)||this.trackedProps.push(i)};return Object.keys(e).forEach(i=>{Object.defineProperty(r,i,{configurable:!1,enumerable:!0,get:()=>(n(i),e[i])})}),(t.useErrorBoundary||t.suspense)&&n("error"),r}getNextResult(e){return new Promise((t,r)=>{const n=this.subscribe(i=>{i.isFetching||(n(),i.isError&&(e==null?void 0:e.throwOnError)?r(i.error):t(i))})})}getCurrentQuery(){return this.currentQuery}remove(){this.client.getQueryCache().remove(this.currentQuery)}refetch(e){return this.fetch(Object.assign(Object.assign({},e),{meta:{refetchPage:e==null?void 0:e.refetchPage}}))}fetchOptimistic(e){const t=this.client.defaultQueryObserverOptions(e),r=this.client.getQueryCache().build(this.client,t);return r.fetch().then(()=>this.createResult(r,t))}fetch(e){return this.executeFetch(e).then(()=>(this.updateResult(),this.currentResult))}executeFetch(e){this.updateQuery();let t=this.currentQuery.fetch(this.options,e);return e!=null&&e.throwOnError||(t=t.catch(lt)),t}updateStaleTimeout(){if(this.clearStaleTimeout(),M||this.currentResult.isStale||!fe(this.options.staleTime))return;const t=ct(this.currentResult.dataUpdatedAt,this.options.staleTime)+1;this.staleTimeoutId=setTimeout(()=>{this.currentResult.isStale||this.updateResult()},t)}computeRefetchInterval(){var e;return typeof this.options.refetchInterval=="function"?this.options.refetchInterval(this.currentResult.data,this.currentQuery):(e=this.options.refetchInterval)!==null&&e!==void 0?e:!1}updateRefetchInterval(e){this.clearRefetchInterval(),this.currentRefetchInterval=e,!(M||this.options.enabled===!1||!fe(this.currentRefetchInterval)||this.currentRefetchInterval===0)&&(this.refetchIntervalId=setInterval(()=>{(this.options.refetchIntervalInBackground||Ne.isFocused())&&this.executeFetch()},this.currentRefetchInterval))}updateTimers(){this.updateStaleTimeout(),this.updateRefetchInterval(this.computeRefetchInterval())}clearTimers(){this.clearStaleTimeout(),this.clearRefetchInterval()}clearStaleTimeout(){clearTimeout(this.staleTimeoutId),this.staleTimeoutId=void 0}clearRefetchInterval(){clearInterval(this.refetchIntervalId),this.refetchIntervalId=void 0}createResult(e,t){var r;const n=this.currentQuery,i=this.options,o=this.currentResult,a=this.currentResultState,l=this.currentResultOptions,c=e!==n,f=c?e.state:this.currentQueryInitialState,u=c?this.currentResult:this.previousQueryResult,{state:h}=e;let{dataUpdatedAt:m,error:p,errorUpdatedAt:b,isFetching:O,status:v}=h,_=!1,d=!1,y;if(t.optimisticResults){const g=this.hasListeners(),q=!g&&ve(e,t),Ze=g&&ge(e,n,t,i);(q||Ze)&&(O=!0,m||(v="loading"))}if(t.keepPreviousData&&!h.dataUpdateCount&&(u==null?void 0:u.isSuccess)&&v!=="error")y=u.data,m=u.dataUpdatedAt,v=u.status,_=!0;else if(t.select&&typeof h.data<"u")if(o&&h.data===(a==null?void 0:a.data)&&t.select===((r=this.previousSelect)===null||r===void 0?void 0:r.fn)&&!this.previousSelectError)y=this.previousSelect.result;else try{y=t.select(h.data),t.structuralSharing!==!1&&(y=te(o==null?void 0:o.data,y)),this.previousSelect={fn:t.select,result:y},this.previousSelectError=null}catch(g){be().error(g),p=g,this.previousSelectError=g,b=Date.now(),v="error"}else y=h.data;if(typeof t.placeholderData<"u"&&typeof y>"u"&&(v==="loading"||v==="idle")){let g;if((o==null?void 0:o.isPlaceholderData)&&t.placeholderData===(l==null?void 0:l.placeholderData))g=o.data;else if(g=typeof t.placeholderData=="function"?t.placeholderData():t.placeholderData,t.select&&typeof g<"u")try{g=t.select(g),t.structuralSharing!==!1&&(g=te(o==null?void 0:o.data,g)),this.previousSelectError=null}catch(q){be().error(q),p=q,this.previousSelectError=q,b=Date.now(),v="error"}typeof g<"u"&&(v="success",y=g,d=!0)}return{status:v,isLoading:v==="loading",isSuccess:v==="success",isError:v==="error",isIdle:v==="idle",data:y,dataUpdatedAt:m,error:p,errorUpdatedAt:b,failureCount:h.fetchFailureCount,isFetched:h.dataUpdateCount>0||h.errorUpdateCount>0,isFetchedAfterMount:h.dataUpdateCount>f.dataUpdateCount||h.errorUpdateCount>f.errorUpdateCount,isFetching:O,isRefetching:O&&v!=="loading",isLoadingError:v==="error"&&h.dataUpdatedAt===0,isPlaceholderData:d,isPreviousData:_,isRefetchError:v==="error"&&h.dataUpdatedAt!==0,isStale:P(e,t),refetch:this.refetch,remove:this.remove}}shouldNotifyListeners(e,t){if(!t)return!0;const{notifyOnChangeProps:r,notifyOnChangePropsExclusions:n}=this.options;if(!r&&!n||r==="tracked"&&!this.trackedProps.length)return!0;const i=r==="tracked"?this.trackedProps:r;return Object.keys(e).some(o=>{const a=o,l=e[a]!==t[a],c=i==null?void 0:i.some(u=>u===o),f=n==null?void 0:n.some(u=>u===o);return l&&!f&&(!i||c)})}updateResult(e){const t=this.currentResult;if(this.currentResult=this.createResult(this.currentQuery,this.options),this.currentResultState=this.currentQuery.state,this.currentResultOptions=this.options,dt(this.currentResult,t))return;const r={cache:!0};(e==null?void 0:e.listeners)!==!1&&this.shouldNotifyListeners(this.currentResult,t)&&(r.listeners=!0),this.notify(Object.assign(Object.assign({},r),e))}updateQuery(){const e=this.client.getQueryCache().build(this.client,this.options);if(e===this.currentQuery)return;const t=this.currentQuery;this.currentQuery=e,this.currentQueryInitialState=e.state,this.previousQueryResult=this.currentResult,this.hasListeners()&&(t==null||t.removeObserver(this),e.addObserver(this))}onQueryUpdate(e){const t={};e.type==="success"?t.onSuccess=!0:e.type==="error"&&!gt(e.error)&&(t.onError=!0),this.updateResult(t),this.hasListeners()&&this.updateTimers()}notify(e){F.batch(()=>{var t,r,n,i,o,a,l,c;e.onSuccess?((r=(t=this.options).onSuccess)===null||r===void 0||r.call(t,this.currentResult.data),(i=(n=this.options).onSettled)===null||i===void 0||i.call(n,this.currentResult.data,null)):e.onError&&((a=(o=this.options).onError)===null||a===void 0||a.call(o,this.currentResult.error),(c=(l=this.options).onSettled)===null||c===void 0||c.call(l,void 0,this.currentResult.error)),e.listeners&&this.listeners.forEach(f=>{f(this.currentResult)}),e.cache&&this.client.getQueryCache().notify({query:this.currentQuery,type:"observerResultsUpdated"})})}}function Ot(s,e){return e.enabled!==!1&&!s.state.dataUpdatedAt&&!(s.state.status==="error"&&e.retryOnMount===!1)}function Et(s,e){return e.enabled!==!1&&s.state.dataUpdatedAt>0&&(e.refetchOnMount==="always"||e.refetchOnMount!==!1&&P(s,e))}function ve(s,e){return Ot(s,e)||Et(s,e)}function St(s,e){return e.enabled!==!1&&(e.refetchOnReconnect==="always"||e.refetchOnReconnect!==!1&&P(s,e))}function Ct(s,e){return e.enabled!==!1&&(e.refetchOnWindowFocus==="always"||e.refetchOnWindowFocus!==!1&&P(s,e))}function ge(s,e,t,r){return t.enabled!==!1&&(s!==e||r.enabled===!1)&&(!t.suspense||s.state.status!=="error")&&P(s,t)}function P(s,e){return s.isStaleByTime(e.staleTime)}function Tt(){const s=et("queryClient");if(!s)throw new Error("No QueryClient set, use QueryClientProvider to set one");return s}function _e(s){return s.optimisticResults=!0,s.onError&&(s.onError=F.batchCalls(s.onError)),s.onSuccess&&(s.onSuccess=F.batchCalls(s.onSuccess)),s.onSettled&&(s.onSettled=F.batchCalls(s.onSettled)),s}function hs(s,e,t){const r=de(s,e,t),n=Tt();let i=n.defaultQueryObserverOptions(r);i=_e(i);const o=new Rt(n,i),{subscribe:a}=tt(o.getCurrentResult(),u=>o.subscribe(F.batchCalls(u)));o.updateResult();function l(u,h,m){const p=de(u,h,m);let b=n.defaultQueryObserverOptions(p);b=_e(b),o.hasListeners()&&o.setOptions(b,{listeners:!1})}function c(u){o.updateOptions(u)}function f(u){c({enabled:u})}return{subscribe:a,setOptions:l,updateOptions:c,setEnabled:f}}class we extends Error{constructor(e,t,r){const n=e.status||e.status===0?e.status:"",i=e.statusText||"",o=`${n} ${i}`.trim(),a=o?`status code ${o}`:"an unknown error";super(`Request failed with ${a}`),Object.defineProperty(this,"response",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"request",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"options",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.name="HTTPError",this.response=e,this.request=t,this.options=r}}class xe extends Error{constructor(e){super("Request timed out"),Object.defineProperty(this,"request",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.name="TimeoutError",this.request=e}}const N=s=>s!==null&&typeof s=="object",L=(...s)=>{for(const e of s)if((!N(e)||Array.isArray(e))&&typeof e<"u")throw new TypeError("The `options` argument must be an object");return ae({},...s)},Me=(s={},e={})=>{const t=new globalThis.Headers(s),r=e instanceof globalThis.Headers,n=new globalThis.Headers(e);for(const[i,o]of n.entries())r&&o==="undefined"||o===void 0?t.delete(i):t.set(i,o);return t},ae=(...s)=>{let e={},t={};for(const r of s)if(Array.isArray(r))Array.isArray(e)||(e=[]),e=[...e,...r];else if(N(r)){for(let[n,i]of Object.entries(r))N(i)&&n in e&&(i=ae(e[n],i)),e={...e,[n]:i};N(r.headers)&&(t=Me(t,r.headers),e.headers=t)}return e},kt=(()=>{let s=!1,e=!1;return typeof globalThis.ReadableStream=="function"&&(e=new globalThis.Request("https://a.com",{body:new globalThis.ReadableStream,method:"POST",get duplex(){return s=!0,"half"}}).headers.has("Content-Type")),s&&!e})(),At=typeof globalThis.AbortController=="function",jt=typeof globalThis.ReadableStream=="function",qt=typeof globalThis.FormData=="function",Ke=["get","post","put","patch","head","delete"],Ft={json:"application/json",text:"text/*",formData:"multipart/form-data",arrayBuffer:"*/*",blob:"*/*"},V=2147483647,Be=Symbol("stop"),Pt=s=>Ke.includes(s)?s.toUpperCase():s,Qt=["get","put","head","delete","options","trace"],Lt=[408,413,429,500,502,503,504],He=[413,429,503],Re={limit:2,methods:Qt,statusCodes:Lt,afterStatusCodes:He,maxRetryAfter:Number.POSITIVE_INFINITY},It=(s={})=>{if(typeof s=="number")return{...Re,limit:s};if(s.methods&&!Array.isArray(s.methods))throw new Error("retry.methods must be an array");if(s.statusCodes&&!Array.isArray(s.statusCodes))throw new Error("retry.statusCodes must be an array");return{...Re,...s,afterStatusCodes:He}},Ut=async(s,e,t)=>new Promise((r,n)=>{const i=setTimeout(()=>{e&&e.abort(),n(new xe(s))},t.timeout);t.fetch(s).then(r).catch(n).then(()=>{clearTimeout(i)})}),Nt=async s=>new Promise(e=>{setTimeout(e,s)});class K{constructor(e,t={}){var r,n,i;if(Object.defineProperty(this,"request",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"abortController",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_retryCount",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"_input",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_options",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this._input=e,this._options={credentials:this._input.credentials||"same-origin",...t,headers:Me(this._input.headers,t.headers),hooks:ae({beforeRequest:[],beforeRetry:[],beforeError:[],afterResponse:[]},t.hooks),method:Pt((r=t.method)!=null?r:this._input.method),prefixUrl:String(t.prefixUrl||""),retry:It(t.retry),throwHttpErrors:t.throwHttpErrors!==!1,timeout:typeof t.timeout>"u"?1e4:t.timeout,fetch:(n=t.fetch)!=null?n:globalThis.fetch.bind(globalThis)},typeof this._input!="string"&&!(this._input instanceof URL||this._input instanceof globalThis.Request))throw new TypeError("`input` must be a string, URL, or Request");if(this._options.prefixUrl&&typeof this._input=="string"){if(this._input.startsWith("/"))throw new Error("`input` must not begin with a slash when using `prefixUrl`");this._options.prefixUrl.endsWith("/")||(this._options.prefixUrl+="/"),this._input=this._options.prefixUrl+this._input}if(At&&(this.abortController=new globalThis.AbortController,this._options.signal&&this._options.signal.addEventListener("abort",()=>{this.abortController.abort()}),this._options.signal=this.abortController.signal),this.request=new globalThis.Request(this._input,this._options),kt&&(this.request.duplex="half"),this._options.searchParams){const a="?"+(typeof this._options.searchParams=="string"?this._options.searchParams.replace(/^\?/,""):new URLSearchParams(this._options.searchParams).toString()),l=this.request.url.replace(/(?:\?.*?)?(?=#|$)/,a);(qt&&this._options.body instanceof globalThis.FormData||this._options.body instanceof URLSearchParams)&&!(this._options.headers&&this._options.headers["content-type"])&&this.request.headers.delete("content-type"),this.request=new globalThis.Request(new globalThis.Request(l,this.request),this._options)}this._options.json!==void 0&&(this._options.body=JSON.stringify(this._options.json),this.request.headers.set("content-type",(i=this._options.headers.get("content-type"))!=null?i:"application/json"),this.request=new globalThis.Request(this.request,{body:this._options.body}))}static create(e,t){const r=new K(e,t),n=async()=>{if(r._options.timeout>V)throw new RangeError(`The \`timeout\` option cannot be greater than ${V}`);await Promise.resolve();let a=await r._fetch();for(const l of r._options.hooks.afterResponse){const c=await l(r.request,r._options,r._decorateResponse(a.clone()));c instanceof globalThis.Response&&(a=c)}if(r._decorateResponse(a),!a.ok&&r._options.throwHttpErrors){let l=new we(a,r.request,r._options);for(const c of r._options.hooks.beforeError)l=await c(l);throw l}if(r._options.onDownloadProgress){if(typeof r._options.onDownloadProgress!="function")throw new TypeError("The `onDownloadProgress` option must be a function");if(!jt)throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");return r._stream(a.clone(),r._options.onDownloadProgress)}return a},o=r._options.retry.methods.includes(r.request.method.toLowerCase())?r._retry(n):n();for(const[a,l]of Object.entries(Ft))o[a]=async()=>{r.request.headers.set("accept",r.request.headers.get("accept")||l);const f=(await o).clone();if(a==="json"){if(f.status===204)return"";if(t.parseJson)return t.parseJson(await f.text())}return f[a]()};return o}_calculateRetryDelay(e){if(this._retryCount++,this._retryCount<this._options.retry.limit&&!(e instanceof xe)){if(e instanceof we){if(!this._options.retry.statusCodes.includes(e.response.status))return 0;const r=e.response.headers.get("Retry-After");if(r&&this._options.retry.afterStatusCodes.includes(e.response.status)){let n=Number(r);return Number.isNaN(n)?n=Date.parse(r)-Date.now():n*=1e3,typeof this._options.retry.maxRetryAfter<"u"&&n>this._options.retry.maxRetryAfter?0:n}if(e.response.status===413)return 0}return .3*2**(this._retryCount-1)*1e3}return 0}_decorateResponse(e){return this._options.parseJson&&(e.json=async()=>this._options.parseJson(await e.text())),e}async _retry(e){try{return await e()}catch(t){const r=Math.min(this._calculateRetryDelay(t),V);if(r!==0&&this._retryCount>0){await Nt(r);for(const n of this._options.hooks.beforeRetry)if(await n({request:this.request,options:this._options,error:t,retryCount:this._retryCount})===Be)return;return this._retry(e)}throw t}}async _fetch(){for(const e of this._options.hooks.beforeRequest){const t=await e(this.request,this._options);if(t instanceof Request){this.request=t;break}if(t instanceof Response)return t}return this._options.timeout===!1?this._options.fetch(this.request.clone()):Ut(this.request.clone(),this.abortController,this._options)}_stream(e,t){const r=Number(e.headers.get("content-length"))||0;let n=0;return e.status===204?(t&&t({percent:1,totalBytes:r,transferredBytes:n},new Uint8Array),new globalThis.Response(null,{status:e.status,statusText:e.statusText,headers:e.headers})):new globalThis.Response(new globalThis.ReadableStream({async start(i){const o=e.body.getReader();t&&t({percent:0,transferredBytes:0,totalBytes:r},new Uint8Array);async function a(){const{done:l,value:c}=await o.read();if(l){i.close();return}if(t){n+=c.byteLength;const f=r===0?0:n/r;t({percent:f,transferredBytes:n,totalBytes:r},c)}i.enqueue(c),await a()}await a()}}),{status:e.status,statusText:e.statusText,headers:e.headers})}}/*! MIT License © Sindre Sorhus */const re=s=>{const e=(t,r)=>K.create(t,L(s,r));for(const t of Ke)e[t]=(r,n)=>K.create(r,L(s,n,{method:t}));return e.create=t=>re(L(t)),e.extend=t=>re(L(s,t)),e.stop=Be,e},Dt=re(),xt=Dt,{isArray:ze}=Array;class Mt{constructor(e){this.value=e}}function Kt(s,e,t){if(!ze(t))throw new TypeError("reduce: list must be array or iterable");let r=0;const n=t.length;for(;r<n;){if(e=s(e,t[r],r,t),e instanceof Mt)return e.value;r++}return e}function Bt(s,e){switch(s){case 0:return function(){return e.apply(this,arguments)};case 1:return function(t){return e.apply(this,arguments)};case 2:return function(t,r){return e.apply(this,arguments)};case 3:return function(t,r,n){return e.apply(this,arguments)};case 4:return function(t,r,n,i){return e.apply(this,arguments)};case 5:return function(t,r,n,i,o){return e.apply(this,arguments)};case 6:return function(t,r,n,i,o,a){return e.apply(this,arguments)};case 7:return function(t,r,n,i,o,a,l){return e.apply(this,arguments)};case 8:return function(t,r,n,i,o,a,l,c){return e.apply(this,arguments)};case 9:return function(t,r,n,i,o,a,l,c,f){return e.apply(this,arguments)};case 10:return function(t,r,n,i,o,a,l,c,f,u){return e.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}function Ht(s,e){return function(){return e.call(this,s.apply(this,arguments))}}function Ve(){if(arguments.length===0)throw new Error("pipe requires at least one argument");return Bt(arguments[0].length,Kt(Ht,arguments[0],Array.prototype.slice.call(arguments,1,1/0)))}function B(s){if(s===null)return"Null";if(s===void 0)return"Undefined";if(Number.isNaN(s))return"NaN";const e=Object.prototype.toString.call(s).slice(8,-1);return e==="AsyncFunction"?"Promise":e}function We(s,e){if(!ze(e))throw new Error(`Cannot read property 'indexOf' of ${e}`);const t=B(s);if(!["Object","Array","NaN","RegExp"].includes(t))return e.indexOf(s);let r=-1,n=-1;const{length:i}=e;for(;++r<i&&n===-1;)D(e[r],s)&&(n=r);return n}function Oe(s){const e=[];let t;for(;!(t=s.next()).done;)e.push(t.value);return e}function zt(s,e){if(s.size!==e.size)return!1;const t=Oe(s.values()),r=Oe(e.values());return t.filter(i=>We(i,r)===-1).length===0}function Ee(s){const e=s.__proto__.toString();return["Error","TypeError"].includes(e)?[e,s.message]:[]}function Se(s){return s.toDateString?[!0,s.getTime()]:[!1]}function Ce(s){return s.constructor!==RegExp?[!1]:[!0,s.toString()]}function D(s,e){if(arguments.length===1)return c=>D(s,c);const t=B(s);if(t!==B(e))return!1;if(t==="Function")return s.name===void 0?!1:s.name===e.name;if(["NaN","Undefined","Null"].includes(t))return!0;if(t==="Number")return Object.is(-0,s)!==Object.is(-0,e)?!1:s.toString()===e.toString();if(["String","Boolean"].includes(t))return s.toString()===e.toString();if(t==="Array"){const c=Array.from(s),f=Array.from(e);if(c.toString()!==f.toString())return!1;let u=!0;return c.forEach((h,m)=>{u&&h!==f[m]&&!D(h,f[m])&&(u=!1)}),u}const r=Ce(s),n=Ce(e);if(r[0])return n[0]?r[1]===n[1]:!1;if(n[0])return!1;const i=Se(s),o=Se(e);if(i[0])return o[0]?i[1]===o[1]:!1;if(o[0])return!1;const a=Ee(s),l=Ee(e);if(a[0])return l[0]?a[0]===l[0]&&a[1]===l[1]:!1;if(t==="Set")return zt(s,e);if(t==="Object"){const c=Object.keys(s);if(c.length!==Object.keys(e).length)return!1;let f=!0;return c.forEach(u=>{if(f){const h=s[u],m=e[u];h!==m&&!D(h,m)&&(f=!1)}}),f}return!1}class Vt{constructor(){this.set=new Set,this.items={}}checkUniqueness(e){const t=B(e);if(["Null","Undefined","NaN"].includes(t))return t in this.items?!1:(this.items[t]=!0,!0);if(!["Object","Array"].includes(t)){const r=this.set.size;return this.set.add(e),this.set.size!==r}return t in this.items?We(e,this.items[t])===-1?(this.items[t].push(e),!0):!1:(this.items[t]=[e],!0)}}function Wt(s){const e=new Vt,t=[];return s.forEach(r=>{e.checkUniqueness(r)&&t.push(r)}),t}function Je(s,e){return arguments.length===1?t=>Je(s,t):e.join(s)}function Ye(s,e){return arguments.length===1?t=>Ye(s,t):e.split(s)}function Jt(s){return s.toLowerCase()}const fs=s=>s.preventDefault(),Yt=Ve(Jt,Ye("")),ds=Ve(Yt,Wt,Je("")),ps=s=>s[0].toUpperCase().concat(s.slice(1)),ys=(s,e)=>s.toLowerCase().slice(0,e).replaceAll(/[\s_]/gi,"*"),ms=s=>new RegExp(`^${s.replaceAll("*","\\w")}$`);function bs(s){const e=new Map;return(...t)=>{const r=JSON.stringify(t,null,"");return e.has(r)?e.get(r):s(...t)}}const Gt=(...s)=>(...e)=>s.some(t=>Boolean(t(...e))),vs=(...s)=>()=>!Gt(...s),Ge=(s,e)=>(...t)=>{console.group(s.groupLabel,t.length>0?JSON.stringify(t):""),console.time("speed");const r=e(...t);return console.timeEnd("speed"),console.groupEnd(),r};class A{constructor(e){z(this,"_value");z(this,"_isNone",!1);this._value=e,this._isNone=e==null}static of(e){return new A(e)}static ofFalsy(e){return new A(e||void 0)}get isSome(){return this._isNone===!1}valueOr(e){return this.isSome?this._value:e}map(e){return this.isSome?A.of(e(this._value)):new A(void 0)}mapOr(e,t){return this.isSome?t(this._value):e}mapOrUndefined(e){return this.mapOr(void 0,e)}mapOrNull(e){return this.mapOr(null,e)}}const ue=xt.extend({cache:"force-cache"});class Te extends Error{constructor(e){super(`Argument missing: '${e}'`)}}class ke extends Error{constructor(e){super(`Definition not found for: '${e}'`)}}const gs=Ge({groupLabel:"getWordDefinition"},async s=>{try{if(!s)throw new Te("word");const[e]=[...s],t=await ue.get(`/db/dictionary/${e}.json`).json();if(s in t)return t[s];throw new ke(s)}catch(e){throw e instanceof Te||e instanceof ke?e:new Error("Unknown Error: failed to fetch word definition",{cause:e})}}),_s=Ge({groupLabel:"geWordsByLength"},async(s,e)=>{try{const t=await ue.get(`/db/words/by-length/${s}.json`).json();return A.of(e).mapOr(t,r=>t.filter(n=>r.test(n)))}catch{return[]}}),ws=async()=>ue.get("/meta.json").json();function Ae(s){const e=t=>{s&&!s.contains(t.target)&&!t.defaultPrevented&&s.dispatchEvent(new CustomEvent("clickout",{detail:s}))};return document.addEventListener("click",e,!0),{destroy(){document.removeEventListener("click",e,!0)}}}const Zt=s=>({}),je=s=>({}),Xt=s=>({}),qe=s=>({});function Fe(s){let e,t,r,n,i=s[3]&&Pe(s);return{c(){e=T("h3"),t=ne(s[2]),r=I(),i&&i.c(),n=x(),this.h()},l(o){e=k(o,"H3",{class:!0});var a=j(e);t=ie(a,s[2]),a.forEach(R),r=U(o),i&&i.l(o),n=x(),this.h()},h(){w(e,"class","text-lg font-bold")},m(o,a){E(o,e,a),C(e,t),E(o,r,a),i&&i.m(o,a),E(o,n,a)},p(o,a){a&4&&Qe(t,o[2]),o[3]?i?i.p(o,a):(i=Pe(o),i.c(),i.m(n.parentNode,n)):i&&(i.d(1),i=null)},d(o){o&&R(e),o&&R(r),i&&i.d(o),o&&R(n)}}}function Pe(s){let e,t;return{c(){e=T("small"),t=ne(s[3]),this.h()},l(r){e=k(r,"SMALL",{class:!0});var n=j(e);t=ie(n,s[3]),n.forEach(R),this.h()},h(){w(e,"class","text-sm text-gray-500")},m(r,n){E(r,e,n),C(e,t)},p(r,n){n&8&&Qe(t,r[3])},d(r){r&&R(e)}}}function $t(s){let e,t=s[2]&&Fe(s);return{c(){t&&t.c(),e=x()},l(r){t&&t.l(r),e=x()},m(r,n){t&&t.m(r,n),E(r,e,n)},p(r,n){r[2]?t?t.p(r,n):(t=Fe(r),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},d(r){t&&t.d(r),r&&R(e)}}}function es(s){let e,t;const r=s[8].default,n=W(r,s,s[7],null);return{c(){e=T("p"),n&&n.c(),this.h()},l(i){e=k(i,"P",{class:!0});var o=j(e);n&&n.l(o),o.forEach(R),this.h()},h(){w(e,"class","py-4")},m(i,o){E(i,e,o),n&&n.m(e,null),t=!0},p(i,o){n&&n.p&&(!t||o&128)&&J(n,r,i,i[7],t?G(r,i[7],o,null):Y(i[7]),null)},i(i){t||(Z(n,i),t=!0)},o(i){X(n,i),t=!1},d(i){i&&R(e),n&&n.d(i)}}}function ts(s){let e,t,r,n,i,o,a,l,c,f,u,h;const m=s[8].title,p=W(m,s,s[7],qe),b=p||$t(s),O=s[8].body,v=W(O,s,s[7],je),_=v||es(s);return{c(){e=T("input"),t=I(),r=T("div"),n=T("div"),i=T("button"),o=ne("\u2A2F"),a=I(),b&&b.c(),l=I(),_&&_.c(),this.h()},l(d){e=k(d,"INPUT",{type:!0,id:!0,class:!0}),t=U(d),r=k(d,"DIV",{role:!0,class:!0});var y=j(r);n=k(y,"DIV",{class:!0});var S=j(n);i=k(S,"BUTTON",{for:!0,class:!0,"aria-label":!0});var g=j(i);o=ie(g,"\u2A2F"),g.forEach(R),a=U(S),b&&b.l(S),l=U(S),_&&_.l(S),S.forEach(R),y.forEach(R),this.h()},h(){w(e,"type","checkbox"),w(e,"id",s[1]),w(e,"class","modal-toggle"),w(i,"for",s[1]),w(i,"class","btn btn-sm btn-circle absolute right-2 top-2 focus:ring"),w(i,"aria-label","Close modal"),w(n,"class",c="modal-box relative"+s[6].class),w(r,"role","dialog"),w(r,"class","modal modal-bottom sm:modal-middle")},m(d,y){E(d,e,y),e.checked=s[0],E(d,t,y),E(d,r,y),C(r,n),C(n,i),C(i,o),C(n,a),b&&b.m(n,null),C(n,l),_&&_.m(n,null),f=!0,u||(h=[Q(e,"change",s[9]),Q(i,"click",s[5]),Q(i,"keydown",s[5]),le(Ae.call(null,n)),Q(n,"clickout",s[4]),le(Ae.call(null,r))],u=!0)},p(d,[y]){(!f||y&2)&&w(e,"id",d[1]),y&1&&(e.checked=d[0]),(!f||y&2)&&w(i,"for",d[1]),p?p.p&&(!f||y&128)&&J(p,m,d,d[7],f?G(m,d[7],y,Xt):Y(d[7]),qe):b&&b.p&&(!f||y&12)&&b.p(d,f?y:-1),v?v.p&&(!f||y&128)&&J(v,O,d,d[7],f?G(O,d[7],y,Zt):Y(d[7]),je):_&&_.p&&(!f||y&128)&&_.p(d,f?y:-1),(!f||y&64&&c!==(c="modal-box relative"+d[6].class))&&w(n,"class",c)},i(d){f||(Z(b,d),Z(_,d),f=!0)},o(d){X(b,d),X(_,d),f=!1},d(d){d&&R(e),d&&R(t),d&&R(r),b&&b.d(d),_&&_.d(d),u=!1,it(h)}}}function ss(s,e,t){let{$$slots:r={},$$scope:n}=e,{id:i}=e,{title:o}=e,{subtitle:a=""}=e,{open:l=!1}=e;const c=ot(),f=()=>{!l||(t(0,l=!1),c("close",!1))},u=p=>{p.key==="Escape"&&f()};at(()=>{typeof document>"u"||document.addEventListener("keydown",u)}),ut(()=>{typeof document>"u"||document.removeEventListener("keydown",u)});const h=p=>{p instanceof KeyboardEvent&&!["Enter"," "].includes(p.key)||c("close",!1)};function m(){l=this.checked,t(0,l)}return s.$$set=p=>{t(6,e=ce(ce({},e),he(p))),"id"in p&&t(1,i=p.id),"title"in p&&t(2,o=p.title),"subtitle"in p&&t(3,a=p.subtitle),"open"in p&&t(0,l=p.open),"$$scope"in p&&t(7,n=p.$$scope)},e=he(e),[l,i,o,a,f,h,e,n,r,m]}class Rs extends st{constructor(e){super(),rt(this,e,ss,ts,nt,{id:1,title:2,subtitle:3,open:0})}}export{gs as A,ys as B,Ve as C,fs as D,ds as E,ms as F,_s as G,Yt as H,Rs as M,cs as R,oe as S,gt as a,be as b,F as c,us as d,$ as e,is as f,ls as g,Le as h,fe as i,me as j,Ne as k,de as l,as as m,lt as n,bt as o,os as p,ee as q,te as r,Ie as s,ct as t,hs as u,ws as v,bs as w,Gt as x,vs as y,ps as z};