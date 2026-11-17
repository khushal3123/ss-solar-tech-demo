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
  const isHeroRoute = normalizedPath === '/';

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

  const useTransparentStyle = isHeroRoute && !scrolled && !mobileOpen;

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-40 transition-colors duration-300',
        useTransparentStyle
          ? 'bg-gradient-to-b from-[#102D26]/80 to-transparent border-b border-transparent'
          : 'bg-[#F4F6EF]/95 backdrop-blur-md border-b border-[#E4E9E1]'
      )}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 md:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single-line, no extra chips) */}
        <Link
          href="/"
          aria-label="SS Solar Home"
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4B942] rounded-sm shrink-0"
        >
          <BrandLogo variant={useTransparentStyle ? 'light' : 'dark'} />
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
                  useTransparentStyle
                    ? isActive
                      ? 'text-white'
                      : 'text-white/85 hover:text-white'
                    : isActive
                      ? 'text-[#102D26]'
                      : 'text-[#4F5E57] hover:text-[#102D26]'
                )}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-0 -bottom-0.5 h-[2px]',
                      useTransparentStyle ? 'bg-[#F4B942]' : 'bg-[#246B50]'
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="hidden md:flex items-center shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-[#102D26] bg-[#F4B942] hover:bg-[#eab035] rounded-md transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4B942]"
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
          className={cn(
            'md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4B942]',
            useTransparentStyle
              ? 'text-white hover:bg-white/10'
              : 'text-[#102D26] hover:bg-[#102D26]/5'
          )}
        >
          {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#F4F6EF] border-b border-[#E4E9E1] px-5 pb-6 pt-3 shadow-lg"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-[#E4E9E1]">
              {NAV_LINKS.map((item) => {
                const isActive = normalizedPath === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'py-3.5 text-base font-medium flex items-center justify-between transition-colors',
                      isActive ? 'text-[#102D26] font-semibold' : 'text-[#4F5E57] hover:text-[#102D26]'
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 bg-[#246B50]" aria-hidden="true" />}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-4">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-[#102D26] bg-[#F4B942] hover:bg-[#eab035] rounded-md transition-colors"
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
