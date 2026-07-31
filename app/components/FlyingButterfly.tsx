"use client";

import { useEffect, useState } from "react";
import { BREAKPOINTS } from "../styles/breakpoints";
import styles from "./FlyingButterfly.module.css";

// vw/vh-based translation covers the same *percentage* of the screen in the
// same time on any device, but on a narrow mobile viewport that percentage
// is a much smaller pixel distance than on desktop — which reads as
// "crawling" even though the relative crossing time hasn't changed. Scale
// the duration down below the desktop breakpoint so it actually looks
// quicker, not just relatively equal.
const MOBILE_DURATION_SCALE = 0.42;
const MOBILE_SIZE_SCALE = 0.85;

function isMobileViewport() {
  return (
    typeof window !== "undefined" && window.innerWidth < BREAKPOINTS.mediumMin
  );
}

function getEffectiveDuration(durationMs: number) {
  return isMobileViewport() ? durationMs * MOBILE_DURATION_SCALE : durationMs;
}

function getEffectiveSize(px: number) {
  return isMobileViewport() ? px * MOBILE_SIZE_SCALE : px;
}

export type FlightPath = {
  // Off-screen start/end horizontal positions in vw (negative = past the
  // left edge, >100 = past the right edge), each with a vh range to
  // randomize the vertical position within. This fixes each butterfly's
  // direction of travel to match the way its art is drawn facing, while
  // still varying the exact line flight to flight.
  startX: number;
  startYRange: [number, number];
  endX: number;
  endYRange: [number, number];
};

type FlyingButterflyProps = {
  src: string;
  width: number;
  height: number;
  // Each butterfly gets its own randomized delay range so the three never
  // fall into a synchronized rhythm.
  minDelayMs: number;
  maxDelayMs: number;
  durationMs: number;
  path: FlightPath;
  // Overrides the random initial delay for this butterfly's first flight
  // only; later flights still use the normal min/max range.
  initialDelayMs?: number;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

// One smooth quadratic-bezier arc from start to end, in real pixels (an
// SVG path() needs absolute units, not vw/vh) — the control point is offset
// perpendicular to the start→end line for a gentle bow, not the old
// straight-segments-meeting-at-a-corner approach, which is what made the
// flight look like it was cornering rather than gliding.
function buildOffsetPath(
  startXvw: number,
  startYvh: number,
  endXvw: number,
  endYvh: number,
) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const x0 = (startXvw / 100) * vw;
  const y0 = (startYvh / 100) * vh;
  const x1 = (endXvw / 100) * vw;
  const y1 = (endYvh / 100) * vh;

  const dx = x1 - x0;
  const dy = y1 - y0;
  const length = Math.hypot(dx, dy) || 1;
  const perpX = -dy / length;
  const perpY = dx / length;
  const bow = randomBetween(-0.12, 0.12) * length;

  const cx = (x0 + x1) / 2 + perpX * bow;
  const cy = (y0 + y1) / 2 + perpY * bow;

  return `path("M ${x0} ${y0} Q ${cx} ${cy} ${x1} ${y1}")`;
}

export default function FlyingButterfly({
  src,
  width,
  height,
  minDelayMs,
  maxDelayMs,
  durationMs,
  path,
  initialDelayMs,
}: FlyingButterflyProps) {
  const [flight, setFlight] = useState<{
    key: number;
    durationMs: number;
    width: number;
    height: number;
    offsetPath: string;
  } | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const runFlight = () => {
      if (cancelled) return;
      const effectiveDurationMs = getEffectiveDuration(durationMs);
      setFlight({
        key: Date.now(),
        durationMs: effectiveDurationMs,
        width: getEffectiveSize(width),
        height: getEffectiveSize(height),
        offsetPath: buildOffsetPath(
          path.startX,
          randomBetween(...path.startYRange),
          path.endX,
          randomBetween(...path.endYRange),
        ),
      });
      timeout = setTimeout(() => {
        if (cancelled) return;
        setFlight(null);
        timeout = setTimeout(runFlight, randomBetween(minDelayMs, maxDelayMs));
      }, effectiveDurationMs);
    };

    timeout = setTimeout(
      runFlight,
      initialDelayMs ?? randomBetween(minDelayMs, maxDelayMs),
    );
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [minDelayMs, maxDelayMs, durationMs, initialDelayMs, width, height, path]);

  if (flight === null) return null;

  const pathStyle = {
    "--butterfly-w": `${flight.width}px`,
    "--butterfly-h": `${flight.height}px`,
    offsetPath: flight.offsetPath,
    animationDuration: `${flight.durationMs}ms`,
  } as React.CSSProperties;

  return (
    <div key={flight.key} className={styles.path} style={pathStyle}>
      <img src={src} alt="" aria-hidden className={styles.flap} />
    </div>
  );
}
