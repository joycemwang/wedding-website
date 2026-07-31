// Must match the basePath in next.config.ts. next/link and next/image do
// NOT auto-prefix raw string paths, so any hardcoded "/images/..." reference
// needs to go through this helper. Empty for `next dev` and for the
// Cloudflare production build (NEXT_PUBLIC_BUILD_TARGET=cloudflare, served
// at the joyceandryan2027.com root) — only the GitHub Pages staging build
// serves under a subpath. NEXT_PUBLIC_ prefix is required here (unlike
// next.config.ts) since this runs in the client bundle, not just at build
// time.
const isProd = process.env.NODE_ENV === "production";
const isCloudflare = process.env.NEXT_PUBLIC_BUILD_TARGET === "cloudflare";
export const BASE_PATH = isProd && !isCloudflare ? "/wedding-website" : "";

export function withBasePath(path: string) {
  return `${BASE_PATH}${path}`;
}
