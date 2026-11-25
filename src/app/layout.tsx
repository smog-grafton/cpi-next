import type { Metadata, Viewport } from "next";
import "@css/swiper-bundle.min.css";
import "@css/animate.css";
import "@css/bootstrap.min.css";
import "@css/font-awesome.css";
import "@css/magnific-popup.css";
import "@css/meanmenu.css";
import "@css/nice-select.css";
import "@css/main.css";
import "./globals.css";
import Preloader from "@/layout/Preloader";
import { MediaProvider } from "@/components/media/MediaProvider";
import { GlobalMediaPlayer } from "@/components/media/GlobalMediaPlayer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Christian Power Ministries International",
    template: "%s | CPMI",
  },
  description:
    "Christian Power Ministries International—growing in faith, leading with purpose and serving communities.",
  applicationName: "CPMI Digital Ministry",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Christian Power Ministries International",
    title: "Christian Power Ministries International",
    description: "Discover your purpose. Grow in faith. Transform your world.",
    url: siteUrl,
    images: [{ url: "/assets/img/brand/cpmi/cpmi-hero-worship.png", alt: "CPMI digital ministry" }],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/assets/img/brand/cpmi/cpmi-mark.svg", type: "image/svg+xml", sizes: "any" }, { url: "/assets/img/brand/cpmi/cpmi-favicon.png", type: "image/png" }],
    apple: [{ url: "/assets/img/brand/cpmi/cpmi-favicon.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#11110f",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const primaryStream = process.env.RADIO_PRIMARY_STREAM_URL?.trim();
  const fallbackStream = process.env.RADIO_FALLBACK_STREAM_URL?.trim();
  const stationName = process.env.RADIO_STATION_NAME?.trim() || "CPMI Radio";
  const streamName = process.env.RADIO_STREAM_NAME?.trim() || "Kingdom Radio Stream";
  const artwork = process.env.RADIO_ARTWORK_URL?.trim() || "/assets/img/brand/cpmi/cpmi-radio-artwork.png";
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Preloader />
        <MediaProvider primaryStream={primaryStream} fallbackStream={fallbackStream} stationName={stationName} streamName={streamName} artwork={artwork}>
          {children}
          <GlobalMediaPlayer />
        </MediaProvider>
      </body>
    </html>
  );
}
