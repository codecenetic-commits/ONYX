import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://onyx-watches.com";
const siteName = "ONYX";
const siteDescription = "Experience the precision and craftsmanship of the Onyx mechanical watch through an interactive scroll showcase.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ONYX // The Ultimate Luxury Timepiece",
    template: "%s // ONYX Luxury Watches",
  },
  description: siteDescription,
  keywords: [
    "luxury watch",
    "mechanical watch",
    "handcrafted timepiece",
    "premium watches",
    "ONYX",
    "ceramic case",
    "tourbillon watch",
    "Swiss movement",
  ],
  authors: [{ name: "ONYX" }],
  creator: "ONYX",
  publisher: "ONYX",
  
  // Viewport configuration for mobile optimization
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },

  // Open Graph (Social Media)
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "ONYX // The Ultimate Luxury Timepiece",
    description: siteDescription,
    siteName: siteName,
    locale: "en_US",
    images: [
      {
        url: "/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "ONYX Luxury Watch",
        type: "image/png",
      },
      {
        url: "/og-image-1920x1080.png",
        width: 1920,
        height: 1080,
        alt: "ONYX Watch Hero",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "ONYX // The Ultimate Luxury Timepiece",
    description: siteDescription,
    creator: "@OnyxWatches",
    images: ["/twitter-card-1200x675.png"],
  },

  // PWA & App Configuration
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteName,
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  // Robots & Indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Alternative URLs
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
    },
  },

  // Other metadata
  category: "Shopping",
  referrer: "strict-origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* Theme color for browser UI */}
        <meta name="theme-color" content="#d4af37" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#d4af37" media="(prefers-color-scheme: light)" />
        
        {/* Apple specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={siteName} />
        
        {/* Favicon declarations */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d4af37" />
        
        {/* Security headers via meta tags (for static hosting) */}
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              description: siteDescription,
              sameAs: [
                "https://twitter.com/OnyxWatches",
                "https://instagram.com/OnyxWatches",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-XXX-XXX-XXXX",
                contactType: "Customer Service",
              },
            }),
          }}
        />
        
        {/* Product Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: "ONYX Luxury Watch",
              image: `${siteUrl}/og-image-1200x630.png`,
              description: siteDescription,
              brand: {
                "@type": "Brand",
                name: siteName,
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "156",
              },
            }),
          }}
        />
      </head>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
