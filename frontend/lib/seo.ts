import type { Metadata } from "next";
import { APP_NAME, APP_URL } from "@/lib/constants";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description = "Your trusted travel partner for holiday packages, flights, trains, hotels, and visa services. Plan your dream vacation with Comfort Travels.",
  image = "/og-image.jpg",
  path = "",
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${APP_NAME}` : `${APP_NAME} — Premium Travel Agency`;
  const url = `${APP_URL}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(APP_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: APP_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function createTravelAgencyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: APP_NAME,
    url: APP_URL,
    description: "Premium travel agency offering holiday packages, flights, trains, hotels, and visa services.",
    telephone: "+91-9876543210",
    email: "info@comforttravels.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Travel Street",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400001",
      addressCountry: "IN",
    },
    sameAs: [
      "https://facebook.com/comforttravels",
      "https://instagram.com/comforttravels",
      "https://twitter.com/comforttravels",
    ],
  };
}
