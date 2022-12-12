export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["db/dictionary/a.json","db/dictionary/b.json","db/dictionary/c.json","db/dictionary/d.json","db/dictionary/e.json","db/dictionary/f.json","db/dictionary/g.json","db/dictionary/h.json","db/dictionary/i.json","db/dictionary/j.json","db/dictionary/k.json","db/dictionary/l.json","db/dictionary/m.json","db/dictionary/n.json","db/dictionary/o.json","db/dictionary/p.json","db/dictionary/q.json","db/dictionary/r.json","db/dictionary/s.json","db/dictionary/t.json","db/dictionary/u.json","db/dictionary/v.json","db/dictionary/w.json","db/dictionary/x.json","db/dictionary/y.json","db/dictionary/z.json","db/words/by-length/10.json","db/words/by-length/11.json","db/words/by-length/12.json","db/words/by-length/13.json","db/words/by-length/14.json","db/words/by-length/15.json","db/words/by-length/16.json","db/words/by-length/17.json","db/words/by-length/18.json","db/words/by-length/19.json","db/words/by-length/2.json","db/words/by-length/20.json","db/words/by-length/21.json","db/words/by-length/22.json","db/words/by-length/23.json","db/words/by-length/24.json","db/words/by-length/25.json","db/words/by-length/26.json","db/words/by-length/28.json","db/words/by-length/29.json","db/words/by-length/3.json","db/words/by-length/30.json","db/words/by-length/31.json","db/words/by-length/33.json","db/words/by-length/4.json","db/words/by-length/45.json","db/words/by-length/5.json","db/words/by-length/6.json","db/words/by-length/7.json","db/words/by-length/8.json","db/words/by-length/9.json","db/words/index.json","db/words.txt","favicon.png","icon-512.png","meta.json","webmanifest.json","service-worker.js"]),
	mimeTypes: {".json":"application/json",".txt":"text/plain",".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-12c346e0.js","imports":["_app/immutable/start-12c346e0.js","_app/immutable/chunks/index-9c0b09c1.js","_app/immutable/chunks/singletons-38b54006.js"],"stylesheets":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
