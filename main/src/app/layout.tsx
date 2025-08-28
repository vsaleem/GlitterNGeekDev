import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingLogo from "@/components/FloatingLogo";
import DevOverlayHider from "@/components/DevOverlayHider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GlitterNGeek",
  description: "GlitterNGeek - Where Tech Meets Soft Life - Developer Profile",
  icons: {
    icon: [
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-48x48.png", sizes: "48x48", type: "image/png" },
  { url: "/icons/icon-16x16-dark.png", sizes: "16x16", type: "image/png", media: "(prefers-color-scheme: dark)" },
  { url: "/icons/icon-32x32-dark.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: dark)" },
  { url: "/icons/icon-48x48-dark.png", sizes: "48x48", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/icons/icon-180x180.png", sizes: "180x180", type: "image/png" },
  { url: "/icons/icon-180x180-dark.png", sizes: "180x180", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: ["/icons/icon-32x32.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
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
