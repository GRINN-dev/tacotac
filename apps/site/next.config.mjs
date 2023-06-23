/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@zxing/browser", "@zxing/library"],
  images: {
    domains: ["cellar-c2.services.clever-cloud.com"],
  },
};

export default nextConfig;
