const r = [
  "/_app/immutable/start-12c346e0.js",
  "/_app/immutable/components/pages/_layout.svelte-bff8ba21.js",
  "/_app/immutable/assets/_layout-53863ed6.css",
  "/_app/immutable/components/error.svelte-74f3b11f.js",
  "/_app/immutable/components/pages/_page.svelte-fea7eae8.js",
  "/_app/immutable/assets/_page-fcbfc4b7.css",
  "/_app/immutable/chunks/singletons-38b54006.js",
  "/_app/immutable/chunks/index-9c0b09c1.js",
  "/_app/immutable/chunks/Modal-e6b18b16.js",
  "/_app/immutable/chunks/0-43e3ca61.js",
  "/_app/immutable/chunks/1-bd673384.js",
  "/_app/immutable/chunks/2-f08bf042.js"
], l = [
  "/db/dictionary/a.json",
  "/db/dictionary/b.json",
  "/db/dictionary/c.json",
  "/db/dictionary/d.json",
  "/db/dictionary/e.json",
  "/db/dictionary/f.json",
  "/db/dictionary/g.json",
  "/db/dictionary/h.json",
  "/db/dictionary/i.json",
  "/db/dictionary/j.json",
  "/db/dictionary/k.json",
  "/db/dictionary/l.json",
  "/db/dictionary/m.json",
  "/db/dictionary/n.json",
  "/db/dictionary/o.json",
  "/db/dictionary/p.json",
  "/db/dictionary/q.json",
  "/db/dictionary/r.json",
  "/db/dictionary/s.json",
  "/db/dictionary/t.json",
  "/db/dictionary/u.json",
  "/db/dictionary/v.json",
  "/db/dictionary/w.json",
  "/db/dictionary/x.json",
  "/db/dictionary/y.json",
  "/db/dictionary/z.json",
  "/db/words/by-length/10.json",
  "/db/words/by-length/11.json",
  "/db/words/by-length/12.json",
  "/db/words/by-length/13.json",
  "/db/words/by-length/14.json",
  "/db/words/by-length/15.json",
  "/db/words/by-length/16.json",
  "/db/words/by-length/17.json",
  "/db/words/by-length/18.json",
  "/db/words/by-length/19.json",
  "/db/words/by-length/2.json",
  "/db/words/by-length/20.json",
  "/db/words/by-length/21.json",
  "/db/words/by-length/22.json",
  "/db/words/by-length/23.json",
  "/db/words/by-length/24.json",
  "/db/words/by-length/25.json",
  "/db/words/by-length/26.json",
  "/db/words/by-length/28.json",
  "/db/words/by-length/29.json",
  "/db/words/by-length/3.json",
  "/db/words/by-length/30.json",
  "/db/words/by-length/31.json",
  "/db/words/by-length/33.json",
  "/db/words/by-length/4.json",
  "/db/words/by-length/45.json",
  "/db/words/by-length/5.json",
  "/db/words/by-length/6.json",
  "/db/words/by-length/7.json",
  "/db/words/by-length/8.json",
  "/db/words/by-length/9.json",
  "/db/words/index.json",
  "/db/words.txt",
  "/favicon.png",
  "/icon-512.png",
  "/meta.json",
  "/webmanifest.json"
], a = "1670876979689", t = self, b = `cache${a}`, c = r.concat(l), h = new Set(c);
t.addEventListener("install", (s) => {
  s.waitUntil(
    caches.open(b).then((n) => n.addAll(c)).then(() => {
      t.skipWaiting();
    })
  );
});
t.addEventListener("activate", (s) => {
  s.waitUntil(
    caches.keys().then(async (n) => {
      for (const o of n)
        o !== b && await caches.delete(o);
      t.clients.claim();
    })
  );
});
async function j(s) {
  const n = await caches.open(`offline${a}`);
  try {
    const o = await fetch(s);
    return n.put(s, o.clone()), o;
  } catch (o) {
    const e = await n.match(s);
    if (e)
      return e;
    throw o;
  }
}
t.addEventListener("fetch", (s) => {
  if (s.request.method !== "GET" || s.request.headers.has("range"))
    return;
  const n = new URL(s.request.url), o = n.protocol.startsWith("http"), e = n.hostname === self.location.hostname && n.port !== self.location.port, d = n.host === self.location.host && h.has(n.pathname), i = s.request.cache === "only-if-cached" && !d;
  o && !e && !i && s.respondWith(
    (async () => d && await caches.match(s.request) || j(s.request))()
  );
});
