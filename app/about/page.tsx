import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { WhyChooseSection } from '@/components/WhyChooseSection';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { SOLAR_IMAGES } from '@/lib/images';

export const metadata: Metadata = {
  title: 'About Us — Solar Energy Company in Indore',
  description:
    'Learn about SS Solar in Indore, Madhya Pradesh—our mission, vision, and practical approach to residential, commercial, and industrial rooftop solar installation.',
  alternates: {
    canonical: '/about',
  },
};

const APPROACH_PILLARS = [
  {
    number: '01',
    title: 'Consumption-First Planning',
    description:
      'Rather than recommending oversized systems, we begin by studying your monthly electricity bills, tariff slabs, and seasonal usage patterns.',
  },
  {
    number: '02',
    title: 'Site-Specific Roof Engineering',
    description:
      'Every terrace in Indore has its own shading profile, parapet walls, and structural layout. We plan mounting geometry to respect usability and safety.',
  },
  {
    number: '03',
    title: 'Clear, Jargon-Free Guidance',
    description:
      'From explaining kW capacity and daily unit generation to walking you through net-metering steps, we keep every conversation straightforward.',
  },
  {
    number: '04',
    title: 'Long-Term Focus',
    description:
      'Solar panels serve your property for years. We prioritize clean installation practices, neat wiring, and accessible post-installation guidance.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        dark
        kicker="About SS Solar · Indore"
        title="Thoughtful Rooftop Solar Built Around Clarity and Trust."
        description="SS Solar is a growing solar energy solutions brand based in Indore, Madhya Pradesh. Our goal is to help households and businesses explore cleaner energy alternatives through thoughtfully designed solar installation solutions."
        breadcrumbLabel="About"
      />

      {/* Our Story */}
      <section className="py-20 md:py-24 bg-[#F4F6EF]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <Reveal>
                <p className="text-xs font-semibold tracking-wider uppercase text-[#246B50] mb-3">
                  Our Story
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#102D26] text-balance mb-5">
                  Making Clean Rooftop Energy Practical for Indore.
                </h2>
                <div className="space-y-4 text-base text-[#4F5E57] leading-relaxed">
                  <p>
                    SS Solar was founded with a straightforward observation: while sunlight in Madhya Pradesh is abundant, navigating solar panel sizing, pricing, and installation often feels confusing for property owners.
                  </p>
                  <p>
                    Based in Indore, we focus on bridging that gap with clear consultations, honest capacity planning, and clean architectural execution—helping independent homes, offices, and industrial facilities move toward cleaner everyday electricity.
                  </p>
                </div>
                <div className="pt-7">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#102D26] hover:text-[#246B50] transition-colors"
                  >
                    <span>Speak with our Indore team</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 flex">
              <Reveal delay={0.05} className="w-full flex">
                <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[440px] rounded-lg overflow-hidden border border-[#E4E9E1] bg-white">
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
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-24 bg-white border-y border-[#E4E9E1]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <Reveal>
              <div className="h-full p-8 sm:p-10 bg-[#F4F6EF] border border-[#E4E9E1] rounded-lg">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#246B50] mb-3">
                  Our Mission
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#102D26] mb-4">
                  Practical Solar Solutions with Transparent Guidance.
                </h2>
                <p className="text-base text-[#4F5E57] leading-relaxed">
                  To help homeowners and businesses in Indore adopt rooftop solar with confidence—through accurate load assessments, clean installation standards, and transparent communication from the very first conversation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="h-full p-8 sm:p-10 bg-[#102D26] text-white rounded-lg">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#F4B942] mb-3">
                  Our Vision
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                  Cleaner Neighbourhoods Powered by Everyday Sunlight.
                </h2>
                <p className="text-base text-white/80 leading-relaxed">
                  To build lasting trust as a reliable renewable energy partner in Madhya Pradesh, contributing to roofs that generate clean daytime electricity and reduce long-term reliance on conventional grid power.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 md:py-24 bg-[#F4F6EF]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-5 flex">
              <Reveal className="w-full flex">
                <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[460px] rounded-lg overflow-hidden border border-[#E4E9E1] bg-white">
                  <Image
                    src={SOLAR_IMAGES.closeup.src}
                    alt={SOLAR_IMAGES.closeup.alt}
                    width={SOLAR_IMAGES.closeup.width}
                    height={SOLAR_IMAGES.closeup.height}
                    loading="eager"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-xs font-semibold tracking-wider uppercase text-[#246B50] mb-3">
                  Our Approach
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#102D26] text-balance mb-8">
                  How We Plan Every Solar Installation.
                </h2>
              </Reveal>

              <div className="border-t border-[#E4E9E1] divide-y divide-[#E4E9E1]">
                {APPROACH_PILLARS.map((item) => (
                  <Reveal key={item.number}>
                    <div className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6">
                      <div className="sm:col-span-4 flex items-baseline gap-2.5">
                        <span className="font-display text-xs font-bold text-[#246B50]">
                          {item.number}
                        </span>
                        <h3 className="font-display text-base font-bold text-[#102D26]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="sm:col-span-8 text-sm sm:text-base text-[#4F5E57] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseSection />
      <CTASection />
    </>
  );
}
