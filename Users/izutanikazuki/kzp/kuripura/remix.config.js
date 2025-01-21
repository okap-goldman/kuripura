/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildTarget: "node",
  server: process.env.NODE_ENV === "production" ? "./server.js" : undefined,
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ["**/.*"],
  // TailwindCSSを使うための設定
  future: {
    unstable_postcss: true,
    unstable_tailwind: true,
  },
  postcss: true,
  tailwind: true,
};