import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Evita que lockfiles fora do repositório sejam tomados como raiz do workspace.
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
