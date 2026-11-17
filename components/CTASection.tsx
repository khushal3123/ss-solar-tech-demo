import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { SOLAR_IMAGES } from '@/lib/images';
import { buildWhatsAppUrl, formatGeneralWhatsAppMessage } from '@/lib/whatsapp';
import { Reveal } from './Reveal';

export function CTASection() {
  const whatsappUrl = buildWhatsAppUrl(formatGeneralWhatsAppMessage());

  return (
    <section className="relative py-24 md:py-32 bg-[#102D26] text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={SOLAR_IMAGES.sunsetCta.src}
          alt={SOLAR_IMAGES.sunsetCta.alt}
          width={SOLAR_IMAGES.sunsetCta.width}
          height={SOLAR_IMAGES.sunsetCta.height}
          loading="eager"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#102D26]/95 via-[#102D26]/82 to-[#102D26]/65"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#F4B942] mb-3">
              Indore · Madhya Pradesh
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white text-balance leading-[1.1] mb-5">
              Ready to Make the Switch to Solar?
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8">
              Let&apos;s explore a smarter energy solution for your home or business.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-[#102D26] bg-[#F4B942] hover:bg-[#eab035] rounded-md transition-colors whitespace-nowrap"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-medium text-white border border-white/35 hover:bg-white/10 rounded-md transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
