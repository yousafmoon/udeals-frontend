/** @type {import('next').NextConfig} */
const nextConfig = {
   eslint: {
    ignoreDuringBuilds: true,
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
