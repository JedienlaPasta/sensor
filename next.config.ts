import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  poweredByHeader: false,
  reactStrictMode: true,

  // Estas cabeceras se inyectan en todas las respuestas del servidor.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // (Opcional) HSTS: Fuerza al navegador a usar siempre HTTPS.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
