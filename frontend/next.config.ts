/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.redd.it',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'preview.redd.it',
      },
      {
        protocol: 'https',
        hostname: 'external-preview.redd.it'
      },
      {
        protocol: 'https',
        hostname: 'i.gyazo.com'
      },
      {
        protocol: 'https',
        hostname: 'x.com'
      },
      {
        protocol: 'https',
        hostname: 'www.reddit.com'
      },      
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com'
      }
    ]
  }
};

module.exports = nextConfig;
