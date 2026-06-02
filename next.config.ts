import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Copy Products folder to public at build time
const productsSrc = path.join(process.cwd(), "Products");
const productsDest = path.join(process.cwd(), "public", "Products");

if (fs.existsSync(productsSrc)) {
  if (!fs.existsSync(productsDest)) {
    fs.mkdirSync(productsDest, { recursive: true });
  }
  fs.readdirSync(productsSrc).forEach((file) => {
    const src = path.join(productsSrc, file);
    const dest = path.join(productsDest, file);
    if (fs.statSync(src).isFile()) {
      fs.copyFileSync(src, dest);
    }
  });
}

const nextConfig: NextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,
  
  // Image optimization configuration
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Performance & optimization
  compress: true,
  productionBrowserSourceMaps: false,
  
  // Security headers
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  redirects: async () => {
    return [
      // Add redirects here if needed
    ];
  },

  // Rewrites for API routes
  rewrites: async () => {
    return {
      beforeFiles: [
        // Add rewrites here if needed
      ],
    };
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://onyx-watches.com",
    NEXT_PUBLIC_SITE_NAME: "ONYX",
  },

};

export default nextConfig;
