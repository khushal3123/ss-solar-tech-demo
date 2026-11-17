'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Calculator, ChevronDown } from 'lucide-react';
import { SOLAR_IMAGES } from '@/lib/images';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] lg:min-h-[860px] flex items-end bg-[#102D26] text-white overflow-hidden">
      {/* Full-bleed architectural rooftop solar photography */}
      <div className="absolute inset-0">
        <Image
          src={SOLAR_IMAGES.hero.src}
          alt={SOLAR_IMAGES.hero.alt}
          width={SOLAR_IMAGES.hero.width}
          height={SOLAR_IMAGES.hero.height}
          priority
          loading="eager"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Deep Forest Green measured gradient scrim for crisp WCAG contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#102D26] via-[#102D26]/70 to-[#102D26]/35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#102D26]/90 via-[#102D26]/50 to-transparent"
      />

      {/* Subtle animated geometric sun arc in upper right */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none hidden lg:block absolute right-10 top-24 w-[280px] h-[280px]"
      >
        <svg viewBox="0 0 320 320" fill="none" className="w-full h-full">
          <motion.circle
            cx="160"
            cy="160"
            r="118"
            stroke="#F4B942"
            strokeOpacity="0.28"
            strokeWidth="1"
            strokeDasharray="6 8"
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '160px 160px' }}
          />
          <circle cx="160" cy="160" r="76" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="1" />
          <circle cx="160" cy="160" r="14" fill="#F4B942" fillOpacity="0.85" />
          <path d="M160 22V56M160 264V298M22 160H56M264 160H298" stroke="#F4B942" strokeOpacity="0.4" strokeWidth="1.2" />
        </svg>
      </motion.div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 pt-28 pb-12 md:pb-16">
        <div className="max-w-3xl">
          {/* Clean unboxed location indicator (zero pill clutter) */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-medium tracking-wide text-[#F4B942] mb-5">
            <span className="whitespace-nowrap">Indore · Madhya Pradesh</span>
            <span aria-hidden="true" className="hidden sm:inline-block h-[1px] w-10 bg-[#F4B942]/60" />
            <span className="text-white/85 font-normal whitespace-nowrap">Rooftop Solar Energy Solutions</span>
          </div>

          {/* Editorial Display Headline */}
          <h1 className="font-display text-[clamp(2.25rem,4.6vw,4.15rem)] font-bold leading-[1.08] tracking-tight text-white text-balance mb-5">
            Power Your Home. Not Your Electricity Bills.
          </h1>

          {/* Supporting prose */}
          <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mb-8">
            Switch to smarter solar energy with SS Solar. Discover reliable rooftop solar solutions designed to help homes and businesses save on electricity costs.
          </p>

          {/* Primary & Secondary CTAs — immediately visible on first paint */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#calculator"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-[#102D26] bg-[#F4B942] hover:bg-[#eab035] rounded-lg shadow-[0_4px_20px_rgba(244,185,66,0.28)] transition-all duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4B942]"
            >
              <Calculator className="w-4 h-4" aria-hidden="true" />
              <span>Calculate Your Savings</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-medium text-white bg-white/5 backdrop-blur-lg border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] hover:bg-white/10 rounded-lg transition-all duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Quiet trust footer row with animated Liquid Glass Scroll Down indicator */}
          <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-white/75">
            <p>
              Residential, commercial &amp; industrial rooftop solar systems tailored to your property&apos;s electricity load.
            </p>
            <a
              href="#intro"
              aria-label="Scroll down to explore solar solutions"
              data-testid="hero-scroll-indicator"
              className="group inline-flex items-center gap-3 self-start sm:self-auto pl-4 pr-2.5 py-1.5 rounded-full bg-white/5 backdrop-blur-lg border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] text-white/90 hover:text-[#F4B942] hover:border-[#F4B942]/40 transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4B942]"
            >
              <span className="text-xs font-medium tracking-wide">Scroll to explore</span>
              <span className="relative inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F4B942]/15 border border-[#F4B942]/35 text-[#F4B942]">
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-[#F4B942]/50"
                  animate={{ scale: [1, 1.35, 1], opacity: [0.65, 0, 0.65] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.span
                  aria-hidden="true"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex items-center justify-center"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
