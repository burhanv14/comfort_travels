import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { APP_NAME, APP_URL } from "@/lib/constants";
import { createTravelAgencyJsonLd } from "@/lib/seo";
import { AppProviders } from "@/providers/app-providers";
import { SiteLayout } from "@/components/layout/site-layout";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} - Premium Travel Agency`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Premium travel agency for curated tour packages, destinations, visa services, flight booking, train booking, and hotels.",
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: `${APP_NAME} - Premium Travel Agency`,
    description:
      "Premium travel agency for curated tour packages, destinations, visa services, flight booking, train booking, and hotels.",
    url: APP_URL,
    siteName: APP_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} - Premium Travel Agency`,
    description:
      "Premium travel agency for curated tour packages, destinations, visa services, flight booking, train booking, and hotels.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const travelAgencyJsonLd = createTravelAgencyJsonLd();

  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencyJsonLd) }}
        />
        <AppProviders>
          <SiteLayout>{children}</SiteLayout>
        </AppProviders>
      </body>
    </html>
  );
}
