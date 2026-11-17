import React from 'react';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { IntroSection } from '@/components/IntroSection';
import { ServiceSection } from '@/components/ServiceSection';
import { WhyChooseSection } from '@/components/WhyChooseSection';
import { SolarCalculator } from '@/components/SolarCalculator';
import { HowItWorks } from '@/components/HowItWorks';
import { ProjectGallery } from '@/components/ProjectGallery';
import { PricingSection } from '@/components/PricingSection';
import { FAQ } from '@/components/FAQ';
import { CTASection } from '@/components/CTASection';
import { FAQ_ITEMS } from '@/lib/config';

export const metadata: Metadata = {
  title: 'SS Solar — Solar Panel Installation in Indore, Madhya Pradesh',
  description:
    'Trusted rooftop solar solutions in Indore for homes, offices, and industries. Calculate your potential electricity savings and request a personalized solar quote from SS Solar.',
  alternates: {
    canonical: '/',
  },
};

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
      <IntroSection />
      <ServiceSection />
      <WhyChooseSection />
      <SolarCalculator />
      <HowItWorks />
      <ProjectGallery />
      <PricingSection />
      <FAQ />
      <CTASection />
    </>
  );
}
