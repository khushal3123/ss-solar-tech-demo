'use client';

import React, { useMemo, useState } from 'react';
import { MessageCircle, RotateCcw, Info } from 'lucide-react';
import { CALCULATOR_CONFIG } from '@/lib/config';
import {
  calculateSolarEstimate,
  formatInr,
  type PropertyType,
} from '@/lib/calculator';
import { buildWhatsAppUrl, formatCalculatorWhatsAppMessage } from '@/lib/whatsapp';
import { AnimatedCounter } from './AnimatedCounter';
import { Reveal } from './Reveal';
import { cn } from '@/lib/utils';

export function SolarCalculator() {
  const initialPreset = CALCULATOR_CONFIG.presets.Residential;

  const [propertyType, setPropertyType] = useState<PropertyType>('Residential');
  const [billInput, setBillInput] = useState<string>(
    String(initialPreset.defaultMonthlyBillInr)
  );
  const [tariffInput, setTariffInput] = useState<string>(
    String(initialPreset.defaultTariffPerUnitInr)
  );
  const [unitsInput, setUnitsInput] = useState<string>(
    String(
      Math.round(
        initialPreset.defaultMonthlyBillInr / initialPreset.defaultTariffPerUnitInr
      )
    )
  );
  const [lastEdited, setLastEdited] = useState<'bill' | 'units'>('bill');
  const [rooftopAreaInput, setRooftopAreaInput] = useState<string>('');
  const [generationFactorInput, setGenerationFactorInput] = useState<string>(
    String(initialPreset.defaultUnitsPerKwPerMonth)
  );

  const activePreset = CALCULATOR_CONFIG.presets[propertyType];

  const parsedBill = Number(billInput) || 0;
  const parsedTariff = Number(tariffInput) || 0;
  const parsedUnits = Number(unitsInput) || 0;
  const parsedArea = rooftopAreaInput.trim() === '' ? null : Number(rooftopAreaInput) || null;
  const parsedFactor =
    Number(generationFactorInput) > 0
      ? Number(generationFactorInput)
      : activePreset.defaultUnitsPerKwPerMonth;

  const handleBillChange = (nextBillStr: string) => {
    setBillInput(nextBillStr);
    setLastEdited('bill');
    const b = Number(nextBillStr);
    const t = Number(tariffInput);
    if (Number.isFinite(b) && b > 0 && Number.isFinite(t) && t > 0) {
      setUnitsInput(String(Math.round(b / t)));
    } else if (nextBillStr.trim() === '') {
      setUnitsInput('');
    }
  };

  const handleTariffChange = (nextTariffStr: string) => {
    setTariffInput(nextTariffStr);
    const t = Number(nextTariffStr);
    if (!Number.isFinite(t) || t <= 0) return;
    if (lastEdited === 'bill') {
      const b = Number(billInput);
      if (Number.isFinite(b) && b > 0) {
        setUnitsInput(String(Math.round(b / t)));
      }
    } else {
      const u = Number(unitsInput);
      if (Number.isFinite(u) && u > 0) {
        setBillInput(String(Math.round(u * t)));
      }
    }
  };

  const handleUnitsChange = (nextUnitsStr: string) => {
    setUnitsInput(nextUnitsStr);
    setLastEdited('units');
    const u = Number(nextUnitsStr);
    const t = Number(tariffInput);
    if (Number.isFinite(u) && u > 0 && Number.isFinite(t) && t > 0) {
      setBillInput(String(Math.round(u * t)));
    } else if (nextUnitsStr.trim() === '') {
      setBillInput('');
    }
  };

  const applyPresetForProperty = (nextType: PropertyType) => {
    const preset = CALCULATOR_CONFIG.presets[nextType];
    setPropertyType(nextType);
    setBillInput(String(preset.defaultMonthlyBillInr));
    setTariffInput(String(preset.defaultTariffPerUnitInr));
    setUnitsInput(
      String(Math.round(preset.defaultMonthlyBillInr / preset.defaultTariffPerUnitInr))
    );
    setLastEdited('bill');
    setGenerationFactorInput(String(preset.defaultUnitsPerKwPerMonth));
  };

  const handlePropertySwitch = (nextType: PropertyType) => {
    applyPresetForProperty(nextType);
  };

  const handleReset = () => {
    applyPresetForProperty(propertyType);
    setRooftopAreaInput('');
  };

  const calcInput = useMemo(
    () => ({
      monthlyBillInr: parsedBill,
      tariffPerUnitInr: parsedTariff,
      monthlyUnitsOverride: lastEdited === 'units' ? parsedUnits : null,
      propertyType,
      availableRooftopSqFt: parsedArea,
      unitsPerKwPerMonth: parsedFactor,
    }),
    [parsedBill, parsedTariff, lastEdited, parsedUnits, propertyType, parsedArea, parsedFactor]
  );

  const result = useMemo(() => calculateSolarEstimate(calcInput), [calcInput]);

  const whatsappUrl = useMemo(() => {
    const msg = formatCalculatorWhatsAppMessage(calcInput, result);
    return buildWhatsAppUrl(msg);
  }, [calcInput, result]);

  const sliderValue = Math.min(Math.max(parsedBill, 1000), 100000);

  return (
    <section id="calculator" className="py-20 md:py-28 bg-[#F4F6EF]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#246B50] mb-3">
              Interactive Estimate
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#102D26] text-balance mb-4">
              Discover How Much You Could Save with Solar.
            </h2>
            <p className="text-base text-[#4F5E57] leading-relaxed">
              Switch between Residential and Commercial presets or enter your electricity details to explore your potential solar savings.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Panel: Inputs */}
          <Reveal className="lg:col-span-6 flex">
            <div className="w-full bg-white border border-[#E4E9E1] rounded-lg p-6 sm:p-9 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Property Type Segmented Control */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-sm font-semibold text-[#102D26]">
                      Property Type
                    </span>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64736C] hover:text-[#102D26] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Reset {propertyType.toLowerCase()} defaults</span>
                    </button>
                  </div>
                  <div
                    role="group"
                    aria-label="Property type"
                    className="grid grid-cols-2 gap-1.5 p-1 bg-[#F4F6EF] border border-[#E4E9E1] rounded-md relative z-10"
                  >
                    {(['Residential', 'Commercial'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        data-testid={`calc-type-${type.toLowerCase()}`}
                        onClick={() => handlePropertySwitch(type)}
                        aria-pressed={propertyType === type}
                        className={cn(
                          'py-2.5 px-4 text-sm font-semibold rounded transition-colors whitespace-nowrap cursor-pointer',
                          propertyType === type
                            ? 'bg-[#102D26] text-white shadow-xs'
                            : 'text-[#4F5E57] hover:text-[#102D26]'
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-[#64736C]">
                    {propertyType === 'Residential'
                      ? 'Residential preset: ₹4,500/mo bill • ₹8/unit tariff • 120 units/kW/mo'
                      : 'Commercial preset: ₹25,000/mo bill • ₹10/unit tariff • 125 units/kW/mo'}
                  </p>
                </div>

                {/* Average Monthly Electricity Bill */}
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <label
                      htmlFor="calc-monthly-bill"
                      className="text-sm font-semibold text-[#102D26]"
                    >
                      Average Monthly Electricity Bill (₹)
                    </label>
                    <span className="text-xs text-[#64736C] tabular-nums">
                      {parsedBill > 0 ? formatInr(parsedBill) : '₹0'} / mo
                    </span>
                  </div>
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-[#64736C]"
                    >
                      ₹
                    </span>
                    <input
                      id="calc-monthly-bill"
                      type="number"
                      min={0}
                      step={100}
                      inputMode="numeric"
                      value={billInput}
                      onChange={(e) => handleBillChange(e.target.value)}
                      placeholder={propertyType === 'Residential' ? 'e.g. 4500' : 'e.g. 25000'}
                      className="w-full pl-8 pr-4 py-2.5 text-base font-medium text-[#102D26] bg-[#F4F6EF]/60 border border-[#E4E9E1] rounded-md tabular-nums focus:outline-none focus:border-[#246B50] focus:bg-white transition-colors"
                    />
                  </div>
                  <input
                    aria-label="Slide monthly electricity bill"
                    type="range"
                    min={1000}
                    max={100000}
                    step={500}
                    value={sliderValue}
                    onChange={(e) => handleBillChange(e.target.value)}
                    className="w-full mt-3 accent-[#246B50] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#64736C] tabular-nums mt-1">
                    <span>₹1,000</span>
                    <span>₹50,000</span>
                    <span>₹1,00,000+</span>
                  </div>
                </div>

                {/* Tariff & Consumption row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="calc-tariff"
                      className="block text-sm font-semibold text-[#102D26] mb-2"
                    >
                      Average Electricity Rate (₹ / unit)
                    </label>
                    <input
                      id="calc-tariff"
                      type="number"
                      min={1}
                      max={30}
                      step={0.5}
                      inputMode="decimal"
                      value={tariffInput}
                      onChange={(e) => handleTariffChange(e.target.value)}
                      placeholder={String(activePreset.defaultTariffPerUnitInr)}
                      className="w-full px-3.5 py-2.5 text-base font-medium text-[#102D26] bg-[#F4F6EF]/60 border border-[#E4E9E1] rounded-md tabular-nums focus:outline-none focus:border-[#246B50] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="calc-units"
                      className="block text-sm font-semibold text-[#102D26] mb-2"
                    >
                      Monthly Consumption (units)
                    </label>
                    <input
                      id="calc-units"
                      type="number"
                      min={0}
                      step={10}
                      inputMode="numeric"
                      value={unitsInput}
                      onChange={(e) => handleUnitsChange(e.target.value)}
                      placeholder="e.g. 560"
                      className="w-full px-3.5 py-2.5 text-base font-medium text-[#102D26] bg-[#F4F6EF]/60 border border-[#E4E9E1] rounded-md tabular-nums focus:outline-none focus:border-[#246B50] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Optional Rooftop Area & Editable Generation Assumption */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-[#E4E9E1] items-end">
                  <div>
                    <label
                      htmlFor="calc-area"
                      className="block text-sm font-semibold text-[#102D26] mb-2 whitespace-nowrap"
                    >
                      Rooftop Area (sq. ft.)
                      <span className="ml-1.5 text-xs font-normal text-[#64736C]">Optional</span>
                    </label>
                    <input
                      id="calc-area"
                      type="number"
                      min={0}
                      step={50}
                      inputMode="numeric"
                      value={rooftopAreaInput}
                      onChange={(e) => setRooftopAreaInput(e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full px-3.5 py-2.5 text-base font-medium text-[#102D26] bg-[#F4F6EF]/60 border border-[#E4E9E1] rounded-md tabular-nums focus:outline-none focus:border-[#246B50] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="calc-factor"
                      className="block text-sm font-semibold text-[#102D26] mb-2 whitespace-nowrap"
                    >
                      Generation Factor (u/kW/mo)
                    </label>
                    <input
                      id="calc-factor"
                      type="number"
                      min={60}
                      max={180}
                      step={5}
                      inputMode="numeric"
                      value={generationFactorInput}
                      onChange={(e) => setGenerationFactorInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-base font-medium text-[#102D26] bg-[#F4F6EF]/60 border border-[#E4E9E1] rounded-md tabular-nums focus:outline-none focus:border-[#246B50] focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              <p className="mt-6 text-xs text-[#64736C] leading-relaxed">
                {propertyType} estimate assumes ~{result.unitsPerKwPerMonth} units/kW/month generation and an indicative cost benchmark of{' '}
                {result.estimatedCostPerKwInr
                  ? `${formatInr(result.estimatedCostPerKwInr)}/kW`
                  : 'custom quote'}{' '}
                ({result.rooftopSqFtPerKw} sq. ft./kW roof area).
              </p>
            </div>
          </Reveal>

          {/* Right Panel: Results Ledger */}
          <Reveal delay={0.1} className="lg:col-span-6 flex">
            <div className="w-full bg-[#102D26] text-white rounded-lg p-6 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/15">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#F4B942]">
                    Indicative Solar Estimate
                  </span>
                  <span
                    data-testid="calc-active-profile"
                    className="text-xs font-medium text-white/80 bg-white/10 px-2.5 py-1 rounded"
                  >
                    {propertyType} Profile
                  </span>
                </div>

                {!result.hasValidInput ? (
                  <div className="py-16 text-center">
                    <p className="font-display text-lg font-semibold text-white mb-2">
                      Enter your monthly electricity bill or units
                    </p>
                    <p className="text-sm text-white/70 max-w-sm mx-auto">
                      Provide a valid monthly bill and tariff rate on the left to view your estimated solar system size and savings.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Primary Recommended Capacity */}
                    <div className="py-7 border-b border-white/15">
                      <p className="text-xs text-white/70 mb-2">
                        Recommended Solar System Capacity
                      </p>
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span
                          data-testid="calc-capacity"
                          className="font-display text-4xl sm:text-5xl font-bold text-[#F4B942] tabular-nums"
                        >
                          <AnimatedCounter
                            value={result.recommendedCapacityKw}
                            decimals={result.recommendedCapacityKw % 1 === 0 ? 0 : 1}
                            suffix=" kW"
                          />
                        </span>
                        <span className="text-xs sm:text-sm text-white/75 tabular-nums">
                          (~{result.estimatedRequiredAreaSqFt} sq. ft. shadow-free roof)
                        </span>
                      </div>
                      {result.isAreaConstrained && result.maxCapacityByAreaKw !== null && (
                        <div className="mt-3.5 flex items-start gap-2 text-xs text-[#F4B942]/95 bg-white/5 border border-[#F4B942]/30 rounded-md p-3">
                          <Info className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>
                            Based on {parsedArea} sq. ft. entered, usable rooftop space may support up to ~{result.maxCapacityByAreaKw} kW with standard layouts. A site inspection can evaluate elevated structures or high-wattage modules.
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-7 border-b border-white/15">
                      <div>
                        <p className="text-xs text-white/70 mb-1.5">
                          Estimated Monthly Generation
                        </p>
                        <p
                          data-testid="calc-generation"
                          className="font-display text-2xl font-bold text-white tabular-nums"
                        >
                          <AnimatedCounter
                            value={result.estimatedMonthlyGenerationKwh}
                            formatIndian
                            suffix=" units"
                          />
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-white/70 mb-1.5">
                          Estimated Monthly Savings
                        </p>
                        <p
                          data-testid="calc-monthly-savings"
                          className="font-display text-2xl font-bold text-white tabular-nums"
                        >
                          <AnimatedCounter
                            value={result.estimatedMonthlySavingsInr}
                            prefix="₹"
                            formatIndian
                          />
                        </p>
                        <p className="text-[11px] text-white/60 mt-0.5 tabular-nums">
                          Capped at {formatInr(result.effectiveMonthlyBillInr)}/mo bill
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-white/70 mb-1.5">
                          Estimated Annual Savings
                        </p>
                        <p
                          data-testid="calc-annual-savings"
                          className="font-display text-2xl font-bold text-[#F4B942] tabular-nums"
                        >
                          <AnimatedCounter
                            value={result.estimatedAnnualSavingsInr}
                            prefix="₹"
                            formatIndian
                          />
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-white/70 mb-1.5">
                          Indicative Payback Period
                        </p>
                        <p
                          data-testid="calc-payback"
                          className="font-display text-2xl font-bold text-white tabular-nums"
                        >
                          {result.indicativePaybackYears !== null ? (
                            <AnimatedCounter
                              value={result.indicativePaybackYears}
                              decimals={1}
                              suffix=" years"
                            />
                          ) : (
                            'Upon Quote'
                          )}
                        </p>
                        {result.estimatedSystemCostInr !== null && (
                          <p className="text-[11px] text-white/60 mt-0.5 tabular-nums">
                            Est. system cost: ~{formatInr(result.estimatedSystemCostInr)}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="pt-6 space-y-5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#102D26] bg-[#F4B942] hover:bg-[#eab035] rounded-md transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4B942]"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Get My Personalized Solar Quote</span>
                </a>

                <p className="text-[11px] leading-relaxed text-white/65">
                  These calculations are indicative estimates for demonstration purposes only. Actual solar generation and savings depend on rooftop orientation, shading, system specifications, electricity tariff, DISCOM policies, and installation costs.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
