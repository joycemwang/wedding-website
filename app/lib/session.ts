// GitHub Pages is static hosting only, so this gate runs entirely in the
// browser — it's a soft "keep search engines and casual links out" filter,
// not real access control. The passcode itself ships in the client bundle.
const ACCESS_STORAGE_KEY = "wedding_access";
const ACCESS_STORAGE_VALUE = "granted";
const NAME_STORAGE_KEY = "wedding_guest_name";

export function hasAccess() {
  if (typeof window === "undefined") return false;
  if (window.localStorage.getItem(ACCESS_STORAGE_KEY) !== ACCESS_STORAGE_VALUE) return false;
  return Boolean(getGuestName());
}

export function grantAccess(name: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_STORAGE_KEY, ACCESS_STORAGE_VALUE);
  window.localStorage.setItem(NAME_STORAGE_KEY, name);
}

export function getGuestName() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(NAME_STORAGE_KEY);
}
