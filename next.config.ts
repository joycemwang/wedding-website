import type { NextConfig } from "next";

// Two deploy targets, one build config:
// - GitHub Pages (staging, auto-deployed on push to main via
//   .github/workflows/deploy.yml): served under a subpath at
//   https://joycemwang.github.io/wedding-website/, so basePath applies.
//   This is `npm run build`, unchanged from before.
// - Cloudflare Pages (production, manually deployed via `npm run
//   deploy:cloudflare`): served at the joyceandryan2027.com root, so
//   basePath must be empty. Set NEXT_PUBLIC_BUILD_TARGET=cloudflare (see
//   package.json's "build:cloudflare" script) to drop the prefix — keep
//   this in sync with app/lib/basePath.ts, which the client bundle uses
//   for the same decision.
const BASE_PATH = "/wedding-website";
const isProd = process.env.NODE_ENV === "production";
const isCloudflare = process.env.NEXT_PUBLIC_BUILD_TARGET === "cloudflare";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd && !isCloudflare ? BASE_PATH : "",
  // Without this, the root route's RSC-fetch URL under basePath ends up
  // without a trailing slash (just "/wedding-website"), which Next's static
  // export client router then wrongly resolves as "/wedding-website.txt"
  // instead of "/wedding-website/index.txt" — 404s and redirect-loops.
  trailingSlash: true,
  images: {
    // Neither GitHub Pages nor Cloudflare Pages run Next's image
    // optimization server for a static export.
    unoptimized: true,
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
