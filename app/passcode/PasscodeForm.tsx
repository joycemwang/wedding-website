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
  const [nameError, setNameError] = useState<string | undefined>();
  const [passcodeError, setPasscodeError] = useState<string | undefined>();
  const [pending, setPending] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const passcode = String(formData.get("passcode") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();

    const nextNameError = name ? undefined : "Required";
    const nextPasscodeError = !passcode
      ? "Required"
      : passcode.toLowerCase() !== SITE_PASSCODE
        ? "Invalid passcode"
        : undefined;

    setNameError(nextNameError);
    setPasscodeError(nextPasscodeError);
    if (nextNameError || nextPasscodeError) return;

    setPending(true);
    logVisit(name);
    grantAccess(name);
    router.replace("/");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <TextField
        label="First & last name"
        name="name"
        type="text"
        autoComplete="name"
        error={nameError}
        note="No need to worry about capitalization"
        color="var(--color-green-bold)"
        className={styles.formRow}
        required
      />
      <TextField
        label="Passcode"
        name="passcode"
        type="text"
        autoComplete="off"
        error={passcodeError}
        color="var(--color-green-bold)"
        className={`${styles.formRow} ${styles.passcodeField}`}
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
