import PasscodeMark from "./PasscodeMark";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <PasscodeMark className={styles.mark} />
    </footer>
  );
}
