import type { NextConfig } from "next";

const repo = 'portfolio-josegalvan';
const nextConfig: NextConfig = {
  // Exporta el sitio como estático para GitHub Pages
  output: 'export',
  assetPrefix: `/${repo}/`,
  basePath: `/${repo}`,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ignored: ['**/*'],
      };
    }
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
