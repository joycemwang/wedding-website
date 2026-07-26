import HotelCarousel from "./HotelCarousel";
import type { ReactNode } from "react";
import { withBasePath } from "../lib/basePath";
import styles from "./SectionStay.module.css";

type Hotel = {
  id: string;
  name: string;
  url?: string;
  images?: { src: string; alt: string }[];
  paragraph: ReactNode;
  reservePhone?: string;
  reserveInstructions?: string;
  reserveBy?: string;
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

const BELDEN_IMAGE_COUNT = 20;
const beldenImages = Array.from({ length: BELDEN_IMAGE_COUNT }, (_, i) => ({
  src: withBasePath(`/images/belden-carousel/belden-${String(i + 1).padStart(2, "0")}.jpg`),
  alt: `Belden House & Mews — photo ${i + 1} of ${BELDEN_IMAGE_COUNT}`,
}));

const ABNER_IMAGE_COUNT = 11;
const abnerImages = Array.from({ length: ABNER_IMAGE_COUNT }, (_, i) => ({
  src: withBasePath(`/images/abner-carousel/abner-${String(i + 1).padStart(2, "0")}.jpg`),
  alt: `The Abner Hotel — photo ${i + 1} of ${ABNER_IMAGE_COUNT}`,
}));

const MAYFLOWER_IMAGE_COUNT = 20;
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
    images: litchfieldImages,
    paragraph: (
      <>
        <p>
          A discounted room block has been prepared at The Litchfield Inn
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
  },
  {
    id: "belden",
    name: "Belden House & Mews",
    url: "https://beldenhouse.com/",
    images: beldenImages,
    paragraph: (
      <>
      <p>
        We have reserved a second discounted room block at one of our favorite locations to stay when we're in Litchfield. We stayed here the weekend we got engaged and loved it! This quaint stay (with food to rave about!) is within walking distance to downtown Litchfield.
</p>
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
  },
  {
    id: "abner",
    name: "The Abner Hotel",
    url: "https://www.theabnerhotel.com/",
    images: abnerImages,
    paragraph: (
      <>
        <p>
          New boutique hotel located across the street from the Belden
          House with a rooftop bar. Walking distance to downtown and the
          shuttle pick-up at the Belden House.
        </p>
        <p>
          A discounted room block has not been secured here, but is another
          notable stay in the area if you prefer!
        </p>
      </>
    ),
  },
  {
    id: "mayflower",
    name: "Mayflower Inn & Spa",
    url: "https://auberge.com/mayflower/",
    images: mayflowerImages,
    paragraph:
      "Where Saturday's events will be hosted!",
  },
];

export default function SectionStay() {
  return (
    <div className={styles.stay}>
      <p className={styles.intro}>
        Hotel options nearby are limited, so we&rsquo;ve reserved room blocks at{" "}
        <span className={styles.introAccent}>The Litchfield Inn</span> and{" "}
        <span className={styles.introAccent}>Belden House &amp; Mews</span>.<br/>
        Transportation will run to and from events from these two locations only.
      </p>

      {HOTELS.map((hotel, index) => (
        <div key={hotel.id} className={styles.hotel}>
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
                <span className={styles.externalIcon}>&#8599;</span>
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
                <div className={styles.reserveNote}>
                  Past this date we cannot guarantee the discounted rate or
                  room availability.
                </div>
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
