/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      "onmom-files.s3.ap-northeast-2.amazonaws.com",
      "oaidalleapiprodscus.blob.core.windows.net",
    ],
  },
};
export default nextConfig;
