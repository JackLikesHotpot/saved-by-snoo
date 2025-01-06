/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.redd.it', 'i.imgur.com', 'pbs.twimg.com']
  }
};

module.exports = nextConfig;