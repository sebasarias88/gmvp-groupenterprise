import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Keep old WordPress URLs working (SEO + shared links).
  async redirects() {
    return [
      { source: "/quienes_somos", destination: "/grupo", permanent: true },
      { source: "/equipo", destination: "/fundador", permanent: true },
      { source: "/portafolio-de-companas", destination: "/portafolio", permanent: true },
      { source: "/preguntas-frecuentes", destination: "/invertir#preguntas", permanent: true },
      { source: "/contactenos", destination: "/contacto", permanent: true },
      { source: "/slogan", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
