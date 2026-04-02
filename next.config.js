/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // O ESLint local usa uma config de Storybook incompatível com o builder do Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
