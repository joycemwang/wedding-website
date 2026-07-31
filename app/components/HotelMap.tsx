"use client";

import Script from "next/script";
import { useRef } from "react";
import styles from "./HotelMap.module.css";

export type MapPin = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  // Mayflower Inn sits ~9mi from the Litchfield cluster — including it in
  // the auto-fit would zoom out far enough that Belden House and The Abner
  // Hotel (literally across the street from each other) overlap. Its
  // marker still renders, just outside the bounds the map zooms to fit.
  includeInBounds?: boolean;
};

// Fit-to-bounds on a tight cluster (e.g. just Belden + Abner) can zoom in
// arbitrarily far; cap it so the map doesn't end up at street level.
const MAX_FIT_ZOOM = 16;

// Muted, minimal-label theme built from the site's red palette
// (--color-red-bold / --color-red-muted) instead of Maps' default colors.
const MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#f7f4f0" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#af1919" }] },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#f7f4f0" }, { weight: 3 }],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#f9f2f0" }],
  },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#f4e6e3" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#e3c4bf" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#d9a9a2" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#cf8d84" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#7a1010" }],
  },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#f3e5e2" }],
  },
];

// Cormorant Garamond substring from --font-body, read at render time so the
// in-map pin labels match the rest of the site instead of the Maps default.
const PIN_FONT_FAMILY =
  "var(--font-cormorant), ui-serif, Georgia, Cambria, serif";

function createPinElement(name: string) {
  const wrapper = document.createElement("div");
  wrapper.className = styles.pin;

  const dot = document.createElement("span");
  dot.className = styles.pinDot;
  wrapper.appendChild(dot);

  const label = document.createElement("span");
  label.className = styles.pinLabel;
  label.style.fontFamily = PIN_FONT_FAMILY;
  label.textContent = name;
  wrapper.appendChild(label);

  return wrapper;
}

function renderMap(container: HTMLDivElement, pins: MapPin[]) {
  // Declared here, not at module scope: this only runs after the Maps
  // script has loaded onReady, whereas a top-level `class ... extends
  // google.maps.OverlayView` would evaluate — and throw ReferenceError on
  // `google` — as soon as the module itself is imported.
  class PinOverlay extends google.maps.OverlayView {
    private div: HTMLDivElement | null = null;

    constructor(
      private position: google.maps.LatLngLiteral,
      private content: HTMLElement,
    ) {
      super();
    }

    onAdd() {
      this.div = document.createElement("div");
      this.div.style.position = "absolute";
      this.div.style.transform = "translate(-50%, -100%)";
      this.div.appendChild(this.content);
      this.getPanes()!.overlayMouseTarget.appendChild(this.div);
    }

    draw() {
      const projection = this.getProjection();
      const point = projection?.fromLatLngToDivPixel(
        new google.maps.LatLng(this.position),
      );
      if (!this.div || !point) return;
      this.div.style.left = `${point.x}px`;
      this.div.style.top = `${point.y}px`;
    }

    onRemove() {
      this.div?.remove();
      this.div = null;
    }
  }

  const fitPins = pins.filter((pin) => pin.includeInBounds !== false);
  const bounds = new google.maps.LatLngBounds();
  fitPins.forEach((pin) => bounds.extend({ lat: pin.lat, lng: pin.lng }));

  const map = new google.maps.Map(container, {
    center: bounds.getCenter(),
    zoom: 12,
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: "cooperative",
    styles: MAP_STYLE,
  });

  pins.forEach((pin) => {
    const overlay = new PinOverlay(
      { lat: pin.lat, lng: pin.lng },
      createPinElement(pin.name),
    );
    overlay.setMap(map);
  });

  if (fitPins.length > 1) {
    google.maps.event.addListenerOnce(map, "bounds_changed", () => {
      if ((map.getZoom() ?? 0) > MAX_FIT_ZOOM) map.setZoom(MAX_FIT_ZOOM);
    });
    map.fitBounds(bounds, 56);
  }
}

export default function HotelMap({ pins }: { pins: MapPin[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const handleReady = () => {
    if (containerRef.current) renderMap(containerRef.current, pins);
  };

  if (!apiKey) return null;

  return (
    <div className={styles.map} ref={containerRef}>
      <Script
        id="google-maps-js"
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`}
        strategy="afterInteractive"
        onReady={handleReady}
      />
    </div>
  );
}
