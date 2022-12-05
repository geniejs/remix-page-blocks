/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildTarget: "node-cjs",
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === "development" ? undefined : undefined,
  ignoredRouteFiles: [".*"],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  // devServerPort: 8002
  mdx: async (filename) => {
    const [rehypeHighlight] = await Promise.all([import("rehype-highlight").then((mod) => mod.default)]);
    return {
      rehypePlugins: [rehypeHighlight],
    };
  },
};
