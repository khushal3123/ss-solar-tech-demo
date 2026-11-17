import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Manrope } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/lib/config';
import { MotionProvider } from '@/components/MotionProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#102D26',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: 'SS Solar — Rooftop Solar Panel Installation in Indore',
    template: '%s | SS Solar Indore',
  },
  description:
    'Switch to smarter rooftop solar with SS Solar in Indore, Madhya Pradesh. Explore residential, commercial, and industrial solar solutions and estimate your savings.',
  keywords: [
    'Solar Panel Installation in Indore',
    'Solar Company in Indore',
    'Rooftop Solar Installation Indore',
    'Residential Solar Panels Indore',
    'Commercial Solar Installation Indore',
    'Solar Energy Solutions Indore',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: SITE_CONFIG.brandName,
    title: 'SS Solar — Rooftop Solar Panel Installation in Indore',
    description:
      'Switch to smarter rooftop solar with SS Solar in Indore, Madhya Pradesh. Calculate potential savings and request a personalized solar quote.',
    images: [
      {
        url: '/images/og-solar-indore.jpg',
        width: 1280,
        height: 720,
        alt: 'Modern independent home in Indore with rooftop solar panels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SS Solar — Rooftop Solar Panel Installation in Indore',
    description:
      'Explore residential, commercial, and industrial rooftop solar installation solutions in Indore, Madhya Pradesh.',
    images: ['/images/og-solar-indore.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_CONFIG.brandName,
    description:
      'Solar panel installation and renewable energy solutions for residential, commercial, and industrial properties in Indore, Madhya Pradesh.',
    url: SITE_CONFIG.siteUrl,
    areaServed: {
      '@type': 'City',
      name: 'Indore',
      containedInPlace: {
        '@type': 'State',
        name: 'Madhya Pradesh',
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indore',
      addressRegion: 'MP',
      addressCountry: 'IN',
    },
    serviceType: [
      'Residential Rooftop Solar Installation',
      'Commercial Solar Installation',
      'Industrial Solar Solutions',
      'Solar Consultation',
    ],
  };

  return (
    <html lang="en" className={`${jakarta.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#0F2626] text-white selection:bg-[#F4B942]/30 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <MotionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
