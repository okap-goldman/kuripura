/** @type {import('@remix-run/dev').AppConfig} */
export default {
  serverBuildTarget: "node",
  server: process.env.NODE_ENV === "production" ? "./server.js" : undefined,
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ["**/.*"],
  future: {
    v3_fetcherPersist: true,
    v3_lazyRouteDiscovery: true,
    v3_relativeSplatPath: true,
  },
  serverModuleFormat: "cjs",
  postcss: true,
  tailwind: true,
};