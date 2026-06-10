/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'omg-retro-backend-production.up.railway.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.railway.app',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
