import type { CSSProperties, ReactNode } from "react";
import styles from "./TextLink.module.css";

type TextLinkProps = {
  children: ReactNode;
  variant?: "ornamented" | "lettered" | "quiet";
  color?: string;
  className?: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

export default function TextLink({
  children,
  variant = "lettered",
  color,
  className,
  href,
  external,
  onClick,
  "aria-label": ariaLabel,
}: TextLinkProps) {
  const variantClass =
    variant === "ornamented"
      ? styles.ornamented
      : variant === "quiet"
        ? styles.quiet
        : styles.lettered;

  const classes = [styles.link, variantClass, className]
    .filter(Boolean)
    .join(" ");

  const style = color ? ({ "--wc-color": color } as CSSProperties) : undefined;

  const content =
    variant === "ornamented" ? (
      <>
        <span className={styles.rule} />
        {children}
        <span className={styles.rule} />
      </>
    ) : (
      children
    );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        style={style}
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
      style={style}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
