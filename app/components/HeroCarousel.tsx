"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { withBasePath } from "../lib/basePath";
import styles from "./HeroCarousel.module.css";

const SLIDES = [
  { src: withBasePath("/images/hero-v2.jpg"), alt: "Joyce and Ryan sitting on brownstone steps" },
  { src: withBasePath("/images/hero-v3.jpg"), alt: "Joyce and Ryan hugging on a tree-lined street" },
  { src: withBasePath("/images/hero-v4.jpg"), alt: "Joyce and Ryan holding hands crossing the street" },
  { src: withBasePath("/images/hero-v5.jpg"), alt: "Joyce and Ryan embracing under trees on a Brooklyn sidewalk" },
  { src: withBasePath("/images/hero-v6.jpg"), alt: "Joyce and Ryan holding hands and laughing in front of rose bushes" },
];

const SLIDE_DURATION_MS = 5000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.carousel}>
      {SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          quality={100}
          sizes="(min-width: 768px) 32vw, 62vw"
          className={styles.slide}
          style={{ objectFit: "cover", opacity: i === index ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
