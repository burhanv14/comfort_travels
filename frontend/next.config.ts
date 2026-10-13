import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    ADMIN_EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};