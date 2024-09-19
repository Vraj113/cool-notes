import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // You can add other Next.js config options here
};

const pwaConfig = {
  dest: "public", // Folder where service worker is generated
  register: true, // Registers service worker automatically
  skipWaiting: true, // Installs updates automatically
};

export default withPWA(pwaConfig)(nextConfig);
