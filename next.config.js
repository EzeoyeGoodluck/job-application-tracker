const nextConfig = {
  experimental: {
    useCache: true,
  },
  turbopack: {
    root: __dirname,
    cacheComponents: true,
  },
};

module.exports = nextConfig;
