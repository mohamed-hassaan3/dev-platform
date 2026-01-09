import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config, { isServer, dir }) => {
    if (isServer) {
      // Resolve Prisma 7 runtime library for @auth/prisma-adapter compatibility
      // @auth/prisma-adapter expects @prisma/client/runtime/library which doesn't exist in Prisma 7
      // We alias it to our compatibility shim
      config.resolve.alias = {
        ...config.resolve.alias,
        '@prisma/client/runtime/library': path.join(dir, 'lib/prisma-compat'),
      };
    }
    return config;
  },
};

export default nextConfig;
