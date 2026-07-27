import Image from "next/image";
import { withBasePath } from "../lib/basePath";
import PasscodeMark from "./PasscodeMark";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <PasscodeMark className={styles.mark} />
      <Image
        src={withBasePath("/images/footer-landscape.png")}
        alt=""
        aria-hidden="true"
        width={2200}
        height={601}
        className={styles.landscape}
      />
    </footer>
  );
}
