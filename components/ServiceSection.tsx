import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '@/lib/config';
import { SOLAR_IMAGES } from '@/lib/images';
import { Reveal } from './Reveal';

export function ServiceSection() {
  const coreServices = SERVICES_DATA.slice(0, 3);
  const residential = coreServices[0];
  const secondary = coreServices.slice(1);

  return (
    <section className="relative py-20 md:py-28 bg-[#0D2320] text-white border-y border-white/12 overflow-hidden">
      {/* Ambient radial light behind glass cards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 w-[480px] h-[480px] rounded-full bg-[#246B50]/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-10 w-[380px] h-[380px] rounded-full bg-[#F4B942]/10 blur-[110px]"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#F4B942] mb-3">
                Core Capabilities
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
                Solar Solutions Designed Around You.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#F4B942] hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
            >
              <span>View all services</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        {/* Featured Asymmetric Row: Residential Solar */}
        <Reveal>
          <article className="group grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] mb-8">
            <div className="lg:col-span-7 relative h-[280px] sm:h-[360px] lg:h-[420px] overflow-hidden bg-[#102D26]/40">
              <Image
                src={SOLAR_IMAGES[residential.imageKey].src}
                alt={SOLAR_IMAGES[residential.imageKey].alt}
                width={SOLAR_IMAGES[residential.imageKey].width}
                height={SOLAR_IMAGES[residential.imageKey].height}
                loading="eager"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#F4B942] mb-4">
                  <span>{residential.number}. Home Rooftop Systems</span>
                  <span className="text-white/60 font-normal">Indore &amp; MP</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                  {residential.title}
                </h3>
                <p className="text-base text-white/80 leading-relaxed mb-6">
                  {residential.description}
                </p>
              </div>
              <div className="pt-5 border-t border-white/15 flex items-center justify-between">
                <span className="text-xs text-white/65">{residential.summary}</span>
                <Link
                  href={`/services#${residential.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F4B942] hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 ml-4"
                >
                  <span>Explore More</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Secondary 2-Column Editorial Split: Commercial & Industrial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {secondary.map((service, idx) => (
            <Reveal key={service.id} delay={idx * 0.05}>
              <article className="group h-full flex flex-col rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                <div className="relative h-[260px] sm:h-[320px] overflow-hidden bg-[#102D26]/40">
                  <Image
                    src={SOLAR_IMAGES[service.imageKey].src}
                    alt={SOLAR_IMAGES[service.imageKey].alt}
                    width={SOLAR_IMAGES[service.imageKey].width}
                    height={SOLAR_IMAGES[service.imageKey].height}
                    loading="eager"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#F4B942] mb-2">
                      {service.number}. {service.shortTitle}
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-4">
                    <span className="text-xs text-white/65 line-clamp-1">{service.summary}</span>
                    <Link
                      href={`/services#${service.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F4B942] hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Explore More</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
