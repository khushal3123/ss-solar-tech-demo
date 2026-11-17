import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SOLAR_IMAGES } from '@/lib/images';
import { Reveal } from './Reveal';

export function IntroSection() {
  return (
    <section id="intro" className="scroll-mt-24 relative py-20 md:py-28 bg-[#0F2626] text-white overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/3 w-[440px] h-[440px] rounded-full bg-[#246B50]/20 blur-[120px]"
      />
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left 5 columns: Editorial statement & Liquid Glass pillars */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <Reveal>
              <p className="text-xs font-semibold tracking-wider uppercase text-[#F4B942] mb-3">
                Our Perspective
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance leading-[1.15] mb-5">
                A Brighter Way to Power Your Everyday Life.
              </h2>
              <p className="text-base text-white/75 leading-relaxed mb-8">
                At SS Solar, we believe clean energy should be accessible, practical, and reliable. We help homeowners and businesses explore solar solutions that make energy consumption smarter.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] px-5 py-2 divide-y divide-white/15">
                <div className="py-4 flex items-baseline justify-between gap-4">
                  <span className="font-display text-sm font-semibold text-[#F4B942]">
                    01. Honest Sizing
                  </span>
                  <span className="text-sm text-white/80 text-right">
                    Matched to your actual electricity bills
                  </span>
                </div>
                <div className="py-4 flex items-baseline justify-between gap-4">
                  <span className="font-display text-sm font-semibold text-[#F4B942]">
                    02. Architectural Care
                  </span>
                  <span className="text-sm text-white/80 text-right">
                    Clean rooftop layouts built for Indian roofs
                  </span>
                </div>
                <div className="py-4 flex items-baseline justify-between gap-4">
                  <span className="font-display text-sm font-semibold text-[#F4B942]">
                    03. Local Guidance
                  </span>
                  <span className="text-sm text-white/80 text-right">
                    Dedicated support across Indore &amp; nearby areas
                  </span>
                </div>
              </div>

              <div className="pt-7">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#F4B942] hover:text-amber-300 transition-colors"
                >
                  <span>Learn more about SS Solar</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right 7 columns: Large architectural solar photography in glass frame */}
          <div className="lg:col-span-7 flex flex-col">
            <Reveal delay={0.05} className="flex-1 flex flex-col">
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] p-2">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={SOLAR_IMAGES.sustainable.src}
                    alt={SOLAR_IMAGES.sustainable.alt}
                    width={SOLAR_IMAGES.sustainable.width}
                    height={SOLAR_IMAGES.sustainable.height}
                    loading="eager"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="mt-3 text-xs text-white/65">
                Concept architectural view — Sustainable residential courtyard and rooftop photovoltaic integration.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
