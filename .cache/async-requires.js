// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-pages-2020-js": () => import("./../src/pages/2020.js" /* webpackChunkName: "component---src-pages-2020-js" */),
  "component---src-pages-2021-js": () => import("./../src/pages/2021.js" /* webpackChunkName: "component---src-pages-2021-js" */),
  "component---src-pages-contribute-js": () => import("./../src/pages/contribute.js" /* webpackChunkName: "component---src-pages-contribute-js" */),
  "component---src-pages-feed-js": () => import("./../src/pages/feed.js" /* webpackChunkName: "component---src-pages-feed-js" */),
  "component---src-pages-hiring-js": () => import("./../src/pages/hiring.js" /* webpackChunkName: "component---src-pages-hiring-js" */),
  "component---src-pages-index-js": () => import("./../src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-pages-map-js": () => import("./../src/pages/map.js" /* webpackChunkName: "component---src-pages-map-js" */)
}

