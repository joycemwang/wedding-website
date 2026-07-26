// Must match the basePath in next.config.ts. next/link and next/image do
// NOT auto-prefix raw string paths, so any hardcoded "/images/..." reference
// needs to go through this helper. Only applied in production builds, same
// as next.config.ts, so `next dev` still serves assets from the root.
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/wedding-website" : "";

export function withBasePath(path: string) {
  return `${BASE_PATH}${path}`;
}
