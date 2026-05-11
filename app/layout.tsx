import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { FramerMotionProvider } from "@/components/providers/framer-motion-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.artfcl.com'),
  title: {
    default: "ARTEFCL | AI with Soul, Strategy and Impact",
    template: "%s | ARTEFCL"
  },
  description: "ARTEFCL brings artificial intelligence with soul, strategy, and impact. A cross-industry AI studio transforming businesses.",
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "ARTEFCL | AI with Soul, Strategy and Impact",
    description: "ARTEFCL brings artificial intelligence with soul, strategy, and impact.",
    url: 'https://www.artfcl.com',
    siteName: 'ARTEFCL',
    images: [
      {
        url: '/seo/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ARTEFCL Studio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARTEFCL | AI Studio',
    description: 'Artificial intelligence with soul, strategy, and impact.',
    images: ['/seo/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, "font-sans", "relative")}
    >
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && window.trustedTypes && window.trustedTypes.createPolicy) {
                try {
                  window.trustedTypes.createPolicy('default', {
                    createHTML: function(string) { return string; },
                    createScript: function(string) { return string; },
                    createScriptURL: function(string) { return string; }
                  });
                } catch (e) {}
              }
            `
          }}
        />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ARTEFCL",
              "url": "https://www.artfcl.com",
              "logo": "https://www.artfcl.com/branding/logo.svg",
              "description": "ARTEFCL brings artificial intelligence with soul, strategy, and impact. A cross-industry AI studio transforming businesses.",
              "sameAs": [
                "https://www.linkedin.com/company/artefcl",
                "https://twitter.com/artefcl"
              ]
            })
          }}
        />
        <Script
          id="speculation-rules"
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: `{"prerender": [{"where": {"href_matches": "/*"}, "eagerness": "moderate"}]}`
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <FramerMotionProvider>
          {children}
        </FramerMotionProvider>
      </body>
    </html>
  );
}
