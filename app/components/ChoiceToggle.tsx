import type { CSSProperties } from "react";
import styles from "./ChoiceToggle.module.css";

type ChoiceOption = {
  value: string;
  label: string;
};

type ChoiceToggleProps = {
  options: ChoiceOption[];
  value: string | null;
  onChange: (value: string) => void;
  color?: string;
  className?: string;
};

export default function ChoiceToggle({
  options,
  value,
  onChange,
  color,
  className,
}: ChoiceToggleProps) {
  const style = color ? ({ "--wc-color": color } as CSSProperties) : undefined;

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")} style={style}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            className={selected ? styles.optionSelected : styles.option}
            onClick={() => onChange(option.value)}
            aria-pressed={selected}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
