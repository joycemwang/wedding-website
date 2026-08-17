// Static export means there's no server to check flags against at request
// time (see next.config.ts) — environment has to be resolved at build time,
// from the same signal basePath.ts already uses to tell deploy targets
// apart. Local dev and GitHub Pages (QA) are treated as one "dev" bucket
// since QA is just a preview of what's about to ship, not a distinct
// audience — only Cloudflare (the real joyceandryan2027.com prod site)
// gets its own bucket.
export type Environment = "dev" | "prod";

const isCloudflare = process.env.NEXT_PUBLIC_BUILD_TARGET === "cloudflare";

export const ENVIRONMENT: Environment = isCloudflare ? "prod" : "dev";
