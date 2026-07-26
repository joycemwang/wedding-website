// GitHub Pages is static hosting only, so this gate runs entirely in the
// browser — it's a soft "keep search engines and casual links out" filter,
// not real access control. The passcode itself ships in the client bundle.
const ACCESS_STORAGE_KEY = "wedding_access";
const ACCESS_STORAGE_VALUE = "granted";

export function hasAccess() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ACCESS_STORAGE_KEY) === ACCESS_STORAGE_VALUE;
}

export function grantAccess() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_STORAGE_KEY, ACCESS_STORAGE_VALUE);
}
