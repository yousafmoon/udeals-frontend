/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
   eslint: {
    ignoreDuringBuilds: process.env.SKIP_LINT === 'true',
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
