import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  breadcrumb: string;
}

export default function PageHeader({
  badge,
  title,
  subtitle,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <section className="bg-[#0A2540] text-white py-14 sm:py-20 border-b border-white/10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-4">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#FFB800]">{breadcrumb}</span>
        </div>

        <p className="text-xs font-mono uppercase tracking-widest font-semibold text-[#FFB800] mb-3">
          {badge}
        </p>

        <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight max-w-3xl">
          {title}
        </h1>
        <p className="text-slate-300 text-base sm:text-lg mt-4 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
