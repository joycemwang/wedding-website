import type { ComponentType } from "react";
import SectionTravel from './components/SectionTravel';
import SectionEvents from './components/SectionEvents';
import SectionStay from './components/SectionStay';
import SectionRSVP from './components/SectionRSVP';
import SectionRegistry from './components/SectionRegistry';
import { isEnabled, type FeatureFlag } from "./lib/featureFlags";

const ALL_SITE_SECTIONS: Array<{
  id: string;
  title: string;
  href: string;
  description?: string;
  backgroundColor: string;
  headerMinHeight?: string;
  flag?: FeatureFlag;
  showInNav?: boolean;
}> = [
  {
    id: "weekend-events",
    title: "Weekend Events",
    href: "#weekend-events",
    description: "Two days of celebration in the Litchfield Hills",
    backgroundColor: "var(--color-green-bold)",
  },
  {
    id: "rsvp",
    title: "RSVP",
    href: "#rsvp",
    backgroundColor: "var(--color-burgundy)",
    headerMinHeight: isEnabled("rsvp") ? '16rem' : "10rem",
    // Once RSVP is live it gets its own CTA button in the nav bar instead
    // of a plain link — the section still renders in the body either way.
    showInNav: !isEnabled("rsvp"),
  },
  {
    id: "travel",
    title: "Travel",
    href: "#travel",
    description: "Getting to Litchfield County, CT",
    backgroundColor: "var(--color-peach)",
    headerMinHeight: "28rem",
  },
  {
    id: "stay",
    title: "Stay",
    href: "#stay",
    backgroundColor: "var(--color-red-bold)"
  },
  {
    id: "registry",
    title: "Registry",
    href: "#registry",
    backgroundColor: "var(--color-pink)",
    flag: "registry",
    headerMinHeight: "24rem",
  },
];

// Sections behind a flag that's off are dropped entirely — unlike RSVP,
// there's no existing "live" content to fall back to for a brand-new
// section like Registry, so there's nothing to swap to inline.
export const SITE_SECTIONS = ALL_SITE_SECTIONS.filter(
  (section) => !section.flag || isEnabled(section.flag)
);

export const NAV_SECTIONS = SITE_SECTIONS.filter(
  (section) => section.showInNav !== false
);

export const SITE_SECTION_CONTENT_MAP: Record<string, ComponentType> = {
  "weekend-events": SectionEvents,
  travel: SectionTravel,
  stay: SectionStay,
  rsvp: SectionRSVP,
  registry: SectionRegistry,
};
