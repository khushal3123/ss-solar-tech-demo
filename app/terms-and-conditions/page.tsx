import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { SITE_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Demo Terms & Conditions, solar savings disclaimer, and privacy notice placeholder for SS Solar, Indore, Madhya Pradesh.',
  alternates: {
    canonical: '/terms-and-conditions',
  },
};

const SECTIONS = [
  {
    id: 'general-terms',
    title: '01. General Terms',
    content:
      'These Terms and Conditions govern your access to and use of the SS Solar demonstration website. Because this platform is currently presented as a client demo showcase for Indore, Madhya Pradesh, all legal terms below serve as placeholder copy and must be reviewed and customized by qualified legal counsel and SS Solar management prior to commercial publication.',
  },
  {
    id: 'website-usage',
    title: '02. Website Usage',
    content:
      'You may browse this website to learn about rooftop solar services, run illustrative savings calculations, and prepare WhatsApp enquiries. You agree not to misuse interactive forms, attempt automated scraping, or misrepresent enquiry details submitted through the site.',
  },
  {
    id: 'solar-savings-disclaimer',
    title: '03. Solar Savings Disclaimer',
    content:
      'All figures produced by the Solar Savings Calculator—including recommended kW capacity, estimated monthly unit generation, monthly and annual financial savings, and indicative payback periods—are mathematical estimates for demonstration purposes only. Actual solar performance depends on rooftop orientation, structural tilt, shading, local weather, module and inverter specifications, utility tariff slabs, and prevailing DISCOM net-metering regulations.',
  },
  {
    id: 'pricing-quotations',
    title: '04. Pricing and Quotations',
    content:
      'Packages displayed on this website represent indicative demo configurations and do not constitute a binding commercial offer. Final system pricing, component selection, structural requirements, and project schedules are provided exclusively in a written quotation following a physical site assessment.',
  },
  {
    id: 'installation-scope',
    title: '05. Installation Scope',
    content:
      'Actual installation scope—including mounting structure type, DC/AC cabling, earthing, lightning protection, and utility coordination—will be defined in the mutually signed project proposal or work order. Any civil modification or electrical panel upgrades outside the agreed scope will be communicated prior to execution.',
  },
  {
    id: 'payment-terms',
    title: '06. Payment Terms',
    content:
      'Milestone-based payment schedules, applicable taxes, and accepted payment methods will be specified directly in the formal customer quotation and agreement issued by SS Solar.',
  },
  {
    id: 'warranty-information',
    title: '07. Warranty Information',
    content:
      'This demo website does not make independent warranty guarantees. Any product warranties on solar photovoltaic modules or inverters are governed solely by the respective original equipment manufacturers’ official warranty terms, alongside any written workmanship terms documented in the final customer contract.',
  },
  {
    id: 'limitation-liability',
    title: '08. Limitation of Liability',
    content:
      'To the maximum extent permitted by applicable Indian law, SS Solar shall not be liable for any indirect, incidental, or consequential damages arising from reliance on indicative calculator estimates, temporary website unavailability, or external third-party service interruptions.',
  },
  {
    id: 'third-party-services',
    title: '09. Third-Party Services',
    content:
      'Enquiry buttons and form submissions redirect users to WhatsApp (a third-party messaging service) with pre-filled text. Use of WhatsApp is subject to WhatsApp’s own terms of service and privacy policies. Messages are only sent when you explicitly press Send inside WhatsApp.',
  },
  {
    id: 'privacy',
    title: '10. Privacy Notice (Placeholder) & Contact Information',
    content: `This demonstration website does not store submitted enquiry forms on a backend database; form inputs are formatted locally in your browser to create a WhatsApp message link. For questions regarding these placeholder terms, please contact SS Solar at ${SITE_CONFIG.locationLabel} (Phone: ${SITE_CONFIG.contactPlaceholders.phone}, Email: ${SITE_CONFIG.contactPlaceholders.email}).`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        dark
        kicker="Legal & Demo Notice"
        title="Terms & Conditions"
        description="Important Notice: This is a placeholder legal document created for demonstration purposes and must be reviewed by SS Solar and legal counsel before live publication."
        breadcrumbLabel="Terms & Conditions"
      />

      <section className="py-16 md:py-24 bg-[#F4F6EF]">
        <div className="max-w-[920px] mx-auto px-5 sm:px-8">
          <div className="bg-white border border-[#E4E9E1] rounded-lg p-6 sm:p-10 md:p-12">
            <div className="mb-8 p-4 bg-[#F4F6EF] border border-[#E4E9E1] rounded-md text-xs sm:text-sm text-[#4F5E57]">
              <strong className="text-[#102D26]">Demo Document Notice:</strong> Effective Date Placeholder — 2026. Do not rely on these placeholder clauses as finalized legal advice without formal business review.
            </div>

            <div className="divide-y divide-[#E4E9E1]">
              {SECTIONS.map((sec) => (
                <section key={sec.id} id={sec.id} className="py-6 first:pt-0 last:pb-0 scroll-mt-24">
                  <h2 className="font-display text-lg sm:text-xl font-bold text-[#102D26] mb-2.5">
                    {sec.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#4F5E57] leading-relaxed">
                    {sec.content}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-[#E4E9E1] flex flex-wrap items-center justify-between gap-4 text-sm">
              <Link href="/contact" className="font-semibold text-[#102D26] hover:text-[#246B50]">
                Go to Contact Page
              </Link>
              <Link href="/" className="text-[#4F5E57] hover:text-[#102D26]">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
