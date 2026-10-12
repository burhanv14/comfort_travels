import type { Metadata } from "next";
import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { APP_NAME, APP_URL } from "@/lib/constants";
import { createTravelAgencyJsonLd } from "@/lib/seo";
import { AppProviders } from "@/providers/app-providers";
import { SiteLayout } from "@/components/layout/site-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME}`,
    template: `%s`,
  },
  description:
    "Travel agency for curated tour packages, visa services, flight booking, train booking, and hotels & much more.",
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: `${APP_NAME}`,
    description:
      "Travel agency for curated tour packages, visa services, flight booking, train booking, and hotels & much more.",
    url: APP_URL,
    siteName: APP_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME}`,
    description:
      "Travel agency for curated tour packages, visa services, flight booking, train booking, and hotels & much more.",
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
      suppressHydrationWarning
      className={cn("h-full antialiased font-sans", inter.variable, playfair.variable, geistMono.variable)}
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
