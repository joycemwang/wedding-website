import type { Metadata } from "next";
import { Cormorant_Garamond, Pinyon_Script } from "next/font/google";
import localFont from "next/font/local";
import AccessGate from "./components/AccessGate";
import CustomCursor from "./components/CustomCursor";
import SiteChrome from "./components/SiteChrome";
import "./globals.css";

// Design system: Pendulum for headings (section titles), Cormorant
// Garamond for body text and the hero/nav wordmark. See app/globals.css
// for the full token set — this may change later, but it's the pairing
// for now.
const pendulum = localFont({
  src: "./fonts/Pendulum.otf",
  variable: "--font-pendulum",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: ["400"],
});

// Without this, Next has no way to turn the auto-generated
// opengraph-image.jpg URL into an absolute one at export time and falls
// back to a localhost URL — unreachable by link-preview scrapers, so they
// grab some other image on the page instead (the footer landscape). Origin
// only, no /wedding-website suffix: Next already applies basePath itself
// when building the image's path, so adding it here too would double it
// up. Picks the right origin for whichever of the two deploy targets is
// being built — see next.config.ts for the full explanation.
const METADATA_BASE =
  process.env.NEXT_PUBLIC_BUILD_TARGET === "cloudflare"
    ? "https://joyceandryan2027.com"
    : "https://joycemwang.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(METADATA_BASE),
  title: "Joyce & Ryan",
  description: "Joyce & Ryan's wedding website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pendulum.variable} ${cormorantGaramond.variable} ${pinyon.variable}`}
    >
      <body>
        <CustomCursor />
        <AccessGate>
          <SiteChrome>{children}</SiteChrome>
        </AccessGate>
      </body>
    </html>
  );
}
