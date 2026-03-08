import SmoothScrollProvider from "@/components/SmoothScrollProvider"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const neueMontreal = localFont({
  src: "../public/NeueMontreal-Medium.otf",
  variable: "--font-neue-montreal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Interitual",
  description: "Interior architecture landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${neueMontreal.variable} antialiased`}
      >
            <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
