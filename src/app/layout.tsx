import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
