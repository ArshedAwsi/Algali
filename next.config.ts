import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a0.muscache.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'yamlnoydeoywybtdwozh.supabase.co',
        port: '',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb', // Set the body size limit to 2 MB
    },
  },
};

export default nextConfig;
