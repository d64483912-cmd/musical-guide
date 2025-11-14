import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

/**
 * Root metadata for Nelson-GPT application
 * Includes SEO, Open Graph, and Twitter card metadata
 */
export const metadata: Metadata = {
  title: {
    default: 'Nelson-GPT — Pediatric Knowledge at Your Fingertips',
    template: '%s | Nelson-GPT',
  },
  description:
    'Nelson-GPT: Trusted Pediatric AI. Access evidence-based pediatric knowledge powered by Nelson Textbook of Pediatrics. Get instant answers to clinical questions in Academic or Clinical mode.',
  keywords: [
    'pediatrics',
    'medical AI',
    'Nelson Textbook',
    'pediatric knowledge',
    'clinical decision support',
    'medical education',
  ],
  authors: [{ name: 'Nelson-GPT Team' }],
  creator: 'Nelson-GPT',
  publisher: 'Nelson-GPT',

  // Open Graph metadata for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nelson-gpt.vercel.app',
    siteName: 'Nelson-GPT',
    title: 'Nelson-GPT — Pediatric Knowledge at Your Fingertips',
    description:
      'Trusted Pediatric AI powered by Nelson Textbook of Pediatrics',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nelson-GPT - Pediatric Knowledge Assistant',
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Nelson-GPT — Pediatric Knowledge at Your Fingertips',
    description:
      'Trusted Pediatric AI powered by Nelson Textbook of Pediatrics',
    images: ['/og-image.png'],
  },

  // Additional metadata
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

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  manifest: '/manifest.json',
}

/**
 * Root layout component
 * Wraps entire application with necessary providers and styling
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external services */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Nelson-GPT',
              description:
                'Pediatric Knowledge Assistant powered by Nelson Textbook of Pediatrics',
              url: 'https://nelson-gpt.vercel.app',
              applicationCategory: 'MedicalApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Main application content */}
        {children}
      </body>
    </html>
  )
}
