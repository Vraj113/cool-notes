/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public", // The folder where service worker and other PWA assets will be generated
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
});

const nextConfig = {};

module.exports = withPWA(nextConfig);
