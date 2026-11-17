'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calculator, ArrowUpRight } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { motion, AnimatePresence } from 'motion/react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Savings & EMI', href: '/#calculator' },
  { name: 'Why SS Solar', href: '/#why-us' },
  { name: 'Process', href: '/#process' },
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#E2E8F0] py-3'
          : 'bg-white border-b border-[#E2E8F0] py-4'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Brand Lockup */}
          <Link href="/" className="focus:outline-none shrink-0">
            <BrandLogo variant="dark" />
          </Link>

          {/* Zone 2: Primary Navigation */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold whitespace-nowrap transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#0052CC]'
                      : 'text-[#0A2540]/80 hover:text-[#0052CC]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0052CC]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <Link
              href="/#calculator"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A2540] hover:text-[#0052CC] transition-colors whitespace-nowrap"
            >
              <Calculator className="w-4 h-4 text-[#0052CC]" />
              <span>Check EMI</span>
            </Link>
            <Link
              href="/#consultation-form"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0052CC] hover:bg-[#003E99] transition-all shadow-xs whitespace-nowrap"
            >
              <span>Book Free Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#0A2540] hover:bg-[#F4F7FB] focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-[#E2E8F0] overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-1.5">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-base font-semibold ${
                      isActive
                        ? 'bg-[#F4F7FB] text-[#0052CC]'
                        : 'text-[#0A2540] hover:bg-[#F4F7FB]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-3 mt-3 border-t border-[#E2E8F0] flex flex-col gap-2.5">
                <Link
                  href="/#calculator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-[#0052CC] bg-[#F4F7FB] border border-[#E2E8F0]"
                >
                  <Calculator className="w-4 h-4 text-[#0052CC]" />
                  <span>Calculate Savings & EMI</span>
                </Link>
                <Link
                  href="/#consultation-form"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-white bg-[#0052CC]"
                >
                  <span>Book Free Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
