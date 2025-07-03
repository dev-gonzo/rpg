import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "4pN9J3kM1zXq7VhTgF6R2sLbWv8YdC0a",
  },
  // outras configurações aqui
};

export default nextConfig;
