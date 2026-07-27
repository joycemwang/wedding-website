import PasscodeMark from "../components/PasscodeMark";
import PasscodeForm from "./PasscodeForm";
import styles from "./page.module.css";
import Image from "next/image";
import { withBasePath } from "../lib/basePath";

export default function PasscodePage() {
  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <PasscodeMark className={styles.mark} />
        <h1 className={styles.heading}>You&rsquo;re invited</h1>
        <p className={styles.subheading}>
          Enter the passcode from your save the date to view the details.
        </p>
        <PasscodeForm />
      </div>
      <Image
        src={withBasePath("/images/footer-landscape.png")}
        alt=""
        aria-hidden="true"
        width={2200}
        height={601}
        className={styles.landscape}
      />
    </main>
  );
}
