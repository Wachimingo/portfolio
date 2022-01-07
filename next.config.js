/* eslint-disable prettier/prettier */
/** @type {import('next').NextConfig} */
module.exports = {
  compress: true,
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    concurrentFeatures: true,
    serverComponents: true
  }
};
