import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/pdf/:path*", 
        destination: "https://dialisisconnect.site/:path*", 
      },
    ];
  },
};

export default nextConfig;
