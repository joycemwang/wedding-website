"use client";

import { useState, type CSSProperties } from "react";
import styles from "./ChoiceMenu.module.css";

type ChoiceMenuOption = {
  value: string;
  label: string;
  note?: string;
};

type ChoiceMenuProps = {
  placeholder: string;
  options: ChoiceMenuOption[];
  value: string | null;
  onChange: (value: string) => void;
  color?: string;
  className?: string;
};

export default function ChoiceMenu({
  placeholder,
  options,
  value,
  onChange,
  color,
  className,
}: ChoiceMenuProps) {
  const [open, setOpen] = useState(false);
  const style = color ? ({ "--wc-color": color } as CSSProperties) : undefined;
  const selected = options.find((option) => option.value === value);

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")} style={style}>
      <button
        type="button"
        className={open ? styles.headerOpen : styles.header}
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        <span className={selected ? styles.valueLabel : styles.placeholderLabel}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={styles.verb}>{open ? "Close" : "Choose"}</span>
      </button>

      {open && (
        <div className={styles.options}>
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                className={styles.option}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                aria-pressed={isSelected}
              >
                <span className={styles.mark}>{isSelected ? "✕" : ""}</span>
                <span className={styles.optionLabel}>{option.label}</span>
                <span className={styles.divider} />
                {option.note && <span className={styles.note}>{option.note}</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
