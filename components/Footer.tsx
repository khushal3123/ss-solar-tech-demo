import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SITE_CONFIG } from '@/lib/config';
import { buildWhatsAppUrl, formatGeneralWhatsAppMessage } from '@/lib/whatsapp';

export function Footer() {
  const whatsappHref = buildWhatsAppUrl(formatGeneralWhatsAppMessage());

  return (
    <footer className="relative bg-[#102D26] text-[#F4F6EF] overflow-hidden border-t border-white/10">
      {/* Subtle geometric solar grid line pattern */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-[520px] opacity-[0.05] text-[#F4B942]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="320" cy="80" r="140" stroke="currentColor" strokeWidth="1" />
        <circle cx="320" cy="80" r="210" stroke="currentColor" strokeWidth="1" />
        <path d="M60 360L200 220H380L240 360H60Z" stroke="currentColor" strokeWidth="1" />
        <path d="M130 360L270 220" stroke="currentColor" strokeWidth="1" />
        <path d="M130 290H310" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/12">
          {/* Column 1: Brand */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4B942]">
              <BrandLogo variant="light" />
            </Link>
            <p className="text-sm leading-relaxed text-white/75 max-w-sm">
              Power Your Home. Save Your Future. SS Solar delivers thoughtfully designed rooftop solar solutions for homes, offices, and industrial facilities across Indore, Madhya Pradesh.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with SS Solar on WhatsApp"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#102D26] bg-[#F4B942] hover:bg-[#eab035] rounded-md transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>WhatsApp Enquiry</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white/90 border border-white/20 hover:border-white/45 rounded-md transition-colors"
              >
                <span>Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display text-xs font-semibold tracking-wider uppercase text-[#F4B942]">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display text-xs font-semibold tracking-wider uppercase text-[#F4B942]">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link href="/services#residential" className="hover:text-white transition-colors">
                  Residential Solar Installation
                </Link>
              </li>
              <li>
                <Link href="/services#commercial" className="hover:text-white transition-colors">
                  Commercial Solar Installation
                </Link>
              </li>
              <li>
                <Link href="/services#industrial" className="hover:text-white transition-colors">
                  Industrial Solar Solutions
                </Link>
              </li>
              <li>
                <Link href="/services#consultation" className="hover:text-white transition-colors">
                  Solar Consultation &amp; Site Review
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-white transition-colors">
                  Solar Savings Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display text-xs font-semibold tracking-wider uppercase text-[#F4B942]">
              Contact Information
            </h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F4B942] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{SITE_CONFIG.locationLabel}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#F4B942] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Phone: {SITE_CONFIG.contactPlaceholders.phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#F4B942] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Email: {SITE_CONFIG.contactPlaceholders.email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#F4B942] shrink-0 mt-0.5" aria-hidden="true" />
                <span>WhatsApp: {SITE_CONFIG.contactPlaceholders.whatsapp}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/60">
          <p>
            Copyright &copy; 2026 SS Solar. All rights reserved. Demo client showcase website.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/terms-and-conditions#privacy" className="hover:text-white transition-colors">
              Privacy Policy (Placeholder)
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>Indore, Madhya Pradesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
