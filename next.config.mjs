/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "carsequipstorage.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
