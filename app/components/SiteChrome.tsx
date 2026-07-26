"use client";

import { usePathname } from "next/navigation";
import ScrollDock from "./ScrollDock";
import SiteHeader from "./SiteHeader";

export default function SiteChrome() {
  const pathname = usePathname();
  if (pathname === "/passcode") return null;

  return (
    <>
      <ScrollDock />
      <SiteHeader />
    </>
  );
}
