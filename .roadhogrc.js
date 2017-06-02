
export default {
  "entry": "src/index.js",
  "disableCSSModules": false,
  "publicPath": "/",
  "autoprefixer": null,
  "extraBabelPlugins": [
    "transform-runtime",
    ["import", { "libraryName": "antd", "style": true }]
  ],
  "theme": "./src/theme/default.theme.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  },
  "proxy": {
    "/api": {
      "target": "http://localhost:3060/",
      "changeOrigin": false,
      "pathRewrite": { "^/api" : "" }
    }
  }
};
