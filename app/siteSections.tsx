import type { ComponentType } from "react";
import SectionTravel from './components/SectionTravel';
import SectionEvents from './components/SectionEvents';
import SectionStay from './components/SectionStay';
import SectionRSVP from './components/SectionRSVP';

export const SITE_SECTIONS = [
  {
    id: "weekend-events",
    title: "Weekend Events",
    href: "#weekend-events",
    description: "Two days of celebration in the Litchfield Hills",
    backgroundColor: "var(--color-green-bold)",
  },
  {
    id: "rsvp",
    title: "Rsvp",
    href: "#rsvp",
    backgroundColor: "var(--color-burgundy)",
    headerMinHeight: "10rem",
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
];

export const SITE_SECTION_CONTENT_MAP: Record<string, ComponentType> = {
  "weekend-events": SectionEvents,
  travel: SectionTravel,
  stay: SectionStay,
  rsvp: SectionRSVP,
};
