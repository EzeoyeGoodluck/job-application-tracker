/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
    cachCompnents:true,
  },
};

module.exports = nextConfig;
