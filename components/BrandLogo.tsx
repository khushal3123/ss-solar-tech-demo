import React from 'react';
import { Sun } from 'lucide-react';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  showSubtitle?: boolean;
  className?: string;
}

export default function BrandLogo({
  variant = 'dark',
  showSubtitle = false,
  className = '',
}: BrandLogoProps) {
  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Engineered Solar Emblem */}
      <div className="relative w-9 h-9 rounded-lg bg-[#0052CC] flex items-center justify-center shadow-xs border border-white/15 overflow-hidden shrink-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '7px 7px',
          }}
        />
        <div className="w-5 h-5 rounded-full bg-[#FFB800] flex items-center justify-center relative z-10">
          <Sun className="w-3.5 h-3.5 text-[#0A2540] stroke-[2.5]" />
        </div>
      </div>

      {/* Single-line Typography Lockup (with optional footer subtitle) */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-display font-bold text-xl tracking-tight ${
              isLight ? 'text-white' : 'text-[#0A2540]'
            }`}
          >
            SS
          </span>
          <span
            className={`font-display font-bold text-xl tracking-tight ${
              isLight ? 'text-[#FFB800]' : 'text-[#0052CC]'
            }`}
          >
            SOLAR
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`font-mono text-[10px] uppercase tracking-widest mt-1 ${
              isLight ? 'text-slate-300' : 'text-[#475569]'
            }`}
          >
            Indore · Madhya Pradesh
          </span>
        )}
      </div>
    </div>
  );
}
