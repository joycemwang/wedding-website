// JS-side mirror of app/styles/breakpoints.css (the enforced source of
// truth for *.module.css via `@custom-media`). Use this if any JS ever
// needs matchMedia — keep both files in sync if these numbers change.
export const BREAKPOINTS = {
  /** Small (mobile): default/base styles apply below this. */
  mediumMin: 768,
  /** Upper bound of the medium (tablet) tier. */
  mediumMax: 1023,
  /** Large (desktop): styles apply at and above this width. */
  largeMin: 1024,
} as const;
