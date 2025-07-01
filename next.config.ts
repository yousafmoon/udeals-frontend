/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
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
