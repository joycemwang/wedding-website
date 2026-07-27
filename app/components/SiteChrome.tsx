"use client";

import { usePathname } from "next/navigation";
import { normalizePathname } from "../lib/pathname";
import ScrollDock from "./ScrollDock";
import SiteHeader from "./SiteHeader";

export default function SiteChrome() {
  const pathname = normalizePathname(usePathname());
  if (pathname === "/passcode") return null;

  return (
    <>
      <ScrollDock />
      <SiteHeader />
    </>
  );
}
