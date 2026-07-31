import Image from "next/image";
import HotelCarousel from "./HotelCarousel";
import HotelMap from "./HotelMap";
import HotelPrefetch from "./HotelPrefetch";
import type { ReactNode } from "react";
import { withBasePath } from "../lib/basePath";
import styles from "./SectionStay.module.css";

type Hotel = {
  id: string;
  name: string;
  url?: string;
  lat: number;
  lng: number;
  images?: { src: string; alt: string }[];
  // Heavy images beyond the carousel (e.g. Belden's engagement photos) that
  // should be warmed in the background before the user scrolls to them.
  prefetchImages?: string[];
  paragraph: ReactNode;
  reservePhone?: string;
  reserveInstructions?: string;
  reserveBy?: string;
  reserveDeadline?: boolean;
  roomRate?: string;
  notice?: string;
};

function toTelHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `+1${digits}` : `+${digits}`;
}

const LITCHFIELD_IMAGE_COUNT = 20;
const litchfieldImages = Array.from(
  { length: LITCHFIELD_IMAGE_COUNT },
  (_, i) => ({
    src: withBasePath(`/images/litchfield-carousel/litchfield-${String(i + 1).padStart(2, "0")}.jpg`),
    alt: `The Litchfield Inn — photo ${i + 1} of ${LITCHFIELD_IMAGE_COUNT}`,
  }),
);

const BELDEN_IMAGE_COUNT = 15;
const beldenImages = Array.from({ length: BELDEN_IMAGE_COUNT }, (_, i) => ({
  src: withBasePath(`/images/belden-carousel/belden-${String(i + 1).padStart(2, "0")}.jpg`),
  alt: `Belden House & Mews — photo ${i + 1} of ${BELDEN_IMAGE_COUNT}`,
}));

const BELDEN_ENGAGEMENT_CARD_SRC = withBasePath("/images/belden-engagement-card.jpeg");
const BELDEN_ENGAGEMENT_SELFIE_RYAN_SRC = withBasePath("/images/belden-engagement-selfie-ryan.jpeg");
const BELDEN_ENGAGEMENT_SELFIE_JOYCE_SRC = withBasePath("/images/belden-engagement-selfie-joyce.jpeg");

const ABNER_IMAGE_COUNT = 11;
const abnerImages = Array.from({ length: ABNER_IMAGE_COUNT }, (_, i) => ({
  src: withBasePath(`/images/abner-carousel/abner-${String(i + 1).padStart(2, "0")}.jpg`),
  alt: `The Abner Hotel — photo ${i + 1} of ${ABNER_IMAGE_COUNT}`,
}));

const MAYFLOWER_IMAGE_COUNT = 12;
const mayflowerImages = [
  {
    src: withBasePath("/images/mayflower-carousel/mayflower-00.jpg"),
    alt: "Mayflower Inn & Spa — a suite",
  },
  ...Array.from({ length: MAYFLOWER_IMAGE_COUNT }, (_, i) => ({
    src: withBasePath(`/images/mayflower-carousel/mayflower-${String(i + 1).padStart(2, "0")}.jpg`),
    alt: `Mayflower Inn & Spa — photo ${i + 1} of ${MAYFLOWER_IMAGE_COUNT}`,
  })),
];

