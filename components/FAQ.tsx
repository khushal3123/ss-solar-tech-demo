'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/config';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white scroll-mt-16">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-widest font-semibold text-[#0052CC] mb-2">
            Common Questions Answered
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
            Frequently Asked Questions About Rooftop Solar
          </h2>
          <p className="text-[#475569] text-base mt-2">
            Everything you need to know about solar sizing, MPPKVVCL net-metering, subsidy, and maintenance in Indore.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className={`rounded-2xl border transition-colors ${
                  isOpen
                    ? 'bg-[#F4F7FB] border-[#0052CC]/40'
                    : 'bg-white border-[#E2E8F0] hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base sm:text-lg text-[#0A2540]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0052CC] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-[#475569] leading-relaxed border-t border-[#E2E8F0]/80">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Clean Bottom Consultation Strip */}
        <div className="mt-12 rounded-2xl bg-[#0A2540] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-xl text-white">
              Ready to lock in lower electricity bills in Indore?
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Get a free rooftop inspection, shadow analysis, and custom EMI & subsidy breakdown.
            </p>
          </div>
          <Link
            href="#consultation-form"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-[#0A2540] bg-[#FFB800] hover:bg-[#E6A600] transition-colors shrink-0"
          >
            <span>Book Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
