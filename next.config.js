/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,   // ✅ WASM support
      topLevelAwait: true,      // ✅ top-level await
      layers: true,             // ✅ Enable layers (important!)
    };
    return config;
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
