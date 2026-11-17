import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { BRAND_CONFIG } from '@/lib/config';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0A2540',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BRAND_CONFIG.siteUrl),
  title: {
    default: 'SS Solar | Smart Rooftop Solar Installation in Indore, MP',
    template: '%s | SS Solar Indore',
  },
  description:
    'Switch to rooftop solar in Indore, Madhya Pradesh with SS Solar. Check your solar savings, EMI estimates, and PM Surya Ghar subsidy eligibility with a free consultation.',
  keywords: [
    'Solar Panel Installation Indore',
    'Rooftop Solar Indore',
    'SS Solar Indore',
    'Solar EMI & Savings Calculator Indore',
    'Residential Solar Indore',
    'Commercial Solar Madhya Pradesh',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SS Solar | Smart Rooftop Solar Installation in Indore, MP',
    description:
      'Switch to rooftop solar in Indore, Madhya Pradesh with SS Solar. Check your solar savings, EMI estimates, and subsidy eligibility.',
    url: BRAND_CONFIG.siteUrl,
    siteName: 'SS Solar',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SS Solar | Smart Rooftop Solar Installation in Indore, MP',
    description:
      'Switch to rooftop solar in Indore, Madhya Pradesh with SS Solar. Check your solar savings, EMI estimates, and subsidy eligibility.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BRAND_CONFIG.name,
    description:
      'Rooftop solar consultation, system design, installation, and maintenance services for homes and businesses in Indore, Madhya Pradesh.',
    url: BRAND_CONFIG.siteUrl,
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
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
    },
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#0052CC] selection:text-white bg-white text-[#0A2540]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
