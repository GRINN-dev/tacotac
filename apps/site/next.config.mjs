/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@zxing/browser", "@zxing/library"],
};

export default nextConfig;
