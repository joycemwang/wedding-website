"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { normalizePathname } from "../lib/pathname";
import { hasAccess } from "../lib/session";

// Replaces the old server-side proxy.ts redirect, which can't run on static
// hosting. This only runs after the JS bundle loads, so unlike the old
// server redirect there's a brief flash before an ungated visitor is sent
// to /passcode — acceptable for a soft "keep search engines/casual links
// out" gate, not real access control.
//
// This deliberately reads localStorage inside a plain effect (not
// useSyncExternalStore) even though that means one un-memoized setState per
// mount: useSyncExternalStore's getServerSnapshot has to report `false`
// during the static-export prerender (no `window`), and React's internal
// re-check of the real client value races against this component's own
// redirect effect. That race can fire the redirect on the stale `false`
// value even when access was already granted. Reading directly in an
// effect means the read only ever happens post-mount, in the browser, with
// no race.
export default function AccessGate({ children }: { children: React.ReactNode }) {
  const pathname = normalizePathname(usePathname());
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const granted = hasAccess();

    if (!granted && pathname !== "/passcode") {
      router.replace("/passcode");
      return;
    }

    if (granted && pathname === "/passcode") {
      router.replace("/");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- see file comment
    setChecked(true);
  }, [pathname, router]);

  if (!checked) return null;
  return <>{children}</>;
}
