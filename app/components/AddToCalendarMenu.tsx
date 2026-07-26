"use client";

import { useEffect, useRef, useState } from "react";
import {
  buildGoogleCalendarUrl,
  buildIcsDataUrl,
  buildOutlookCalendarUrl,
  type CalendarEventInfo,
} from "../lib/calendar";
import DesignLink from "./DesignLink";
import styles from "./AddToCalendarMenu.module.css";

type AddToCalendarMenuProps = {
  event: CalendarEventInfo;
};

export default function AddToCalendarMenu({ event }: AddToCalendarMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isOpen]);

  const googleUrl = buildGoogleCalendarUrl(event);
  const outlookUrl = buildOutlookCalendarUrl(event);
  const icsUrl = buildIcsDataUrl(event);
  const icsFilename = `${event.title.replace(/\s+/g, "-")}.ics`;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <DesignLink
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        Add to Calendar
      </DesignLink>

      {isOpen && (
        <ul className={styles.menu}>
          <li>
            <a href={googleUrl} target="_blank" rel="noopener noreferrer">
              Google Calendar
            </a>
          </li>
          <li>
            <a href={icsUrl} download={icsFilename}>
              Apple Calendar
            </a>
          </li>
          <li>
            <a href={outlookUrl} target="_blank" rel="noopener noreferrer">
              Outlook Calendar
            </a>
          </li>
          <li>
            <a href={icsUrl} download={icsFilename}>
              Other Calendar
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
