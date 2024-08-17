/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: {
      cssPropOptimization: true,
      autoLabel: "dev-only",
      labelFormat: "[local]",
    },
  },
};

export default nextConfig;
