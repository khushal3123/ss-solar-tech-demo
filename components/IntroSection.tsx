import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SOLAR_IMAGES } from '@/lib/images';
import { Reveal } from './Reveal';

export function IntroSection() {
  return (
    <section id="intro" className="py-20 md:py-28 bg-[#F4F6EF]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left 5 columns: Editorial statement & pillars */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <Reveal>
              <p className="text-xs font-semibold tracking-wider uppercase text-[#246B50] mb-3">
                Our Perspective
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#102D26] text-balance leading-[1.15] mb-5">
                A Brighter Way to Power Your Everyday Life.
              </h2>
              <p className="text-base text-[#4F5E57] leading-relaxed mb-8">
                At SS Solar, we believe clean energy should be accessible, practical, and reliable. We help homeowners and businesses explore solar solutions that make energy consumption smarter.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border-t border-[#E4E9E1] divide-y divide-[#E4E9E1]">
                <div className="py-4 flex items-baseline justify-between gap-4">
                  <span className="font-display text-sm font-semibold text-[#102D26]">
                    01. Honest Sizing
                  </span>
                  <span className="text-sm text-[#4F5E57] text-right">
                    Matched to your actual electricity bills
                  </span>
                </div>
                <div className="py-4 flex items-baseline justify-between gap-4">
                  <span className="font-display text-sm font-semibold text-[#102D26]">
                    02. Architectural Care
                  </span>
                  <span className="text-sm text-[#4F5E57] text-right">
                    Clean rooftop layouts built for Indian roofs
                  </span>
                </div>
                <div className="py-4 flex items-baseline justify-between gap-4">
                  <span className="font-display text-sm font-semibold text-[#102D26]">
                    03. Local Guidance
                  </span>
                  <span className="text-sm text-[#4F5E57] text-right">
                    Dedicated support across Indore &amp; nearby areas
                  </span>
                </div>
              </div>

              <div className="pt-7">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#102D26] hover:text-[#246B50] transition-colors"
                >
                  <span>Learn more about SS Solar</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right 7 columns: Large architectural solar photography */}
          <div className="lg:col-span-7 flex flex-col">
            <Reveal delay={0.05} className="flex-1 flex flex-col">
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[480px] rounded-lg overflow-hidden border border-[#E4E9E1] bg-[#102D26]/5">
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
              <p className="mt-3 text-xs text-[#64736C]">
                Concept architectural view — Sustainable residential courtyard and rooftop photovoltaic integration.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
