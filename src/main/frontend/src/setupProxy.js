const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", //3000번에서 리액트 화면 안뜨는거 해결
    createProxyMiddleware({
      target: "http://localhost:7080",
      changeOrigin: true,
      pathFilter: "/",
    })
  );
};
