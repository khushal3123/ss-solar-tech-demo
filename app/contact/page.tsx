import React from 'react';
import type { Metadata } from 'next';
import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ContactForm } from '@/components/ContactForm';
import { Reveal } from '@/components/Reveal';
import { SITE_CONFIG } from '@/lib/config';
import { buildWhatsAppUrl, formatGeneralWhatsAppMessage } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Contact SS Solar — Request a Free Solar Consultation in Indore',
  description:
    'Get in touch with SS Solar in Indore, Madhya Pradesh for residential, commercial, or industrial rooftop solar consultations and site assessments.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  const directWaUrl = buildWhatsAppUrl(formatGeneralWhatsAppMessage());

  return (
    <>
      <PageHeader
        dark
        kicker="Contact Us · Indore, Madhya Pradesh"
        title="Let's Start Your Solar Journey."
        description="Have questions about rooftop solar sizing, site feasibility, or estimated savings? Share your electricity details below or reach us directly via WhatsApp."
        breadcrumbLabel="Contact"
      />

      <section className="py-16 md:py-24 bg-[#F4F6EF]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 columns: Validated WhatsApp Enquiry Form */}
            <div className="lg:col-span-7">
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>

            {/* Right 5 columns: Indore Contact Information & Placeholder Map */}
            <div className="lg:col-span-5 space-y-6">
              <Reveal delay={0.08}>
                <div className="bg-white border border-[#E4E9E1] rounded-lg p-6 sm:p-8 space-y-6">
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-[#246B50] mb-2">
                      Office &amp; Service Region
                    </p>
                    <h2 className="font-display text-xl font-bold text-[#102D26]">
                      SS Solar — Indore
                    </h2>
                  </div>

                  <ul className="space-y-4 text-sm text-[#4F5E57] border-t border-[#E4E9E1] pt-5">
                    <li className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#246B50] shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-[#102D26]">Location</p>
                        <p>{SITE_CONFIG.contactPlaceholders.address}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-[#246B50] shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-[#102D26]">Phone</p>
                        <p>{SITE_CONFIG.contactPlaceholders.phone}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-[#246B50] shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-[#102D26]">Email</p>
                        <p>{SITE_CONFIG.contactPlaceholders.email}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MessageCircle className="w-4 h-4 text-[#246B50] shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-[#102D26]">WhatsApp</p>
                        <p>{SITE_CONFIG.contactPlaceholders.whatsapp}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#246B50] shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-[#102D26]">Service Area</p>
                        <p>Indore &amp; surrounding districts in Madhya Pradesh</p>
                      </div>
                    </li>
                  </ul>

                  <div className="pt-4 border-t border-[#E4E9E1]">
                    <a
                      href={directWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#102D26] hover:bg-[#246B50] rounded-md transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
                      <span>Start Direct WhatsApp Chat</span>
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Placeholder Map Section for Indore */}
              <Reveal delay={0.14}>
                <div className="bg-white border border-[#E4E9E1] rounded-lg overflow-hidden">
                  <div className="relative h-60 bg-[#102D26] text-white p-6 flex flex-col justify-between overflow-hidden">
                    {/* Subtle architectural map grid lines */}
                    <svg
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full opacity-15"
                      viewBox="0 0 400 240"
                      fill="none"
                    >
                      <path d="M0 60H400M0 120H400M0 180H400" stroke="#F4F6EF" strokeWidth="1" />
                      <path d="M80 0V240M160 0V240M240 0V240M320 0V240" stroke="#F4F6EF" strokeWidth="1" />
                      <path d="M40 210L180 110L340 60" stroke="#F4B942" strokeWidth="2" strokeDasharray="5 5" />
                      <circle cx="180" cy="110" r="8" fill="#F4B942" />
                    </svg>

                    <div className="relative z-10 flex items-center justify-between text-xs text-white/75">
                      <span>Indore, Madhya Pradesh</span>
                      <span>22.7196° N, 75.8577° E</span>
                    </div>

                    <div className="relative z-10">
                      <p className="font-display text-lg font-bold text-white mb-1">
                        Indore Service Location (Placeholder)
                      </p>
                      <p className="text-xs text-white/75 leading-relaxed">
                        Exact office pin and street address will be embedded here once the verified SS Solar office address is finalized.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
