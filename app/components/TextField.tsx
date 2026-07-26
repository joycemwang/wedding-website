import type { CSSProperties, InputHTMLAttributes } from "react";
import styles from "./TextField.module.css";

type TextFieldProps = {
  label: string;
  variant?: "text" | "numeral";
  color?: string;
  error?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "color" | "size">;

export default function TextField({
  label,
  variant = "text",
  color,
  error,
  className,
  id,
  ...rest
}: TextFieldProps) {
  const inputId = id ?? `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const style = color ? ({ "--wc-color": color } as CSSProperties) : undefined;

  return (
    <div
      className={[styles.row, className].filter(Boolean).join(" ")}
      style={style}
    >
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <div className={styles.fieldWrap}>
        <input
          id={inputId}
          className={[
            styles.input,
            variant === "numeral" ? styles.numeral : styles.text,
            error ? styles.errorInput : "",
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        />
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    </div>
  );
}
