import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['http://[IP_ADDRESS]', 'http://localhost:3000', '192.168.1.86'],
  /* config options here */
};

export default nextConfig;
