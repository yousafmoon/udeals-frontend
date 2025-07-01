/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: process.env.SKIP_LINT === 'true',
  },
  typescript: {
  ignoreBuildErrors: process.env.SKIP_LINT === 'true',
},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ujz.cuf.temporary.site',
      },
    ],
  },
};

module.exports = nextConfig;
