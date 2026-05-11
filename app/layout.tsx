import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { FramerMotionProvider } from "@/components/providers/framer-motion-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.artfcl.com'),
  title: {
    default: "ARTEFCL | AI with Soul, Strategy and Impact",
    template: "%s | ARTEFCL"
  },
  description: "ARTEFCL brings artificial intelligence with soul, strategy, and impact. A cross-industry AI studio transforming businesses.",
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
      <body className="min-h-full flex flex-col">
        <FramerMotionProvider>
          {children}
        </FramerMotionProvider>
      </body>
    </html>
  );
}
