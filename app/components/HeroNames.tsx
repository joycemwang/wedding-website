import styles from "../page.module.css";

export default function HeroNames() {
  return (
    <div className={styles.heroWordmarkWrap}>
      <span id="hero-wordmark" className={styles.heroWordmark}>
        Joyce &amp; Ryan
      </span>
    </div>
  );
}
