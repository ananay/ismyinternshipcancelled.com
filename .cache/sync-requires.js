const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-2020-js": hot(preferDefault(require("/Users/ananayarora/Documents/Development/ismyinternshipcancelled/website/src/pages/2020.js"))),
  "component---src-pages-2021-js": hot(preferDefault(require("/Users/ananayarora/Documents/Development/ismyinternshipcancelled/website/src/pages/2021.js"))),
  "component---src-pages-contribute-js": hot(preferDefault(require("/Users/ananayarora/Documents/Development/ismyinternshipcancelled/website/src/pages/contribute.js"))),
  "component---src-pages-feed-js": hot(preferDefault(require("/Users/ananayarora/Documents/Development/ismyinternshipcancelled/website/src/pages/feed.js"))),
  "component---src-pages-hiring-js": hot(preferDefault(require("/Users/ananayarora/Documents/Development/ismyinternshipcancelled/website/src/pages/hiring.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/ananayarora/Documents/Development/ismyinternshipcancelled/website/src/pages/index.js"))),
  "component---src-pages-map-js": hot(preferDefault(require("/Users/ananayarora/Documents/Development/ismyinternshipcancelled/website/src/pages/map.js")))
}

