import Image from "next/image";
import AddToCalendarMenu from "./AddToCalendarMenu";
import DesignLink from "./DesignLink";
import FadeIn from "./FadeIn";
import type { CalendarEventInfo } from "../lib/calendar";
import { withBasePath } from "../lib/basePath";
import styles from "./SectionEvents.module.css";

function splitTime(time: string) {
  const match = time.match(/^(.*\d)\s*(AM|PM)$/i);
  if (!match) return { clock: time, meridiem: null };
  return { clock: match[1], meridiem: match[2] };
}

type EventItem = {
  title: string;
  timeMain: string;
  timeSub?: string;
  blurb: string;
  spot?: string;
};

type DayItem = {
  num: string;
  weekday: string;
  month: string;
  venueImageSrc?: string;
  venueImageWidth?: number;
  venueImageHeight?: number;
  photoCaption?: string;
  venue: string;
  venueUrl?: string;
  directionsUrl: string;
  address: string;
  attire: string;
  attireNote: string;
  events: EventItem[];
  calendarEvent: CalendarEventInfo;
};

const DAYS: DayItem[] = [
  {
    num: "27",
    weekday: "Friday",
    month: "August 2027",
    venueImageSrc: withBasePath("/images/litchfield-illustration-v1.png"),
    venueImageWidth: 1534,
    venueImageHeight: 1025,
    venue: "The Litchfield Inn",
    venueUrl: "https://www.litchfieldinnct.com/",
    directionsUrl: "https://maps.app.goo.gl/GfeRUy1PntDkHAfv5",
    address: "Bantam Road, Litchfield, CT",
    attire: "Cocktail",
    attireNote: "",
    events: [
      {
        title: "Welcome Party",
        timeMain: "7:30 PM",
        timeSub: "until 10:30",
        blurb:
          "Kick off the weekend with cocktails and some small bites. Come say hi, meet the other guests, and settle into the weekend.",
      },
    ],
    calendarEvent: {
      title: "Joyce & Ryan Welcome Party",
      location: "The Litchfield Inn, 432 Bantam Rd, Litchfield, CT 06759, USA",
      // 7:30–10:30 PM EDT (America/New_York, UTC-4 in August)
      start: "2027-08-27T23:30:00Z",
      end: "2027-08-28T02:30:00Z",
    },
  },
  {
    num: "28",
    weekday: "Saturday",
    month: "August 2027",
    venueImageSrc: withBasePath("/images/mayflower-illustration-v2.png"),
    venueImageWidth: 1651,
    venueImageHeight: 953,
    venue: "The Mayflower Inn",
    venueUrl: "https://auberge.com/mayflower/",
    directionsUrl: "https://maps.app.goo.gl/iJPykN311NNZ1AvCA",
    address: "Auberge Collection, 118 Woodbury Rd, Washington, CT",
    attire: "Black Tie",
    attireNote:
      "Qipaos encouraged. Also, note the majority of the day will take place on grass or pebbled areas.",
    events: [
      {
        title: "Ceremony",
        timeMain: "4:00 PM",
        blurb: "",
        spot: "The Heron Pond",
      },
      {
        title: "Reception",
        timeMain: "5:30 PM",
        blurb:
          "Dinner, toasts and dancing.",
        spot: "The Tennis Court",
      },
      {
        title: "Afterparty",
        timeMain: "10:30 PM",
        timeSub: "until 1:00 AM",
        blurb: "",
        spot: "The Tea House",
      },
    ],
    calendarEvent: {
      title: "Joyce & Ryan Wedding",
      location: "Mayflower Inn & Spa, Auberge Collection, 118 Woodbury Rd, CT-47, Washington, CT 06793, USA",
      // 4:00 PM Ceremony EDT through 1:00 AM After Party end (rolls to
      // the next calendar day), America/New_York, UTC-4 in August.
      start: "2027-08-28T20:00:00Z",
      end: "2027-08-29T05:00:00Z",
    },
  },
];

export default function SectionEvents() {
  return (
    <div className={styles.schedule}>
      {DAYS.map((day) => (
        <div key={day.num} className={styles.day}>

          <div className={styles.dayHeader}>
            <span className={styles.dayNum}>{day.num}</span>
            <div>
              <div className={styles.dayWeekday}>{day.weekday}</div>
              <div className={styles.dayMonth}>{day.month}</div>
            </div>
          </div>

          <div className={styles.dayMeta}>
            <div>
              <div className={styles.metaLabel}>Where</div>
              {day.venueUrl ? (
                <a
                  href={day.venueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.metaValue} ${styles.metaValueLink}`}
                >
                  {day.venue}
                </a>
              ) : (
                <div className={styles.metaValue}>{day.venue}</div>
              )}
              <div className={styles.metaNote}>{day.address}</div>
              <div className={styles.metaLinks}>
                <DesignLink href={day.directionsUrl} external>
                  Directions
                </DesignLink>
                <AddToCalendarMenu event={day.calendarEvent} />
              </div>
            </div>
            <div>
              <div className={styles.metaLabel}>Attire</div>
              <div className={styles.metaValue}>{day.attire}</div>
              <div className={styles.metaNote}>{day.attireNote}</div>
            </div>
          </div>

          <div className={styles.scheduleLabel}>Schedule</div>

          {day.events.map((ev) => (
            <FadeIn key={ev.title} className={styles.eventRow}>
              <div className={styles.eventTime}>
                <div className={styles.eventTimeMain}>
                  {(() => {
                    const { clock, meridiem } = splitTime(ev.timeMain);
                    return (
                      <>
                        {clock}
                        {meridiem && (
                          <span className={styles.eventTimeMeridiem}>
                            {" "}
                            {meridiem}
                          </span>
                        )}
                      </>
                    );
                  })()}
                </div>
                {ev.timeSub && (
                  <div className={styles.eventTimeSub}>{ev.timeSub}</div>
                )}
              </div>
              <div className={styles.eventBody}>
                <span className={styles.eventMarker} />
                <h2 className={styles.eventTitle}>{ev.title}</h2>
                <p className={styles.eventBlurb}>{ev.blurb}</p>
                {ev.spot && <div className={styles.eventSpot}>{ev.spot}</div>}
              </div>
            </FadeIn>
          ))}

          {day.venueImageSrc && (
            <div className={styles.chapterPhoto}>
              <div className={styles.chapterPhotoFrame}>
                <Image
                  src={day.venueImageSrc}
                  alt={`Illustration of ${day.venue}`}
                  width={day.venueImageWidth}
                  height={day.venueImageHeight}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
