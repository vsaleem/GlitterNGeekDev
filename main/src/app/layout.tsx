import type { Metadata, Viewport } from "next";
import {
  DynaPuff,
  Fraunces,
  Geist,
  Geist_Mono,
  Quicksand,
} from "next/font/google";
import "./globals.css";
import { DARK_MODE_MEDIA } from "@/util/constants";
import FloatingLogo from "@/components/FloatingLogo";
import DevOverlayHider from "@/components/DevOverlayHider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dynapuff = DynaPuff({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["400","500","600","700"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
});

export const metadata: Metadata = {
  title: "GlitterNGeek",
  description:
    "Beginner-friendly AI and web learning that helps tech feel clear, useful, and human.",
  icons: {
    icon: [
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-16x16-dark.png", sizes: "16x16", type: "image/png", media: DARK_MODE_MEDIA },
      { url: "/icons/icon-32x32-dark.png", sizes: "32x32", type: "image/png", media: DARK_MODE_MEDIA },
      { url: "/icons/icon-48x48-dark.png", sizes: "48x48", type: "image/png", media: DARK_MODE_MEDIA },
    ],
    apple: [
      { url: "/icons/icon-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/icons/icon-180x180-dark.png", sizes: "180x180", type: "image/png", media: DARK_MODE_MEDIA },
    ],
    shortcut: ["/icons/icon-32x32.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${dynapuff.variable} ${fraunces.variable} ${quicksand.variable} ${quicksand.className}`}>
      <body className="antialiased font-body">
        {children}
          <Analytics />
          <SpeedInsights />
          
          {process.env.NODE_ENV === "development" && (
          <>
            <DevOverlayHider />
            <FloatingLogo />
          </>
        )}
      </body>
    </html>
  );
}
