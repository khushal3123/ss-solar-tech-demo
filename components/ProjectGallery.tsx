import React from 'react';
import Image from 'next/image';
import { SOLAR_IMAGES } from '@/lib/images';
import { Reveal } from './Reveal';

const GALLERY_ITEMS = [
  {
    title: 'Residential Solar Concept',
    caption: 'Independent home rooftop installation layout under morning sun',
    image: SOLAR_IMAGES.residential,
    spanClass: 'md:col-span-7',
  },
  {
    title: 'Solar Module Architecture',
    caption: 'Monocrystalline photovoltaic cells angled for high solar capture',
    image: SOLAR_IMAGES.closeup,
    spanClass: 'md:col-span-5',
  },
  {
    title: 'Commercial Solar Concept',
    caption: 'Multi-storey commercial building rooftop array for daytime loads',
    image: SOLAR_IMAGES.commercial,
    spanClass: 'md:col-span-5',
  },
  {
    title: 'Industrial Solar Concept',
    caption: 'Large-span industrial warehouse rooftop solar infrastructure',
    image: SOLAR_IMAGES.industrial,
    spanClass: 'md:col-span-7',
  },
];

export function ProjectGallery() {
  return (
    <section className="py-20 md:py-28 bg-[#0F2626] text-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-[#F4B942] mb-3">
                Visual Concepts
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
                Solar Solutions in Action.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/75 max-w-md">
              Illustrative architectural solar concepts demonstrating residential, commercial, and industrial deployment formats.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.04} className={item.spanClass}>
              <figure className="group h-full flex flex-col p-3 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                <div className="relative w-full h-[260px] sm:h-[340px] md:h-[380px] rounded-xl overflow-hidden bg-[#102D26]/40">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    loading="eager"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-3 px-2 pb-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <span className="font-display text-sm font-semibold text-white">
                    {item.title}
                  </span>
                  <span className="text-xs text-white/65">{item.caption}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
