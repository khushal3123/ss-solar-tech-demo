import React from 'react';
import Hero from '@/components/Hero';
import SolarCalculator from '@/components/SolarCalculator';
import WhyChooseSection from '@/components/WhyChooseSection';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import { FAQ_ITEMS } from '@/lib/config';

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <SolarCalculator />
      <WhyChooseSection />
      <HowItWorks />
      <FAQ />
    </>
  );
}
