import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com', // Permiso para Shopify
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Permiso para las fotos del Hero
      }
    ],
  },
};


export default nextConfig;
