import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: "Draper Norwood — Strategy, Web, and AI Execution",
  description:
    "Draper Norwood helps companies sharpen positioning, strengthen digital presence, and build practical assets that support measurable business improvement.",
  metadataBase: new URL("https://drapernorwood.com"),
  openGraph: {
    title: "Draper Norwood",
    description:
      "Strategy, web, and AI execution for sharper positioning and stronger digital presence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
