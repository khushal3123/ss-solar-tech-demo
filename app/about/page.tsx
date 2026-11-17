import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import WhyChooseSection from '@/components/WhyChooseSection';
import HowItWorks from '@/components/HowItWorks';
import CTASection from '@/components/CTASection';
import { ShieldCheck, Compass, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About SS Solar | Rooftop Solar Engineering in Indore, MP',
  description:
    'Learn about SS Solar in Indore, Madhya Pradesh. We design and install reliable residential and commercial rooftop solar systems with complete net-metering support.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        badge="Indore Solar Engineering Partner"
        title="Engineered Rooftop Solar for Homes & Businesses in Indore"
        subtitle="SS Solar combines site-specific structural design, Tier-1 solar hardware, and end-to-end MPPKVVCL net-metering coordination across Madhya Pradesh."
        breadcrumb="About Us"
      />

      <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#F4F7FB] rounded-2xl p-7 border border-[#E2E8F0]">
              <Compass className="w-8 h-8 text-[#0052CC] mb-4" />
              <h2 className="font-display font-bold text-xl text-[#0A2540] mb-2">
                Site-First Solar Design
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                Every rooftop in Indore has unique parapet heights, water-tank shadows, and structural loads. We inspect and map your roof before recommending system capacity.
              </p>
            </div>

            <div className="bg-[#F4F7FB] rounded-2xl p-7 border border-[#E2E8F0]">
              <ShieldCheck className="w-8 h-8 text-[#0052CC] mb-4" />
              <h2 className="font-display font-bold text-xl text-[#0A2540] mb-2">
                Uncompromised Safety Standards
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                We deploy hot-dip galvanized mounting structures, UV-protected DC cabling, surge protection devices (ACDB/DCDB), and multi-rod earthing on every installation.
              </p>
            </div>

            <div className="bg-[#F4F7FB] rounded-2xl p-7 border border-[#E2E8F0]">
              <Wrench className="w-8 h-8 text-[#0052CC] mb-4" />
              <h2 className="font-display font-bold text-xl text-[#0A2540] mb-2">
                Transparent Local Support
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                From PM Surya Ghar subsidy guidance to post-commissioning generation checks, our local Indore team stays accessible throughout your solar journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseSection />
      <HowItWorks />
      <CTASection />
    </>
  );
}
