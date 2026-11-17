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

      <section className="py-16 md:py-24 bg-[#F4F6EF]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-16 md:space-y-24">
          {SERVICES_DATA.map((service, index) => {
            const isReversed = index % 2 === 1;
            const waHref = buildWhatsAppUrl(
              `Hello SS Solar Team, I would like to enquire about ${service.title} in Indore.`
            );

            return (
              <article
                key={service.id}
                id={service.id}
                className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch bg-white border border-[#E4E9E1] rounded-lg overflow-hidden"
              >
                <div
                  className={`lg:col-span-6 relative h-[280px] sm:h-[360px] lg:h-auto lg:min-h-[440px] bg-[#102D26]/5 ${
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
                    <p className="text-xs font-semibold tracking-wider uppercase text-[#246B50] mb-3">
                      Service {service.number}
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#102D26] mb-4">
                      {service.title}
                    </h2>
                    <p className="text-base text-[#4F5E57] leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="mb-6 pb-5 border-b border-[#E4E9E1]">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#64736C] mb-1.5">
                        Ideal Customer Profile
                      </p>
                      <p className="text-sm font-medium text-[#102D26]">
                        {service.idealFor}
                      </p>
                    </div>

                    <div className="mb-8">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#64736C] mb-3">
                        Key Highlights
                      </p>
                      <ul className="space-y-2.5">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2.5 text-sm text-[#17251F]">
                            <Check className="w-4 h-4 text-[#246B50] shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-[#E4E9E1]">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#102D26] bg-[#F4B942] hover:bg-[#eab035] rounded-md transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Enquire on WhatsApp</span>
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-[#102D26] border border-[#E4E9E1] hover:bg-[#F4F6EF] rounded-md transition-colors whitespace-nowrap"
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
