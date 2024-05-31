import { Express } from "express";
import { createProxyMiddleware, RequestHandler } from "http-proxy-middleware";

export default function setupProxy(app: Express): void {
  const apiProxy: RequestHandler = createProxyMiddleware({
    target: "http://localhost:7080",
    changeOrigin: true,
  });

  app.use("/api", apiProxy);
}
