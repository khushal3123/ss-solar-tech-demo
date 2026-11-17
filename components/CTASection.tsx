import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-[#0A2540] text-white border-t border-white/10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0052CC]/25 border border-white/15 rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="inline-block text-xs font-mono uppercase tracking-wider text-[#FFB800] font-semibold">
              Free Indore Rooftop Consultation
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
              Get a Custom Solar Layout, Subsidy & EMI Plan
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Our local engineering team evaluates your roof structure, shade profile, and monthly MPPKVVCL bill before recommending the ideal solar capacity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/#calculator"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors"
            >
              <Calculator className="w-4 h-4 text-[#FFB800]" />
              <span>Savings & EMI Calculator</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-[#0A2540] bg-[#FFB800] hover:bg-[#E6A600] transition-colors shadow-md"
            >
              <span>Schedule Site Visit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
