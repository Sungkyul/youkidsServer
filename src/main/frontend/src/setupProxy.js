const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
app.use(
createProxyMiddleware({
target: 'http://localhost:7080',
changeOrigin: true,
pathFilter : '/api',
}),
);
};