/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public", // Folder where service worker is generated
  register: true, // Registers service worker automatically
  skipWaiting: true, // Installs updates automatically
});

const nextConfig = {
  reactStrictMode: true,
  // You can add other Next.js config options here
};

module.exports = withPWA(nextConfig);
