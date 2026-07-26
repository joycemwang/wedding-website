import type { ReactNode } from "react";
import styles from "./DesignLink.module.css";

type DesignLinkProps = {
  children: ReactNode;
  direction?: "left" | "right";
  className?: string;
  href?: string;
  external?: boolean;
  download?: string;
  onClick?: () => void;
  "aria-expanded"?: boolean;
  "aria-label"?: string;
};

export default function DesignLink({
  children,
  direction = "right",
  className,
  href,
  external,
  download,
  onClick,
  "aria-expanded": ariaExpanded,
  "aria-label": ariaLabel,
}: DesignLinkProps) {
  const arrow = (
    <span
      className={direction === "left" ? styles.arrowLeft : styles.arrowRight}
    >
      {direction === "left" ? "←" : "→"}
    </span>
  );

  const content =
    direction === "left" ? (
      <>
        {arrow}
        {children}
      </>
    ) : (
      <>
        {children}
        {arrow}
      </>
    );

  const classes = [styles.link, className].filter(Boolean).join(" ");

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      aria-expanded={ariaExpanded}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
