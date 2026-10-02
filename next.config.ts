import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Evita que lockfiles fora do repositório sejam tomados como raiz do workspace.
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
    // O otimizador só processa imagens públicas — nunca material interno.
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/brand/**" }],
  },
  // Páginas do brandbook ficam fora de /public e são lidas pelo route handler protegido.
  outputFileTracingIncludes: {
    "/design-system/brandbook/[page]": ["./src/design-system/assets/brandbook/**"],
  },
  async headers() {
    return [
      {
        source: "/design-system/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
};

export default nextConfig;
