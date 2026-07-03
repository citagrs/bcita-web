import type { NextConfig } from "next";

const STATIC_PAGES = [
  "servicios",
  "restaurantes",
  "clinicas",
  "web",
  "crm",
  "politica-datos",
];

const nextConfig: NextConfig = {
  async redirects() {
    // URLs antiguas con /index.html -> URL limpia (301 permanente, evita contenido duplicado)
    return STATIC_PAGES.map((page) => ({
      source: `/${page}/index.html`,
      destination: `/${page}`,
      permanent: true,
    }));
  },
  async rewrites() {
    // Sirve el HTML estático de public/ en la URL limpia
    return STATIC_PAGES.map((page) => ({
      source: `/${page}`,
      destination: `/${page}/index.html`,
    }));
  },
};

export default nextConfig;
