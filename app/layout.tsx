import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import AccessGate from "./components/AccessGate";
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
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
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
      className={`${pendulum.variable} ${cormorantGaramond.variable}`}
    >
      <body>
        <AccessGate>
          <SiteChrome />
          {children}
        </AccessGate>
      </body>
    </html>
  );
}
