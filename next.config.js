/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['vercel.com'],
  },
  experimental: {
    appDir: true,
  }
};

module.exports = nextConfig; 