const HOTELS: Hotel[] = [
  {
    id: "litchfield",
    name: "The Litchfield Inn",
    url: "https://www.litchfieldinnct.com/",
    lat: 41.7380703,
    lng: -73.2179841,
    images: litchfieldImages,
    paragraph: (
      <>
        <p>
          A room block has been prepared at The Litchfield Inn
          during our wedding weekend. Our welcome party will also be
          held here Friday evening.
        </p>
        <p>
          Transportation will be provided to our wedding venue on Saturday,
          departing promptly at 3:15 pm. It will be available to return our
          guests safely back to their rooms following the close of our
          reception and afterparty.
        </p>
      </>
    ),
    reservePhone: "(860) 567-4503",
    reserveInstructions: "and reference the Wang-Gao wedding block",
    reserveBy: "June 27, 2027",
    reserveDeadline: true,
    roomRate: "$389/night",
  },
  {
    id: "belden",
    name: "Belden House & Mews",
    url: "https://beldenhouse.com/",
    lat: 41.7482584,
    lng: -73.1915581,
    images: beldenImages,
    prefetchImages: [
      BELDEN_ENGAGEMENT_CARD_SRC,
      BELDEN_ENGAGEMENT_SELFIE_RYAN_SRC,
      BELDEN_ENGAGEMENT_SELFIE_JOYCE_SRC,
    ],
    paragraph: (
      <>
      <p>
        We have reserved a second room block at one of our favorite places to stay when we&apos;re in Litchfield. We stayed here the weekend we got engaged and loved it!
</p>
<div className={styles.engagementPhotos}>
  <div className={`${styles.engagementPhoto} ${styles.engagementPhotoWide}`}>
    <Image
      src={BELDEN_ENGAGEMENT_CARD_SRC}
      alt="A congratulations note and flowers from Belden House waiting in their room"
      fill
      style={{ objectFit: "cover" }}
      sizes="(min-width: 640px) 33vw, 33vw"
    />
  </div>
  <div className={styles.engagementPhoto}>
    <Image
      src={BELDEN_ENGAGEMENT_SELFIE_RYAN_SRC}
      alt="Joyce and Ryan smiling together after getting engaged"
      fill
      style={{ objectFit: "cover" }}
      sizes="(min-width: 640px) 33vw, 33vw"
    />
  </div>
  <div className={styles.engagementPhoto}>
    <Image
      src={BELDEN_ENGAGEMENT_SELFIE_JOYCE_SRC}
      alt="Joyce showing off her engagement ring, with Ryan smiling beside her"
      fill
      style={{ objectFit: "cover" }}
      sizes="(min-width: 640px) 33vw, 33vw"
    />
  </div>
</div>
<p>
Transportation will be provided to and from our welcome party at the Litchfield Inn on Friday.
</p>
<p>
Transportation will also be provided to and from the Mayflower Inn and Spa on our wedding day, departing promptly by 3:15 pm. It will be available to return our guests safely to their hotel following the close of the reception and the close of our afterparty.
        </p>
        </>
    ),
    reservePhone: "(860) 337-2099",
    reserveInstructions: "and reference the Wang-Gao wedding block",
    reserveBy: "August 27, 2027",
    reserveDeadline: false,
    roomRate: "$675/night",
  },
  {
    id: "abner",
    name: "The Abner Hotel",
    url: "https://www.theabnerhotel.com/",
    lat: 41.7465467,
    lng: -73.1897408,
    images: abnerImages,
    paragraph: (
      <>
        <p>
          New boutique hotel located across the street from the Belden
          House with a rooftop bar. Walking distance to downtown and the
          shuttle pick-up at the Belden House.
        </p>
        <p>
          A room block has not been secured here, but it is another
          notable stay in the area if you prefer!
        </p>
      </>
    ),
  },
  {
    id: "mayflower",
    name: "Mayflower Inn & Spa",
    url: "https://auberge.com/mayflower/",
    lat: 41.6290062,
    lng: -73.3066599,
    images: mayflowerImages,
    paragraph:
      "Where Saturday's events will be hosted!",
  },
];

export default function SectionStay() {
  return (
    <div className={styles.stay}>
      <p className={styles.intro}>
        Hotel options nearby are very limited, so we&rsquo;ve reserved room blocks at{" "}
        <span className={styles.introAccent}>The Litchfield Inn</span> and{" "}
        <span className={styles.introAccent}>Belden House &amp; Mews</span>.<br/>
        Transportation will run to and from events from these two locations only.
      </p>

      <div className={styles.map}>
        <HotelMap
          pins={HOTELS.map((hotel) => ({
            id: hotel.id,
            name: hotel.name,
            lat: hotel.lat,
            lng: hotel.lng,
            includeInBounds: hotel.id !== "mayflower",
          }))}
        />
      </div>

      {HOTELS.map((hotel, index) => (
        <div key={hotel.id} className={styles.hotel}>
          {hotel.prefetchImages && (
            <HotelPrefetch srcs={hotel.prefetchImages} />
          )}
          <div className={styles.titleRow}>
            <span className={styles.number}>
              {String(index + 1).padStart(2, "0")}
            </span>
            {hotel.url ? (
              <a
                href={hotel.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.name}
              >
                {hotel.name}
                {/* U+FE0E forces text presentation — without it, mobile
                    (iOS) renders the bare arrow as a colored emoji glyph
                    instead of a plain text character. */}
                <span className={styles.externalIcon}>&#8599;&#xFE0E;</span>
              </a>
            ) : (
              <div className={styles.name}>{hotel.name}</div>
            )}
          </div>

          {hotel.images && hotel.images.length > 0 ? (
            <HotelCarousel images={hotel.images} />
          ) : (
            <div className={styles.photoFrame}>{hotel.name}</div>
          )}

          <div className={styles.paragraph}>{hotel.paragraph}</div>

          {hotel.reservePhone && hotel.reserveBy && (
            <div className={styles.reserveGrid}>
              {hotel.roomRate && (
                <div>
                  <div className={styles.reserveLabel}>Room rate</div>
                  <div className={styles.reserveNote}>Starting at</div>
                  <div className={styles.reserveDate}>
                    {hotel.roomRate.replace("/night", "")}
                    <span className={styles.rateSuffix}> /night</span>
                  </div>
                </div>
              )}
              <div>
                <div className={styles.reserveLabel}>How to reserve</div>
                <div className={styles.reserveValue}>
                  Call{" "}
                  <a
                    href={`tel:${toTelHref(hotel.reservePhone)}`}
                    className={styles.phoneLink}
                  >
                    {hotel.reservePhone}
                  </a>{" "}
                  {hotel.reserveInstructions}
                </div>
              </div>
              <div>
                <div className={styles.reserveLabel}>Reserve by</div>
                <div className={styles.reserveDate}>{hotel.reserveBy}</div>
                {hotel.reserveDeadline && (
                  <div className={styles.reserveNote}>
                    Past this date we cannot guarantee the discounted rate or
                    room availability.
                  </div>
                )}
              </div>
            </div>
          )}

          {hotel.notice && (
            <div className={styles.notice}>{hotel.notice}</div>
          )}
        </div>
      ))}
    </div>
  );
}
