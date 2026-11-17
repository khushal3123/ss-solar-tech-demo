import React from 'react';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

/**
 * Custom geometric SS Solar emblem combining minimal sun geometry,
 * solar panel cell lines, and subtle SS diagonal symmetry.
 */
export function BrandLogo({ variant = 'dark', className }: BrandLogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#102D26]';
  const strokeColor = variant === 'light' ? '#F4F6EF' : '#102D26';

  return (
    <span className={cn('inline-flex items-center gap-2.5 whitespace-nowrap shrink-0', className)}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Rising solar disc arc */}
        <path
          d="M11.5 14.5C12.8 10.7 16.4 8 20.6 8C24.2 8 27.3 9.9 29 12.8"
          stroke="#F4B942"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="20.5" cy="13.2" r="2.6" fill="#F4B942" />
        {/* Angled geometric solar panel frame with subtle SS fold */}
        <path
          d="M5.5 22.5L13 15.5H30.5L23 22.5H5.5Z"
          stroke={strokeColor}
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 28.5L13 21.5H30.5L23 28.5H5.5Z"
          stroke={strokeColor}
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        {/* Vertical solar cell grid divider */}
        <path
          d="M19.5 15.5L12 28.5"
          stroke="#F4B942"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span className={cn('font-display text-lg font-bold tracking-tight', textColor)}>
        SS Solar
      </span>
    </span>
  );
}
