import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { PricingSection } from '@/components/PricingSection';
import { FAQ } from '@/components/FAQ';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { FAQ_ITEMS } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Solar Packages & Pricing Guidance — Indore',
  description:
    'Explore indicative residential and commercial rooftop solar packages in Indore. Request a custom solar installation quotation tailored to your electricity usage.',
  alternates: {
    canonical: '/pricing',
  },
};

const COMPARISON_ROWS = [
  {
    feature: 'Typical Property Fit',
    essential: '2–3 BHK Independent Homes',
    plus: 'Large Homes, Duplexes & Villas',
    commercial: 'Offices, Shops, Clinics & Factories',
  },
  {
    feature: 'Indicative Example Capacity',
    essential: '3 kW (Demo Example)',
    plus: '5 kW (Demo Example)',
    commercial: '10 kW+ (Custom Sized)',
  },
  {
    feature: 'Approx. Shadow-Free Roof Area',
    essential: '~250 – 300 sq. ft.',
    plus: '~420 – 500 sq. ft.',
    commercial: '~900+ sq. ft.',
  },
  {
    feature: 'System Type',
    essential: 'On-Grid Rooftop Solar',
    plus: 'On-Grid / Elevated Options',
    commercial: 'Three-Phase Commercial / Industrial',
  },
  {
    feature: 'Site Assessment & Shading Check',
    essential: 'Included prior to proposal',
    plus: 'Included prior to proposal',
    commercial: 'Detailed structural & load audit',
  },
  {
    feature: 'Quotation Model',
    essential: 'Request a Quote (Custom)',
    plus: 'Request a Quote (Custom)',
    commercial: 'Request a Quote (Custom)',
  },
];

const PRICING_FAQS = [
  FAQ_ITEMS[1],
  FAQ_ITEMS[3],
  FAQ_ITEMS[6],
  FAQ_ITEMS[7],
];

export default function PricingPage() {
  const customQuoteWaUrl = buildWhatsAppUrl(
    'Hello SS Solar Team, I would like a custom solar installation quotation for my property in Indore.'
  );

  return (
    <>
      <PageHeader
        dark
        kicker="Indicative Solutions · Demo Overview"
        title="Solar Solutions That Fit Your Energy Needs."
        description="Every rooftop and electricity profile is unique. Review our indicative residential and commercial configurations below, then request a site-specific quotation."
        breadcrumbLabel="Pricing"
      />

      <PricingSection showAllLink={false} />

      {/* Package Comparison Table */}
      <section className="py-20 md:py-24 bg-[#0F2626] text-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#F4B942] mb-3">
                Side-by-Side Comparison
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance mb-3">
                Indicative Configuration Comparison
              </h2>
              <p className="text-sm sm:text-base text-white/75">
                All figures shown are illustrative demo specifications to help you understand typical sizing tiers. Actual pricing is issued only after site assessment.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-x-auto bg-white/5 backdrop-blur-lg border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] rounded-2xl">
              <table className="w-full text-left border-collapse min-w-[680px]">
                <thead>
                  <tr className="border-b border-white/15 bg-white/5">
                    <th className="py-4 px-5 text-xs font-semibold uppercase tracking-wider text-[#F4B942]">
                      Specification
                    </th>
                    <th className="py-4 px-5 font-display text-sm font-bold text-white">
                      Residential Essential
                    </th>
                    <th className="py-4 px-5 font-display text-sm font-bold text-[#F4B942] bg-white/[0.04]">
                      Residential Plus
                    </th>
                    <th className="py-4 px-5 font-display text-sm font-bold text-white">
                      Commercial Custom
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.feature} className="hover:bg-white/[0.04] transition-colors">
                      <td className="py-4 px-5 font-medium text-white">{row.feature}</td>
                      <td className="py-4 px-5 text-white/75 tabular-nums">{row.essential}</td>
                      <td className="py-4 px-5 text-white font-medium bg-white/[0.03] tabular-nums">
                        {row.plus}
                      </td>
                      <td className="py-4 px-5 text-white/75 tabular-nums">{row.commercial}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Custom Installation Quotation Block */}
          <Reveal delay={0.12}>
            <div className="mt-12 bg-white/5 backdrop-blur-lg border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] text-white rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#F4B942] mb-2">
                  Custom Installation Quotation
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                  Need a Larger Commercial or Industrial System?
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  Share your monthly electricity bill, sanctioned load, and roof area for a tailored solar proposal sized to your exact business or industrial operations in Indore.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <a
                  href={customQuoteWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#102D26] bg-[#F4B942] hover:bg-[#eab035] rounded-lg shadow-[0_4px_16px_rgba(244,185,66,0.28)] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Request Custom Quote</span>
                </a>
                <Link
                  href="/#calculator"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Try Savings Calculator</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQ
        items={PRICING_FAQS}
        title="Questions About Solar Pricing & Quotes."
        subtitle="Understand what shapes your final solar quotation, roof space requirements, and applicable government scheme procedures."
      />
      <CTASection />
    </>
  );
}
