import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first, WebP as fallback — the source PNGs in /public are 0.1–2.2 MB each.
    formats: ["image/avif", "image/webp"],
    // 90 is reserved for Portal screenshots, where small UI text blurs at the default 75.
    qualities: [75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
