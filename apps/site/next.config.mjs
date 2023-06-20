/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@zxing/browser", "@zxing/library"],
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
