"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RSVPForm from "../components/RSVPForm";
import TextLink from "../components/TextLink";
import { isEnabled } from "../lib/featureFlags";
import styles from "./page.module.css";

export default function RSVPPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isEnabled("rsvp")) {
      router.replace("/");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see AccessGate.tsx for why this can't be useSyncExternalStore
    setChecked(true);
  }, [router]);

  if (!checked) return null;

  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <TextLink href="/" variant="quiet" color="var(--color-burgundy)" className={styles.back}>
          &larr; Back to site
        </TextLink>
        <h1 className={styles.heading}>RSVP</h1>
        <p className={styles.subheading}>We can&rsquo;t wait to celebrate with you.</p>
        <RSVPForm />
      </div>
    </main>
  );
}
