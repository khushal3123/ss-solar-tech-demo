import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { BRAND_CONFIG } from '@/lib/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2540] text-white border-t border-white/10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <BrandLogo variant="light" showSubtitle />
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Engineered rooftop solar systems for homes, housing societies, and commercial establishments across Indore and Madhya Pradesh.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200">
              <ShieldCheck className="w-4 h-4 text-[#FFB800] shrink-0" />
              <span>End-to-End Site Survey, Net-Metering & Subsidy Guidance</span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#FFB800]">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="text-slate-300 hover:text-white transition-colors">
                  Savings & EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-white transition-colors">
                  Solar Solutions
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">
                  System Packages
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                  About SS Solar
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Book Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solar Solutions (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#FFB800]">
              Indore Solar Services
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Residential On-Grid Rooftop Solar
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Commercial & Industrial Solar Plants
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Cyclone-Resistant Elevated Structures
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  MPPKVVCL Net-Metering & Documentation
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Preventive Cleaning & Health Checkups
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#FFB800]">
              Contact & Service Area
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FFB800] shrink-0 mt-1" />
                <span>
                  {BRAND_CONFIG.city}, {BRAND_CONFIG.state}, {BRAND_CONFIG.country}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FFB800] shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-slate-400">Consultation Desk</span>
                  {BRAND_CONFIG.phone.startsWith('[PLACEHOLDER') ? (
                    <Link
                      href="/#consultation-form"
                      className="text-xs text-[#FFB800] hover:underline font-semibold"
                    >
                      Request Callback Online →
                    </Link>
                  ) : (
                    <span className="font-mono text-xs text-slate-200">{BRAND_CONFIG.phone}</span>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#FFB800] shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-slate-400">Online Support</span>
                  {BRAND_CONFIG.email.startsWith('[PLACEHOLDER') ? (
                    <Link
                      href="/contact"
                      className="text-xs text-slate-200 hover:text-white transition-colors"
                    >
                      Submit Rooftop Inquiry Form
                    </Link>
                  ) : (
                    <span className="font-mono text-xs text-slate-200">{BRAND_CONFIG.email}</span>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#FFB800] shrink-0 mt-1" />
                <span>{BRAND_CONFIG.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} {BRAND_CONFIG.name} ({BRAND_CONFIG.city}, {BRAND_CONFIG.state}). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms-and-conditions"
              className="hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>Terms & Conditions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
