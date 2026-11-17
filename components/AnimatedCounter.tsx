'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatIndian?: boolean;
  className?: string;
}

export function AnimatedCounter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  formatIndian = false,
  className,
}: AnimatedCounterProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(value);
  const currentDisplayRef = useRef<number>(value);

  useEffect(() => {
    if (prefersReducedMotion) {
      currentDisplayRef.current = value;
      setDisplayValue(value);
      return;
    }

    const startValue = currentDisplayRef.current;
    const delta = value - startValue;
    if (Math.abs(delta) < 1e-6) {
      currentDisplayRef.current = value;
      setDisplayValue(value);
      return;
    }

    const duration = 260;
    let startTime: number | null = null;
    let rafId = 0;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextVal = progress < 1 ? startValue + delta * eased : value;
      currentDisplayRef.current = nextVal;
      setDisplayValue(nextVal);

      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      }
    };

    rafId = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [value, prefersReducedMotion]);

  const rounded =
    decimals > 0
      ? Number(displayValue.toFixed(decimals))
      : Math.round(displayValue);

  const formatted = formatIndian
    ? new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(rounded)
    : rounded.toFixed(decimals);

  return (
    <span className={className ? `tabular-nums ${className}` : 'tabular-nums'}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
