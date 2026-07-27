// next.config.ts sets trailingSlash: true (required for static export + a
// basePath to work at all — see the comment there), which makes
// usePathname() return "/passcode/" rather than "/passcode". Route
// comparisons need to strip that trailing slash first.
export function normalizePathname(pathname: string) {
  return pathname !== "/" ? pathname.replace(/\/$/, "") : pathname;
}
