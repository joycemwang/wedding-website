"use client";

import { usePathname } from "next/navigation";
import { normalizePathname } from "../lib/pathname";
import ScrollDock from "./ScrollDock";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = normalizePathname(usePathname());
  if (pathname === "/passcode") return <>{children}</>;

  return (
    <>
      <ScrollDock />
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
