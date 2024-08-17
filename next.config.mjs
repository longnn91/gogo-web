/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: {
      autoLabel: "dev-only",
      labelFormat: "[local]",
      cssPropOptimization: true,
    },
  },
};

export default nextConfig;
