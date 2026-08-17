"use client";

import { useState, type FormEvent } from "react";
import Button from "./Button";
import ChoiceList from "./ChoiceList";
import TextArea from "./TextArea";
import TextField from "./TextField";
import styles from "./RSVPForm.module.css";

const ATTENDING_OPTIONS = [
  { value: "yes", label: "Joyfully accepts" },
  { value: "no", label: "Regretfully declines" },
];

export default function RSVPForm() {
  const [attending, setAttending] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    // TODO: wire up actual RSVP submission
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField label="Full Name" name="name" color="var(--color-burgundy)" required />
      <ChoiceList
        label="Will you attend?"
        options={ATTENDING_OPTIONS}
        value={attending}
        onChange={setAttending}
        color="var(--color-burgundy)"
      />
      <TextArea label="Notes" name="notes" color="var(--color-burgundy)" />
      <Button type="submit" variant="primary" color="var(--color-burgundy)" disabled={pending}>
        {pending ? "Sending…" : "Send RSVP"}
      </Button>
    </form>
  );
}
