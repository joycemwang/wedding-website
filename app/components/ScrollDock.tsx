"use client";

import { useEffect } from "react";
import styles from "./SiteHeader.module.css";

export default function ScrollDock() {
  useEffect(() => {
    const heroText = document.getElementById("hero-wordmark");
    const header = document.getElementById("site-header");
    const headerText = document.getElementById("header-wordmark");
    if (!heroText || !header || !headerText) return;

    let initialTop = 0;
    let initialLeft = 0;
    let initialFontSize = 0;
    let targetTop = 0;
    let targetLeft = 0;
    let targetFontSize = 0;
    let docked = false;
    let frame: number | null = null;

    const fitHeroTextToWidth = () => {
      const wrap = heroText.parentElement;
      if (!wrap) return;

      const referenceFontSize = 16;
      heroText.style.fontSize = `${referenceFontSize}px`;
      const naturalWidth = heroText.getBoundingClientRect().width;
      if (naturalWidth <= 0) return;

      const targetWidth = wrap.getBoundingClientRect().width * 0.92;
      const fittedFontSize = (targetWidth / naturalWidth) * referenceFontSize;
      const maxFontSize = window.innerHeight * 0.3;
      heroText.style.fontSize = `${Math.min(fittedFontSize, maxFontSize)}px`;
    };

    const measure = () => {
      heroText.style.transform = "none";
      fitHeroTextToWidth();
      const heroRect = heroText.getBoundingClientRect();
      initialTop = heroRect.top + window.scrollY;
      initialLeft = heroRect.left;
      initialFontSize = parseFloat(getComputedStyle(heroText).fontSize);

      const headerRect = headerText.getBoundingClientRect();
      targetTop = headerRect.top;
      targetLeft = headerRect.left;
      targetFontSize = parseFloat(getComputedStyle(headerText).fontSize);
    };

    const setDocked = (next: boolean) => {
      if (docked === next) return;
      docked = next;
      if (next) {
        heroText.style.visibility = "hidden";
        headerText.style.opacity = "1";
        headerText.style.pointerEvents = "auto";
        header.classList.add(styles.headerSolid);
        document.documentElement.classList.add("docked");
      } else {
        heroText.style.visibility = "visible";
        headerText.style.opacity = "0";
        headerText.style.pointerEvents = "none";
        header.classList.remove(styles.headerSolid);
        document.documentElement.classList.remove("docked");
      }
    };

    const update = () => {
      const totalDistance = initialTop - targetTop;
      const t =
        totalDistance > 0
          ? Math.min(1, Math.max(0, window.scrollY / totalDistance))
          : 1;

      if (t >= 1) {
        setDocked(true);
      } else {
        setDocked(false);
        const scale = 1 + (targetFontSize / initialFontSize - 1) * t;
        const dx = (targetLeft - initialLeft) * t;
        heroText.style.transform = `translateX(${dx}px) scale(${scale})`;
      }
      frame = null;
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
