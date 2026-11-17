'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const normalizedPath =
    !pathname || pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 pt-4 -mb-24 pointer-events-none">
      <div
        className={cn(
          'pointer-events-auto rounded-full max-w-6xl mx-auto px-5 sm:px-7 h-16 md:h-[68px] flex items-center justify-between gap-6 transition-all duration-300 backdrop-blur-xl backdrop-saturate-150 border border-white/12',
          scrolled
            ? 'bg-[#0F2626]/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_16px_40px_rgba(0,0,0,0.45)]'
            : 'bg-[#0F2626]/65 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_8px_30px_rgba(0,0,0,0.28)]'
        )}
      >
        {/* Zone 1: Brand wordmark (single-line, no extra chips) */}
        <Link
          href="/"
          aria-label="SS Solar Home"
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4B942] rounded-full shrink-0"
        >
          <BrandLogo variant="light" />
        </Link>

        {/* Zone 2: Concise single-line navigation links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => {
            const isActive = normalizedPath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4B942]',
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-white/80 hover:text-white'
                )}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-[#F4B942]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Single primary solid gold action */}
        <div className="hidden md:flex items-center shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-[#102D26] bg-[#F4B942] hover:bg-[#eab035] rounded-full shadow-[0_2px_12px_rgba(244,185,66,0.3)] transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4B942]"
          >
            Get Free Quote
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-white bg-white/5 border border-white/15 hover:bg-white/15 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4B942]"
        >
          {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Animated Mobile Navigation Glass Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto md:hidden max-w-6xl mx-auto mt-2 rounded-2xl bg-[#0F2626]/85 backdrop-blur-xl backdrop-saturate-150 border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_20px_48px_rgba(0,0,0,0.5)] px-5 pb-6 pt-3"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-white/10">
              {NAV_LINKS.map((item) => {
                const isActive = normalizedPath === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'py-3.5 text-base font-medium flex items-center justify-between transition-colors',
                      isActive ? 'text-[#F4B942] font-semibold' : 'text-white/85 hover:text-white'
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#F4B942]" aria-hidden="true" />}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-4">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-[#102D26] bg-[#F4B942] hover:bg-[#eab035] rounded-full transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
