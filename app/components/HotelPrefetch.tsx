"use client";

import { useEffect, useRef } from "react";

// Invisible sentinel dropped at the top of a hotel block. It warms the
// browser's image cache for that hotel's heavy, non-carousel photos (e.g.
// Belden's engagement photos) about a screen's-height before the block
// itself scrolls into view, so they're already loaded by the time the user
// gets there instead of appearing blank.
export default function HotelPrefetch({ srcs }: { srcs: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || srcs.length === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        srcs.forEach((src) => {
          const img = new window.Image();
          img.src = src;
        });
        observer.disconnect();
      },
      { rootMargin: "0px 0px 800px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [srcs]);

  return <div ref={ref} aria-hidden="true" style={{ position: "absolute" }} />;
}
