import { CALCULATOR_CONFIG, type CalculatorConfig } from './config';

export type PropertyType = 'Residential' | 'Commercial';

export interface SolarCalculatorInput {
  monthlyBillInr: number;
  tariffPerUnitInr: number;
  monthlyUnitsOverride?: number | null;
  propertyType: PropertyType;
  availableRooftopSqFt?: number | null;
  unitsPerKwPerMonth?: number;
}

export interface SolarCalculatorResult {
  hasValidInput: boolean;
  propertyType: PropertyType;
  effectiveMonthlyUnits: number;
  effectiveMonthlyBillInr: number;
  unitsPerKwPerMonth: number;
  recommendedCapacityKw: number;
  estimatedMonthlyGenerationKwh: number;
  estimatedMonthlySavingsInr: number;
  estimatedAnnualSavingsInr: number;
  estimatedCostPerKwInr: number | null;
  estimatedSystemCostInr: number | null;
  indicativePaybackYears: number | null;
  estimatedRequiredAreaSqFt: number;
  rooftopSqFtPerKw: number;
  maxCapacityByAreaKw: number | null;
  isAreaConstrained: boolean;
}

export function roundToStep(value: number, step: number): number {
  if (!Number.isFinite(value) || value <= 0 || step <= 0) {
    return 0;
  }
  return Math.round(value / step) * step;
}

export function roundUpToStep(value: number, step: number): number {
  if (!Number.isFinite(value) || value <= 0 || step <= 0) {
    return 0;
  }
  return Math.ceil(Number((value / step).toFixed(6))) * step;
}

export function calculateSolarEstimate(
  input: SolarCalculatorInput,
  config: CalculatorConfig = CALCULATOR_CONFIG
): SolarCalculatorResult {
  const propertyType: PropertyType =
    input.propertyType === 'Commercial' ? 'Commercial' : 'Residential';
  const preset = config.presets?.[propertyType];

  const tariff =
    Number.isFinite(input.tariffPerUnitInr) && input.tariffPerUnitInr > 0
      ? input.tariffPerUnitInr
      : 0;

  const bill =
    Number.isFinite(input.monthlyBillInr) && input.monthlyBillInr > 0
      ? input.monthlyBillInr
      : 0;

  const overrideUnits =
    input.monthlyUnitsOverride !== undefined &&
    input.monthlyUnitsOverride !== null &&
    Number.isFinite(input.monthlyUnitsOverride) &&
    input.monthlyUnitsOverride > 0
      ? input.monthlyUnitsOverride
      : null;

  const defaultFactor = preset?.defaultUnitsPerKwPerMonth ?? config.defaultUnitsPerKwPerMonth;
  const generationFactor =
    input.unitsPerKwPerMonth !== undefined &&
    Number.isFinite(input.unitsPerKwPerMonth) &&
    input.unitsPerKwPerMonth > 0
      ? input.unitsPerKwPerMonth
      : defaultFactor;

  const roofSqFtPerKw = preset?.rooftopSqFtPerKw ?? config.rooftopSqFtPerKw;

  const rawCostPerKw =
    config.estimatedCostPerKwInr === null || config.estimatedCostPerKwInr === 0
      ? null
      : preset?.estimatedCostPerKwInr ?? config.estimatedCostPerKwInr;

  const costPerKw =
    rawCostPerKw !== null && Number.isFinite(rawCostPerKw) && rawCostPerKw > 0
      ? rawCostPerKw
      : null;

  let effectiveMonthlyUnits = 0;
  let effectiveMonthlyBillInr = 0;

  if (overrideUnits !== null) {
    effectiveMonthlyUnits = Math.round(overrideUnits);
    effectiveMonthlyBillInr = tariff > 0 ? Math.round(overrideUnits * tariff) : Math.round(bill);
  } else if (bill > 0 && tariff > 0) {
    effectiveMonthlyUnits = Math.round(bill / tariff);
    effectiveMonthlyBillInr = Math.round(bill);
  }

  if (effectiveMonthlyUnits <= 0 || tariff <= 0) {
    return {
      hasValidInput: false,
      propertyType,
      effectiveMonthlyUnits: 0,
      effectiveMonthlyBillInr: 0,
      unitsPerKwPerMonth: generationFactor,
      recommendedCapacityKw: 0,
      estimatedMonthlyGenerationKwh: 0,
      estimatedMonthlySavingsInr: 0,
      estimatedAnnualSavingsInr: 0,
      estimatedCostPerKwInr: costPerKw,
      estimatedSystemCostInr: null,
      indicativePaybackYears: null,
      estimatedRequiredAreaSqFt: 0,
      rooftopSqFtPerKw: roofSqFtPerKw,
      maxCapacityByAreaKw: null,
      isAreaConstrained: false,
    };
  }

  const rawCapacityKw = effectiveMonthlyUnits / generationFactor;
  const steppedCapacity = Math.max(
    config.minCapacityKw,
    Math.min(config.maxCapacityKw, roundUpToStep(rawCapacityKw, config.capacityStepKw))
  );
  const recommendedCapacityKw = Number(steppedCapacity.toFixed(1));

  const estimatedMonthlyGenerationKwh = Math.round(recommendedCapacityKw * generationFactor);

  // Cap monthly savings at the entered/effective monthly electricity bill amount
  const rawGenerationValueInr = Math.round(estimatedMonthlyGenerationKwh * tariff);
  const estimatedMonthlySavingsInr = Math.min(effectiveMonthlyBillInr, rawGenerationValueInr);
  const estimatedAnnualSavingsInr = estimatedMonthlySavingsInr * 12;

  const estimatedSystemCostInr =
    costPerKw !== null ? Math.round(recommendedCapacityKw * costPerKw) : null;

  const indicativePaybackYears =
    estimatedSystemCostInr !== null && estimatedAnnualSavingsInr > 0
      ? Number((estimatedSystemCostInr / estimatedAnnualSavingsInr).toFixed(1))
      : null;

  const estimatedRequiredAreaSqFt = Math.round(recommendedCapacityKw * roofSqFtPerKw);

  const validArea =
    input.availableRooftopSqFt !== undefined &&
    input.availableRooftopSqFt !== null &&
    Number.isFinite(input.availableRooftopSqFt) &&
    input.availableRooftopSqFt > 0
      ? input.availableRooftopSqFt
      : null;

  const maxCapacityByAreaKw =
    validArea !== null
      ? Number(
          Math.max(0, Math.floor((validArea / roofSqFtPerKw) * 2) / 2).toFixed(1)
        )
      : null;

  const isAreaConstrained =
    maxCapacityByAreaKw !== null && recommendedCapacityKw > maxCapacityByAreaKw;

  return {
    hasValidInput: true,
    propertyType,
    effectiveMonthlyUnits,
    effectiveMonthlyBillInr,
    unitsPerKwPerMonth: generationFactor,
    recommendedCapacityKw,
    estimatedMonthlyGenerationKwh,
    estimatedMonthlySavingsInr,
    estimatedAnnualSavingsInr,
    estimatedCostPerKwInr: costPerKw,
    estimatedSystemCostInr,
    indicativePaybackYears,
    estimatedRequiredAreaSqFt,
    rooftopSqFtPerKw: roofSqFtPerKw,
    maxCapacityByAreaKw,
    isAreaConstrained,
  };
}

export function formatInr(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}
