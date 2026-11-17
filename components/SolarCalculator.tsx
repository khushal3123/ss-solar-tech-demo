'use client';

import React, { useState } from 'react';
import {
  Home,
  Building2,
  Zap,
  Sun,
  IndianRupee,
  Maximize2,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
  Info,
} from 'lucide-react';
import { CALCULATOR_CONFIG } from '@/lib/config';
import {
  calculateSolarEstimate,
  calculateEmiBreakdown,
  PropertyType,
  EmiTenureMonths,
} from '@/lib/calculator';
import { buildCalculatorWhatsAppMessage, getWhatsAppAction } from '@/lib/whatsapp';
import AnimatedCounter from './AnimatedCounter';

const EMI_TENURES: { months: EmiTenureMonths; label: string; tag?: string }[] = [
  { months: 6, label: '6 Months', tag: '0% Promo' },
  { months: 36, label: '36 Months', tag: 'Popular' },
  { months: 60, label: '60 Months', tag: 'Lowest EMI' },
];

const MIN_BILL_INR = 1000;
const MAX_BILL_INR = 100000;
const STEP_BILL_INR = 500;

export default function SolarCalculator() {
  const [propertyType, setPropertyType] = useState<PropertyType>('Residential');
  const [monthlyBillInr, setMonthlyBillInr] = useState<number>(
    CALCULATOR_CONFIG.presets.Residential.defaultMonthlyBillInr
  );
  const [tariffPerUnitInr, setTariffPerUnitInr] = useState<number>(
    CALCULATOR_CONFIG.presets.Residential.defaultTariffPerUnitInr
  );
  const [unitsPerKwPerMonth, setUnitsPerKwPerMonth] = useState<number>(
    CALCULATOR_CONFIG.presets.Residential.defaultUnitsPerKwPerMonth
  );
  const [applySubsidy, setApplySubsidy] = useState<boolean>(true);
  const [selectedTenure, setSelectedTenure] = useState<EmiTenureMonths>(60);
  const [copiedQuote, setCopiedQuote] = useState<boolean>(false);

  const activePreset = CALCULATOR_CONFIG.presets[propertyType];

  const handlePropertyTypeChange = (nextType: PropertyType) => {
    setPropertyType(nextType);
    const preset = CALCULATOR_CONFIG.presets[nextType];
    setMonthlyBillInr(preset.defaultMonthlyBillInr);
    setTariffPerUnitInr(preset.defaultTariffPerUnitInr);
    setUnitsPerKwPerMonth(preset.defaultUnitsPerKwPerMonth);
    setApplySubsidy(nextType === 'Residential');
  };

  const handleResetDefaults = () => {
    const preset = CALCULATOR_CONFIG.presets[propertyType];
    setMonthlyBillInr(preset.defaultMonthlyBillInr);
    setTariffPerUnitInr(preset.defaultTariffPerUnitInr);
    setUnitsPerKwPerMonth(preset.defaultUnitsPerKwPerMonth);
    setApplySubsidy(propertyType === 'Residential');
    setSelectedTenure(60);
  };

  const estimate = calculateSolarEstimate({
    monthlyBillInr,
    tariffPerUnitInr,
    unitsPerKwPerMonth,
    propertyType,
    applySubsidy: propertyType === 'Residential' && applySubsidy,
    emiTenureMonths: selectedTenure,
  });

  const activeEmi =
    estimate.emi ??
    calculateEmiBreakdown(estimate.netEstimatedSystemCostInr ?? 0, selectedTenure) ?? {
      tenureMonths: selectedTenure,
      downPaymentInr: 0,
      loanAmountInr: 0,
      monthlyEmiInr: 0,
      annualInterestRatePercent: selectedTenure === 6 ? 0 : 9.5,
    };

  const whatsappMessage = buildCalculatorWhatsAppMessage({
    monthlyBillInr: estimate.effectiveMonthlyBillInr,
    tariffPerUnitInr,
    propertyType: estimate.propertyType,
    recommendedCapacityKw: estimate.recommendedCapacityKw,
    estimatedMonthlySavingsInr: estimate.estimatedMonthlySavingsInr,
    estimatedAnnualSavingsInr: estimate.estimatedAnnualSavingsInr,
    indicativeSubsidyInr: estimate.indicativeSubsidyInr,
    netEstimatedSystemCostInr: estimate.netEstimatedSystemCostInr,
    preferredEmiTenureMonths: selectedTenure,
    preferredMonthlyEmiInr: activeEmi.monthlyEmiInr,
  });

  const whatsappAction = getWhatsAppAction(whatsappMessage);

  const handleCopyEstimate = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2500);
    } catch {
      // Ignore clipboard error
    }
  };

  const presetCostPerKw = activePreset.estimatedCostPerKwInr ?? 55000;
  const grossCostInr = estimate.estimatedSystemCostInr ?? 0;
  const netCostInr = estimate.netEstimatedSystemCostInr ?? 0;

  return (
    <section
      id="calculator"
      className="py-16 sm:py-24 bg-[#F4F7FB] border-b border-[#E2E8F0] scroll-mt-16"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-widest font-semibold text-[#0052CC] mb-2">
            Indore Solar Savings &amp; EMI Estimator
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
            Calculate Your Solar Savings, Subsidy &amp; Monthly EMI
          </h2>
          <p className="text-[#475569] text-base sm:text-lg mt-3">
            Switch between Residential and Commercial profiles to compare your recommended system size, PM Surya Ghar subsidy, and 6, 36, or 60-month EMI plans.
          </p>
        </div>

        {/* Main 12-Column Calculator Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (6 cols): Interactive Inputs */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8 space-y-6">
            {/* Property Type Toggle */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#475569] font-semibold">
                  1. Select Connection Profile
                </label>
                <span
                  data-testid="calc-active-profile"
                  className="text-xs font-semibold text-[#0052CC] bg-[#F4F7FB] px-2.5 py-1 rounded-md border border-[#E2E8F0]"
                >
                  {propertyType} Profile • ₹{presetCostPerKw.toLocaleString('en-IN')}/kW
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#F4F7FB] rounded-xl border border-[#E2E8F0]">
                <button
                  type="button"
                  data-testid="calc-type-residential"
                  aria-pressed={propertyType === 'Residential'}
                  onClick={() => handlePropertyTypeChange('Residential')}
                  className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                    propertyType === 'Residential'
                      ? 'bg-[#0052CC] text-white shadow-sm'
                      : 'text-[#475569] hover:text-[#0A2540] bg-transparent'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Residential</span>
                </button>

                <button
                  type="button"
                  data-testid="calc-type-commercial"
                  aria-pressed={propertyType === 'Commercial'}
                  onClick={() => handlePropertyTypeChange('Commercial')}
                  className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                    propertyType === 'Commercial'
                      ? 'bg-[#0052CC] text-white shadow-sm'
                      : 'text-[#475569] hover:text-[#0A2540] bg-transparent'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Commercial</span>
                </button>
              </div>
              <p className="text-xs text-[#475569] mt-2">
                {propertyType === 'Residential'
                  ? 'Configured for Indore homes & housing societies (₹8/unit default tariff, PM Surya Ghar subsidy applicable).'
                  : 'Configured for commercial offices, clinics, showrooms & institutions (₹10/unit default tariff, commercial scale pricing).'}
              </p>
            </div>

            {/* Monthly Electricity Bill Input + Slider */}
            <div className="pt-2 border-t border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="calc-monthly-bill"
                  className="text-sm font-bold text-[#0A2540] flex items-center gap-1.5"
                >
                  <IndianRupee className="w-4 h-4 text-[#0052CC]" />
                  <span>Average Monthly Electricity Bill (₹)</span>
                </label>
                <div className="relative w-36">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#475569]">
                    ₹
                  </span>
                  <input
                    id="calc-monthly-bill"
                    type="number"
                    min={MIN_BILL_INR}
                    max={MAX_BILL_INR}
                    step={STEP_BILL_INR}
                    value={monthlyBillInr}
                    onChange={(e) => setMonthlyBillInr(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full pl-7 pr-3 py-1.5 rounded-lg bg-[#F4F7FB] border border-[#E2E8F0] font-mono font-bold text-sm text-[#0A2540] text-right focus:outline-none focus:border-[#0052CC]"
                  />
                </div>
              </div>

              <input
                type="range"
                aria-label="Average Monthly Electricity Bill Slider"
                min={MIN_BILL_INR}
                max={MAX_BILL_INR}
                step={STEP_BILL_INR}
                value={Math.min(Math.max(monthlyBillInr, MIN_BILL_INR), MAX_BILL_INR)}
                onChange={(e) => setMonthlyBillInr(Number(e.target.value))}
                className="w-full my-2"
              />

              <div className="flex justify-between text-[11px] font-mono text-[#475569]">
                <span>₹1,000/mo</span>
                <span>₹25,000/mo</span>
                <span>₹1,00,000/mo</span>
              </div>
            </div>

            {/* Tariff & Generation Assumptions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E2E8F0]">
              <div>
                <label
                  htmlFor="calc-tariff"
                  className="block text-xs font-semibold text-[#0A2540] mb-1.5"
                >
                  Electricity Tariff (₹ / Unit)
                </label>
                <input
                  id="calc-tariff"
                  type="number"
                  min={4}
                  max={20}
                  step={0.5}
                  value={tariffPerUnitInr}
                  onChange={(e) => setTariffPerUnitInr(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F7FB] border border-[#E2E8F0] font-mono font-semibold text-sm text-[#0A2540] focus:outline-none focus:border-[#0052CC]"
                />
                <span className="text-[11px] text-[#475569] mt-1 block">
                  Est. Monthly Usage: <strong>{estimate.effectiveMonthlyUnits} units</strong>
                </span>
              </div>

              <div>
                <label
                  htmlFor="calc-units"
                  className="block text-xs font-semibold text-[#0A2540] mb-1.5"
                >
                  Solar Output (Units / kW / Mo)
                </label>
                <input
                  id="calc-units"
                  type="number"
                  min={80}
                  max={160}
                  step={5}
                  value={unitsPerKwPerMonth}
                  onChange={(e) =>
                    setUnitsPerKwPerMonth(Math.max(60, Number(e.target.value) || 60))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F7FB] border border-[#E2E8F0] font-mono font-semibold text-sm text-[#0A2540] focus:outline-none focus:border-[#0052CC]"
                />
                <span className="text-[11px] text-[#475569] mt-1 block">
                  Indore avg: 120–125 units/kW/month
                </span>
              </div>
            </div>

            {/* Subsidy Eligibility Toggle (Residential Only) */}
            <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between gap-4">
              {propertyType === 'Residential' ? (
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={applySubsidy}
                    onChange={(e) => setApplySubsidy(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#0052CC] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#0A2540] block">
                      Include PM Surya Ghar Residential Subsidy
                    </span>
                    <span className="text-[11px] text-[#475569]">
                      ₹30k (1 kW), ₹60k (2 kW), up to ₹78,000 (3 kW & above)
                    </span>
                  </div>
                </label>
              ) : (
                <div className="flex items-center gap-2 text-xs text-[#475569]">
                  <Info className="w-4 h-4 text-[#0052CC] shrink-0" />
                  <span>
                    Commercial systems qualify for Accelerated Depreciation tax benefits instead of residential DBT subsidy.
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={handleResetDefaults}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#475569] hover:text-[#0A2540] bg-[#F4F7FB] hover:bg-[#E2E8F0]/70 transition-colors shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Right Column (6 cols): SolarSquare-Inspired Savings, Subsidy & EMI Output Card */}
          <div className="lg:col-span-6 bg-[#0A2540] text-white rounded-2xl shadow-xl border border-white/10 p-6 sm:p-8 space-y-6">
            {/* Top Primary System Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-6 border-b border-white/10">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-1">
                  <Sun className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>Recommended Size</span>
                </div>
                <div
                  data-testid="calc-capacity"
                  className="font-display font-bold text-2xl sm:text-3xl text-[#FFB800]"
                >
                  <AnimatedCounter
                    value={estimate.recommendedCapacityKw}
                    decimals={1}
                    suffix=" kW"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  {propertyType} System
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-1">
                  <Zap className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>Solar Generation</span>
                </div>
                <div
                  data-testid="calc-generation"
                  className="font-display font-bold text-2xl sm:text-3xl text-white"
                >
                  <AnimatedCounter
                    value={estimate.estimatedMonthlyGenerationKwh}
                    formatIndian
                    suffix=" u/mo"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Approx. Monthly Output
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-1">
                  <Maximize2 className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>Shadow-Free Roof</span>
                </div>
                <div className="font-display font-bold text-2xl sm:text-3xl text-white">
                  <AnimatedCounter
                    value={estimate.estimatedRequiredAreaSqFt}
                    formatIndian
                    suffix=" sq.ft"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Approx. Area Needed
                </span>
              </div>
            </div>

            {/* Monthly & Annual Bill Savings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0052CC]/25 border border-[#0052CC]/50 rounded-xl p-4">
                <span className="text-xs font-mono uppercase tracking-wider text-sky-200 block">
                  Est. Monthly Bill Savings
                </span>
                <div
                  data-testid="calc-monthly-savings"
                  className="font-display font-bold text-2xl sm:text-3xl text-white mt-1"
                >
                  <AnimatedCounter
                    value={estimate.estimatedMonthlySavingsInr}
                    formatIndian
                    prefix="₹"
                    suffix="/mo"
                  />
                </div>
                <span className="text-[11px] text-sky-200/80 mt-1 block">
                  Capped at your ₹{estimate.effectiveMonthlyBillInr.toLocaleString('en-IN')}/mo bill
                </span>
              </div>

              <div className="bg-emerald-500/15 border border-emerald-400/30 rounded-xl p-4">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-200 block">
                  Est. Annual Savings
                </span>
                <div
                  data-testid="calc-annual-savings"
                  className="font-display font-bold text-2xl sm:text-3xl text-[#FFB800] mt-1"
                >
                  <AnimatedCounter
                    value={estimate.estimatedAnnualSavingsInr}
                    formatIndian
                    prefix="₹"
                    suffix="/yr"
                  />
                </div>
                <span
                  data-testid="calc-payback"
                  className="text-[11px] text-emerald-200/90 mt-1 block"
                >
                  Indicative Payback: ~{estimate.indicativePaybackYears ?? 0} Years
                </span>
              </div>
            </div>

            {/* Cost & Subsidy Breakdown Box */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Indicative System Cost ({estimate.recommendedCapacityKw} kW):</span>
                <span className="font-mono font-semibold text-white">
                  ₹{grossCostInr.toLocaleString('en-IN')}
                </span>
              </div>

              {estimate.indicativeSubsidyInr > 0 && (
                <div className="flex items-center justify-between text-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                    <span>Indicative PM Surya Ghar Subsidy:</span>
                  </span>
                  <span
                    data-testid="calc-subsidy-amount"
                    className="font-mono font-bold text-emerald-300"
                  >
                    - ₹{estimate.indicativeSubsidyInr.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-sm font-bold text-white">
                <span>Effective Net Investment:</span>
                <span
                  data-testid="calc-net-cost"
                  className="font-mono text-base text-[#FFB800]"
                >
                  ₹{netCostInr.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Interactive EMI Tenure Selector (6, 36, 60 Months) */}
            <div className="bg-white text-[#0A2540] rounded-xl p-4 sm:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#0052CC] block">
                    Solar EMI Estimate
                  </span>
                  <h3 className="font-display font-bold text-base text-[#0A2540]">
                    Choose EMI Tenure (after 20% down payment)
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#475569] bg-[#F4F7FB] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                  Down Payment: ₹{activeEmi.downPaymentInr.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Tenure Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-[#F4F7FB] rounded-xl border border-[#E2E8F0]">
                {EMI_TENURES.map((tab) => {
                  const isSelected = selectedTenure === tab.months;
                  return (
                    <button
                      key={tab.months}
                      type="button"
                      data-testid={`calc-emi-${tab.months}`}
                      onClick={() => setSelectedTenure(tab.months)}
                      className={`py-2 px-2.5 rounded-lg text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0052CC] text-white shadow-xs font-bold'
                          : 'text-[#475569] hover:text-[#0A2540] font-semibold'
                      }`}
                    >
                      <span className="text-xs block">{tab.label}</span>
                      {tab.tag && (
                        <span
                          className={`text-[10px] block mt-0.5 ${
                            isSelected ? 'text-[#FFB800]' : 'text-[#475569]'
                          }`}
                        >
                          {tab.tag}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected EMI vs Monthly Savings Comparison */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-[#F4F7FB] border border-[#E2E8F0]">
                  <span className="text-[11px] text-[#475569] block">
                    Est. Monthly EMI ({selectedTenure} mo @ {activeEmi.annualInterestRatePercent}% p.a.)
                  </span>
                  <div
                    data-testid="calc-selected-emi"
                    className="font-display font-bold text-xl sm:text-2xl text-[#0A2540] mt-0.5"
                  >
                    ₹{activeEmi.monthlyEmiInr.toLocaleString('en-IN')}/mo
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[11px] text-emerald-800 block">
                    Your Monthly Solar Bill Savings
                  </span>
                  <div className="font-display font-bold text-xl sm:text-2xl text-emerald-700 mt-0.5 flex items-center gap-1.5">
                    <span>₹{estimate.estimatedMonthlySavingsInr.toLocaleString('en-IN')}/mo</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              {whatsappAction.isConfigured && whatsappAction.href ? (
                <a
                  href={whatsappAction.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-[#0A2540] bg-[#FFB800] hover:bg-[#E6A600] transition-all shadow-md"
                >
                  <span>Get This Estimate on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <a
                  href="#consultation-form"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-[#0A2540] bg-[#FFB800] hover:bg-[#E6A600] transition-all shadow-md"
                >
                  <span>Book Free Site Survey for This Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}

              <button
                type="button"
                onClick={handleCopyEstimate}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-colors cursor-pointer"
              >
                {copiedQuote ? (
                  <>
                    <Check className="w-4 h-4 text-[#FFB800]" />
                    <span>Summary Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Estimate</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              *Disclaimer: Capacity, cost, subsidy, and EMI figures are indicative planning estimates based on standard Indore irradiation and financing terms. Final pricing depends on physical roof structure and MPPKVVCL feasibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
