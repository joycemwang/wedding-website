import type { ReactNode } from "react";
import styles from "./StickySplitSection.module.css";

type StickySplitSectionProps = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  headerSide?: "left" | "right";
  color?: string;
  backgroundColor?: string;
  /* Overrides the header panel's default calc(100vh - 5.5rem) min-height
     (see .headerInner in the CSS module). The default assumes content
     taller than one viewport, so the sticky title has room to follow
     the scroll — for a section with short, fixed content (content that
     "won't change"), hardcode this to whatever height actually looks
     right instead, rather than trying to make one generic rule cover
     every section length. */
  headerMinHeight?: string;
};

const DEFAULT_COLOR = "var(--color-background)";
const DEFAULT_BACKGROUND_COLOR = "var(--color-surface-1)";

export default function StickySplitSection({
  id,
  title,
  description,
  children,
  headerSide = "left",
  color = DEFAULT_COLOR,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  headerMinHeight,
}: StickySplitSectionProps) {
  const headerColumn = headerSide === "right" ? 2 : 1;
  const contentColumn = headerSide === "right" ? 1 : 2;

  return (
    <section id={id} className={styles.section}>
      <div
        className={styles.header}
        style={{ gridColumn: headerColumn, gridRow: 1, backgroundColor }}
      >
        <div
          className={styles.headerInner}
          style={
            headerMinHeight
              ? ({ "--header-min-height": headerMinHeight } as React.CSSProperties)
              : undefined
          }
        >
          <h2 className={styles.title} style={{ color }}>
            {title}
          </h2>
          {description && <p className={styles.description} style={{ color }}>
            {description}
          </p>}
        </div>
      </div>
      <div
        className={styles.content}
        style={{ gridColumn: contentColumn, gridRow: 1 }}
      >
        {children}
      </div>
    </section>
  );
}
