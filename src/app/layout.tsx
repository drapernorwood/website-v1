import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./surface.css";
const sans = localFont({
  src: [
    { path: "./fonts/manrope-regular.ttf", weight: "400" },
    { path: "./fonts/manrope-medium.ttf", weight: "500" },
    { path: "./fonts/manrope-semibold.ttf", weight: "600" },
  ],
  variable: "--font-sans",
  display: "swap",
});
const serif = localFont({
  src: [
    { path: "./fonts/instrument-serif.ttf", weight: "400", style: "normal" },
    {
      path: "./fonts/instrument-serif-italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://www.drapernorwood.com"),
  title: {
    default: "Draper Norwood — Beneath the surface. Beyond the obvious.",
    template: "%s — Draper Norwood",
  },
  description:
    "Look beneath the surface of your business. Draper Norwood connects strategy, web, AI, and execution to build a clearer presence and a more capable company.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Draper Norwood — Beneath the surface. Beyond the obvious.",
    description:
      "A clearer presence. A more capable business. Strategy, web, AI, and execution.",
    type: "website",
    locale: "en_US",
    siteName: "Draper Norwood",
  },
  twitter: {
    card: "summary",
    title: "Draper Norwood — Beneath the surface. Beyond the obvious.",
    description:
      "Strategy, creative work, digital experiences, and practical systems.",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${serif.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
