"use client";

import Image from "next/image";
import { useState } from "react";
import DesignLink from "./DesignLink";
import styles from "./HotelCarousel.module.css";

type CarouselImage = {
  src: string;
  alt: string;
};

export default function HotelCarousel({ images }: { images: CarouselImage[] }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const go = (delta: number) => {
    setIndex((current) => (current + delta + images.length) % images.length);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.imageBox}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((image, i) => (
            <div key={image.src} className={styles.slide}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={i === 0}
                style={{ objectFit: "cover" }}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <div className={styles.counter}>
            {index + 1} / {images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className={styles.controls}>
          <DesignLink direction="left" onClick={() => go(-1)}>
            Previous
          </DesignLink>
          <DesignLink direction="right" onClick={() => go(1)}>
            Next
          </DesignLink>
        </div>
      )}
    </div>
  );
}
