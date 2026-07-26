"use client";

import { useState } from "react";
import { SITE_SECTIONS } from "../siteSections";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header id="site-header" className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            {SITE_SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={section.href}>
                  <span>{section.title}</span>
                </a>
              </li>
            ))}
          </ul>
          <a id="header-wordmark" href="#hero" className={styles.wordmark}>
            Joyce &amp; Ryan
          </a>
        </nav>
      </header>

      <button
        type="button"
        className={styles.toggle}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span className={`${styles.toggleInner} ${isMenuOpen ? styles.toggleOpen : ""}`}>
          <span />
          <span />
        </span>
      </button>

      <div
        className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ""}`}
      >
        <ul className={styles.mobileNavLinks}>
          {SITE_SECTIONS.map((section) => (
            <li key={section.id}>
              <a href={section.href} onClick={() => setIsMenuOpen(false)}>
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
