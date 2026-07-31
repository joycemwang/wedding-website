"use client";

import FlyingButterfly from "./FlyingButterfly";
import { withBasePath } from "../lib/basePath";

// initialDelayMs staggers the three into one quick-succession flurry on
// page load (each starting shortly after the last, while the previous is
// often still mid-flight); minDelayMs/maxDelayMs then take over for every
// flight after that, spacing further appearances out as rare surprises
// rather than a steady background loop.
const BUTTERFLIES = [
  {
    src: withBasePath("/images/flying-butterfly-dark.png"),
    width: 46,
    height: 46,
    minDelayMs: 40_000,
    maxDelayMs: 90_000,
    durationMs: 4_400,
    initialDelayMs: 600,
    // Left side, angling down toward the right — matches this one's
    // antennae/head direction.
    path: {
      startX: -15,
      startYRange: [15, 30] as [number, number],
      endX: 115,
      endYRange: [55, 75] as [number, number],
    },
  },
  {
    src: withBasePath("/images/flying-butterfly-green.png"),
    width: 46,
    height: 44,
    minDelayMs: 50_000,
    maxDelayMs: 110_000,
    durationMs: 4_400,
    initialDelayMs: 3_200,
    // Right side, angling up toward the top left.
    path: {
      startX: 115,
      startYRange: [60, 80] as [number, number],
      endX: -15,
      endYRange: [5, 20] as [number, number],
    },
  },
  {
    src: withBasePath("/images/flying-butterfly-teal.png"),
    width: 46,
    height: 42,
    minDelayMs: 60_000,
    maxDelayMs: 130_000,
    durationMs: 4_400,
    initialDelayMs: 3_600,
    // Top right, angling down toward the bottom left.
    path: {
      startX: 115,
      startYRange: [5, 20] as [number, number],
      endX: -15,
      endYRange: [60, 85] as [number, number],
    },
  },
];

export default function FlyingButterflies() {
  return (
    <>
      {BUTTERFLIES.map((butterfly) => (
        <FlyingButterfly key={butterfly.src} {...butterfly} />
      ))}
    </>
  );
}
