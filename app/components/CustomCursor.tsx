"use client";

import { useEffect } from "react";
import { withBasePath } from "../lib/basePath";

// Hotspot sits near the butterfly's head/antennae (roughly 47%, 82% of the
// 40x28 image) rather than the image's top-left corner, so clicks land
// where the butterfly appears to be "pointing".
const CURSOR_URL = withBasePath("/images/cursor-butterfly.png");
const HOTSPOT_X = 19;
const HOTSPOT_Y = 23;

export default function CustomCursor() {
  useEffect(() => {
    document.body.style.cursor = `url(${CURSOR_URL}) ${HOTSPOT_X} ${HOTSPOT_Y}, auto`;
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  return null;
}
