import React from 'react';
import { Reveal } from './Reveal';

const STEPS = [
  {
    number: '01',
    title: 'Initial Consultation',
    description:
      'Share your monthly electricity bills, property type, and energy goals. We walk you through practical rooftop solar options for Indore conditions.',
  },
  {
    number: '02',
    title: 'Site Assessment',
    description:
      'We inspect your roof dimensions, orientation, shading obstructions, and electrical panel setup to determine usable capacity.',
  },
  {
    number: '03',
    title: 'Customized Solar Proposal',
    description:
      'Receive a tailored system layout, component specification overview, indicative generation projection, and clear project quotation.',
  },
  {
    number: '04',
    title: 'Installation & Handover',
    description:
      'Structured rooftop mounting, neat wiring, testing, and guidance through net-metering coordination and system walkthrough.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-white border-y border-[#E4E9E1]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#246B50] mb-3">
              Process
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#102D26] text-balance">
              Your Journey to Solar, Made Simple.
            </h2>
          </div>
        </Reveal>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Desktop hairline connector */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-5 left-0 right-0 h-[1px] bg-[#E4E9E1]"
          />

          {STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08}>
              <div className="relative pt-0 lg:pt-10 flex flex-col">
                <div className="lg:absolute lg:top-0 lg:left-0 inline-flex items-center justify-center w-10 h-10 bg-[#F4F6EF] border border-[#E4E9E1] rounded-md font-display text-sm font-bold text-[#102D26] mb-4 lg:mb-0">
                  {step.number}
                </div>
                <h3 className="font-display text-lg font-bold text-[#102D26] mb-2.5 mt-1">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4F5E57] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
