/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.coingecko.com"],
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
