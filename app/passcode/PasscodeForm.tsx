"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { grantAccess } from "../lib/session";
import styles from "./page.module.css";

const SITE_PASSCODE = "mayflower2027";

export default function PasscodeForm() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [pending, setPending] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const passcode = String(new FormData(event.currentTarget).get("passcode") ?? "").trim();

    if (passcode.toLowerCase() !== SITE_PASSCODE) {
      setError("That passcode doesn't match — check your save the date and try again.");
      return;
    }

    setPending(true);
    grantAccess();
    router.replace("/");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        label="Passcode"
        name="passcode"
        type="text"
        autoComplete="off"
        error={error}
        color="var(--color-green-bold)"
        style={{ fontStyle: "italic" }}
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
