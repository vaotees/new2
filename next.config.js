/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Compress responses
  compress: true,
  // Optimize production builds
  poweredByHeader: false,
  // Allow images from external sources (Unsplash, Google, etc.)
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Webpack: tree-shake more aggressively
  webpack: (config, { dev, isServer }) => {
    // In production client builds, enable module concatenation
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
      }
    }
    return config
  },
}

module.exports = nextConfig
