"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { hasAccess } from "../lib/session";

function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return false;
}

// Replaces the old server-side proxy.ts redirect, which can't run on static
// hosting. This only runs after the JS bundle loads, so unlike the old
// server redirect there's a brief flash before an ungated visitor is sent
// to /passcode — acceptable for a soft "keep search engines/casual links
// out" gate, not real access control.
export default function AccessGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  // useSyncExternalStore (not useState+useEffect) so the localStorage read
  // is hydration-safe: server and first client render both see `false` via
  // getServerSnapshot, then the real value takes over post-hydration.
  const granted = useSyncExternalStore(subscribe, hasAccess, getServerSnapshot);

  useEffect(() => {
    if (!granted && pathname !== "/passcode") {
      router.replace("/passcode");
    } else if (granted && pathname === "/passcode") {
      router.replace("/");
    }
  }, [granted, pathname, router]);

  const redirecting = (!granted && pathname !== "/passcode") || (granted && pathname === "/passcode");
  if (redirecting) return null;
  return <>{children}</>;
}
