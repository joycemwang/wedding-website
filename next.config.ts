import type { NextConfig } from "next";

// Served from https://joycemwang.github.io/wedding-website/ — keep this in
// sync with app/lib/basePath.ts. Only applied for production builds (what
// actually gets deployed) so `next dev` still serves at localhost:3000/.
const BASE_PATH = "/wedding-website";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? BASE_PATH : "",
  images: {
    // GitHub Pages has no image optimization server.
    unoptimized: true,
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
