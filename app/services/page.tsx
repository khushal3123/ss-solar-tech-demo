import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check, MessageCircle, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { SERVICES_DATA } from '@/lib/config';
import { SOLAR_IMAGES } from '@/lib/images';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Solar Services in Indore — Residential, Commercial & Industrial',
  description:
    'Explore rooftop solar installation services by SS Solar in Indore: residential homes, commercial buildings, industrial rooftops, consultation, and site assessment.',
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        dark
        kicker="Our Services · Indore, Madhya Pradesh"
        title="Rooftop Solar Solutions Built for Every Property Scale."
        description="From independent residential terraces to commercial offices and industrial sheds, SS Solar plans and installs systems tailored to your load profile and roof structure."
        breadcrumbLabel="Services"
      />

      <section className="relative py-16 md:py-24 bg-[#0F2626] text-white overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 right-10 w-[480px] h-[480px] rounded-full bg-[#246B50]/25 blur-[130px]"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 space-y-16 md:space-y-24">
          {SERVICES_DATA.map((service, index) => {
            const isReversed = index % 2 === 1;
            const waHref = buildWhatsAppUrl(
              `Hello SS Solar Team, I would like to enquire about ${service.title} in Indore.`
            );

            return (
              <article
                key={service.id}
                id={service.id}
                className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch bg-white/5 backdrop-blur-lg border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] rounded-2xl overflow-hidden"
              >
                <div
                  className={`lg:col-span-6 relative h-[280px] sm:h-[360px] lg:h-auto lg:min-h-[440px] bg-[#102D26]/40 ${
                    isReversed ? 'lg:order-2' : ''
                  }`}
                >
                  <Image
                    src={SOLAR_IMAGES[service.imageKey].src}
                    alt={SOLAR_IMAGES[service.imageKey].alt}
                    width={SOLAR_IMAGES[service.imageKey].width}
                    height={SOLAR_IMAGES[service.imageKey].height}
                    loading="eager"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className={`lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-between ${
                    isReversed ? 'lg:order-1' : ''
                  }`}
                >
                  <Reveal>
                    <p className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] text-xs font-semibold tracking-wider uppercase text-[#F4B942] mb-4">
                      Service {service.number}
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                      {service.title}
                    </h2>
                    <p className="text-base text-white/80 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="mb-6 pb-5 border-b border-white/15">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
                        Ideal Customer Profile
                      </p>
                      <p className="text-sm font-medium text-white">
                        {service.idealFor}
                      </p>
                    </div>

                    <div className="mb-8">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">
                        Key Highlights
                      </p>
                      <ul className="space-y-2.5">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2.5 text-sm text-white/90">
                            <Check className="w-4 h-4 text-[#F4B942] shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-white/15">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#102D26] bg-[#F4B942] hover:bg-[#eab035] rounded-lg shadow-[0_4px_16px_rgba(244,185,66,0.28)] transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Enquire on WhatsApp</span>
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <span>Schedule Assessment</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CTASection />
    </>
  );
}
