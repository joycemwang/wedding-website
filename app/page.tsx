import HeroCarousel from "./components/HeroCarousel";
import HeroNames from "./components/HeroNames";
import StickySplitSection from "./components/StickySplitSection";
import { withBasePath } from "./lib/basePath";
import styles from "./page.module.css";
import { SITE_SECTIONS, SITE_SECTION_CONTENT_MAP } from "./siteSections";

export default function Home() {
  return (
    <>
      <section
        id="hero"
        className={styles.hero}
        style={{
          ["--hero-bg-image" as string]: `url(${withBasePath("/images/hero-bg-peony.png")})`,
        } as React.CSSProperties}
      >
        <div className={styles.heroImage}>
          <HeroCarousel />
        </div>

        <HeroNames />

        <div className={styles.tagline} style={{ writingMode: "sideways-rl" }}>
          <span className={styles.taglineShort}>8.28.27 &middot; The Mayflower Inn</span>
          <span className={styles.taglineFull}>
            August 28, 2027 &middot; The Mayflower Inn
          </span>
        </div>
      </section>

      {SITE_SECTIONS.map((section, index) => (
        <StickySplitSection
          key={section.id}
          id={section.id}
          headerSide={index % 2 === 0 ? "left" : "right"}
          title={section.title}
          description={section.description}
          backgroundColor={section.backgroundColor}
          headerMinHeight={section.headerMinHeight}
        >
          {(() => {
            const SectionContent = SITE_SECTION_CONTENT_MAP[section.id];
            return SectionContent ? <SectionContent /> : null;
          })()}
        </StickySplitSection>
      ))}
    </>
  );
}
