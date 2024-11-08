import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 60,
    },
  },
  eslint: {
    // This option allows production builds to successfully complete even if your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

