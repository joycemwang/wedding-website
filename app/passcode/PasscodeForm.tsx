"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { grantAccess } from "../lib/session";
import styles from "./page.module.css";

const SITE_PASSCODE = "mayflower2027";

// Fire-and-forget: this is pure observability (an approximation of who's
// seen the site), never a gate. A failed or slow request here must never
// block or delay the guest getting in — the passcode check above is still
// the only real gate.
function logVisit(name: string) {
  fetch("/api/log-visit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  }).catch(() => {});
}

export default function PasscodeForm() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [pending, setPending] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const passcode = String(formData.get("passcode") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();

    if (passcode.toLowerCase() !== SITE_PASSCODE) {
      setError("That passcode doesn't match — check your save the date and try again.");
      return;
    }

    setPending(true);
    logVisit(name);
    grantAccess();
    router.replace("/");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        label="First & last name"
        name="name"
        type="text"
        autoComplete="name"
        color="var(--color-green-bold)"
        className={styles.formRow}
        required
      />
      <p className={styles.hint}>No need to worry about capitalization</p>
      <TextField
        label="Passcode"
        name="passcode"
        type="text"
        autoComplete="off"
        error={error}
        color="var(--color-green-bold)"
        className={styles.formRow}
        required
      />
      <Button
        type="submit"
        variant="primary"
        color="var(--color-green-bold)"
        disabled={pending}
      >
        {pending ? "Checking…" : "Enter"}
      </Button>
    </form>
  );
}
