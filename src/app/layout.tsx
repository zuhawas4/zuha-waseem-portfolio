import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

/**
 * Typography:
 * - Fraunces → expressive display for name / headings
 * - Manrope → clean readable body text
 */
const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zuha Waseem — Web Developer / Designer",
  description:
    "Personal portfolio of Zuha Waseem — Computer Science student, web developer, and designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="page-atmosphere min-h-full font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
