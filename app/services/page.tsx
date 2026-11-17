import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import HowItWorks from '@/components/HowItWorks';
import CTASection from '@/components/CTASection';
import { SOLAR_SERVICES } from '@/lib/config';
import { Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Solar Installation Services in Indore | Residential & Commercial',
  description:
    'Explore rooftop solar services by SS Solar in Indore: Residential On-Grid Solar, Commercial Solar Plants, Net-Metering & Subsidy Documentation, and O&M.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        badge="End-to-End Solar EPC Services"
        title="Rooftop Solar Solutions for Indore Homes & Industries"
        subtitle="From 2 kW residential terrace systems to commercial captive power plants, we deliver turnkey engineering, installation, and net-metering."
        breadcrumb="Services"
      />

      <section className="py-16 sm:py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLAR_SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-[#F4F7FB] rounded-2xl p-7 border border-[#E2E8F0] flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-mono uppercase tracking-wider font-semibold text-[#0052CC] bg-white px-2.5 py-1 rounded-md border border-[#E2E8F0] mb-4">
                    {service.tag}
                  </span>
                  <h2 className="font-display font-bold text-xl text-[#0A2540] mb-2">
                    {service.title}
                  </h2>
                  <p className="text-sm text-[#475569] leading-relaxed mb-5">
                    {service.shortDesc}
                  </p>

                  <ul className="space-y-2 text-xs text-[#0A2540] mb-6">
                    {service.highlights.map((pt) => (
                      <li key={pt} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#0052CC] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0052CC] hover:text-[#003E99]"
                >
                  <span>Enquire About {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <CTASection />
    </>
  );
}
