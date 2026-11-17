'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS, type FAQItem } from '@/lib/config';
import { Reveal } from './Reveal';

interface FAQProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
}

export function FAQ({
  items = FAQ_ITEMS,
  title = 'Frequently Asked Questions.',
  subtitle = 'Clear answers about rooftop solar planning, space requirements, maintenance, and quotations in Indore.',
}: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-20 md:py-28 bg-[#0F2626] text-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left intro */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal>
              <p className="text-xs font-semibold tracking-wider uppercase text-[#F4B942] mb-3">
                Common Questions
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance mb-4">
                {title}
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-6">
                {subtitle}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#F4B942] hover:text-amber-300 transition-colors"
              >
                <span>Ask a specific question</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          {/* Right Liquid Glass Accordion */}
          <div className="lg:col-span-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] px-6 sm:px-8 divide-y divide-white/15">
            {items.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `faq-panel-${item.id}`;
              return (
                <div key={item.id}>
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full py-5 text-left flex items-center justify-between gap-6 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4B942]"
                  >
                    <span className="font-display text-base sm:text-lg font-semibold text-white group-hover:text-[#F4B942] transition-colors">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-white/20 bg-white/10 text-[#F4B942]"
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-8 text-sm sm:text-base text-white/75 leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
