import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Experimental configurations (unchanged)
  experimental: {
    staleTimes: {
      dynamic: 60, // Customize cache expiration for dynamic content
    },
  },

  // ESLint configuration to ignore ESLint during production builds
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors in production builds
  },
  // next.config.js
  typescript: {
    ignoreBuildErrors: true,
  },

  // Webpack configuration for custom module resolution
  webpack(config) {
    // Ensure '@' alias points to the 'src' directory
    config.resolve.alias["@"] = path.join(__dirname, "src");

    // Optional: Ensure React components are optimized for server-side rendering
    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  },

  // React strict mode setting (optional but recommended)
  reactStrictMode: true, // Enable React's Strict Mode for better development checks

  // Additional Next.js configuration options can be added here
};

export default nextConfig;
