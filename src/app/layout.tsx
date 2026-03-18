import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ontmoetingsplekken West | 's-Hertogenbosch",
  description:
    "Ontdek alle ontmoetingsplekken in wijk West van 's-Hertogenbosch: Kruiskamp, Schutskamp, Deuteren en Engelen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
