import type { CSSProperties } from "react";
import styles from "./ChoiceList.module.css";

type ChoiceOption = {
  value: string;
  label: string;
};

type ChoiceListProps = {
  label?: string;
  options: ChoiceOption[];
  value: string | null;
  onChange: (value: string) => void;
  color?: string;
  className?: string;
};

export default function ChoiceList({
  label,
  options,
  value,
  onChange,
  color,
  className,
}: ChoiceListProps) {
  const style = color ? ({ "--wc-color": color } as CSSProperties) : undefined;

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")} style={style}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.list}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              className={styles.option}
              onClick={() => onChange(option.value)}
              aria-pressed={selected}
            >
              <span className={styles.mark}>
                <span className={styles.markGlyph}>{selected ? "✕" : ""}</span>
              </span>
              <span
                className={
                  selected ? styles.optionLabelSelected : styles.optionLabel
                }
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
