import { ENVIRONMENT } from "./environment";

const FLAGS = {
  rsvp: { dev: true, prod: false },
  registry: { dev: false, prod: false },
} as const;

export type FeatureFlag = keyof typeof FLAGS;

export function isEnabled(flag: FeatureFlag) {
  return FLAGS[flag][ENVIRONMENT];
}
