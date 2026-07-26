import type { CSSProperties, TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";

type TextAreaProps = {
  label: string;
  color?: string;
  className?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "color">;

export default function TextArea({
  label,
  color,
  className,
  id,
  rows = 3,
  ...rest
}: TextAreaProps) {
  const inputId = id ?? `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const style = color ? ({ "--wc-color": color } as CSSProperties) : undefined;

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <textarea
        id={inputId}
        rows={rows}
        className={styles.textarea}
        style={style}
        {...rest}
      />
    </div>
  );
}
