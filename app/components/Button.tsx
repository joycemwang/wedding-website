import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  color?: string;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "color">;

export default function Button({
  children,
  variant = "secondary",
  color,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = [
    styles.button,
    variant === "primary" ? styles.primary : styles.secondary,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = color ? ({ "--wc-color": color } as CSSProperties) : undefined;

  return (
    <button type={type} className={classes} style={style} {...rest}>
      {children}
    </button>
  );
}
