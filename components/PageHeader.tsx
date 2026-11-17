import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  kicker: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  dark?: boolean;
}

export function PageHeader({
  kicker,
  title,
  description,
  breadcrumbLabel,
}: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-36 md:pb-20 bg-[#102D26] text-white border-b border-white/12 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 w-[480px] h-[480px] rounded-full bg-[#246B50]/30 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-16 w-[320px] h-[320px] rounded-full bg-[#F4B942]/12 blur-[100px]"
      />
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
        <nav
          aria-label="Breadcrumb"
          className="inline-flex items-center gap-1.5 text-xs mb-6 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-lg border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] text-white/75"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="text-[#F4B942] font-medium">
            {breadcrumbLabel}
          </span>
        </nav>

        <p className="text-xs font-semibold tracking-wider uppercase mb-3 text-[#F4B942]">
          {kicker}
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] max-w-3xl text-balance mb-5 text-white">
          {title}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed max-w-2xl text-white/80">
          {description}
        </p>
      </div>
    </section>
  );
}
