export type CalendarEventInfo = {
  title: string;
  description?: string;
  location: string;
  /** ISO 8601 UTC, e.g. "2027-08-27T23:30:00Z" */
  start: string;
  /** ISO 8601 UTC, e.g. "2027-08-28T02:30:00Z" */
  end: string;
};

function toIcsUtc(iso: string): string {
  return iso.replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
}

export function buildGoogleCalendarUrl(event: CalendarEventInfo): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toIcsUtc(event.start)}/${toIcsUtc(event.end)}`,
    location: event.location,
  });
  if (event.description) params.set("details", event.description);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildOutlookCalendarUrl(event: CalendarEventInfo): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    location: event.location,
    startdt: event.start,
    enddt: event.end,
  });
  if (event.description) params.set("body", event.description);
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export function buildIcsDataUrl(event: CalendarEventInfo): string {
  const uid = `${toIcsUtc(event.start)}-${event.title.replace(/\s+/g, "-")}@joyceandryan.wedding`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Joyce and Ryan Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toIcsUtc(event.start)}`,
    `DTSTART:${toIcsUtc(event.start)}`,
    `DTEND:${toIcsUtc(event.end)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `LOCATION:${escapeIcsText(event.location)}`,
    ...(event.description
      ? [`DESCRIPTION:${escapeIcsText(event.description)}`]
      : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}
