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
  dark = false,
}: PageHeaderProps) {
  return (
    <section
      className={
        dark
          ? 'pt-32 pb-16 md:pt-36 md:pb-20 bg-[#102D26] text-white border-b border-white/10'
          : 'pt-32 pb-14 md:pt-36 md:pb-18 bg-[#F4F6EF] text-[#102D26] border-b border-[#E4E9E1]'
      }
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <nav
          aria-label="Breadcrumb"
          className={`flex items-center gap-1.5 text-xs mb-6 ${
            dark ? 'text-white/65' : 'text-[#64736C]'
          }`}
        >
          <Link href="/" className={dark ? 'hover:text-white' : 'hover:text-[#102D26]'}>
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className={dark ? 'text-[#F4B942]' : 'text-[#102D26] font-medium'}>
            {breadcrumbLabel}
          </span>
        </nav>

        <p
          className={`text-xs font-semibold tracking-wider uppercase mb-3 ${
            dark ? 'text-[#F4B942]' : 'text-[#246B50]'
          }`}
        >
          {kicker}
        </p>
        <h1
          className={`font-display text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] max-w-3xl text-balance mb-5 ${
            dark ? 'text-white' : 'text-[#102D26]'
          }`}
        >
          {title}
        </h1>
        <p
          className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
            dark ? 'text-white/80' : 'text-[#4F5E57]'
          }`}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
