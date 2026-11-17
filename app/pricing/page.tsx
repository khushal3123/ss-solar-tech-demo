import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import PricingSection from '@/components/PricingSection';
import SolarCalculator from '@/components/SolarCalculator';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Solar Panel System Price, Subsidy & EMI in Indore | SS Solar',
  description:
    'Compare indicative 2 kW, 3 kW, 5 kW, and 10 kW rooftop solar system packages, PM Surya Ghar subsidy, and monthly EMI options in Indore, Madhya Pradesh.',
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        badge="Packages, Subsidy & EMI"
        title="Transparent Solar Pricing & Monthly EMI Estimates"
        subtitle="Compare indicative rooftop solar configurations or use our interactive calculator to check PM Surya Ghar subsidy and 6/36/60-month EMI plans."
        breadcrumb="Pricing & EMI"
      />
      <PricingSection />
      <SolarCalculator />
      <FAQ />
    </>
  );
}
