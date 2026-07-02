// ===== Unit conversion =====
// Everything in the app is STORED metric (cm/kg). These helpers convert
// at the edges: display and input. Size labels like '12"' or "Junior M"
// are brand vocabulary, not units — they are never converted.

export type UnitSystem = 'metric' | 'imperial';

const CM_PER_INCH = 2.54;
const KG_PER_LB = 0.45359237;

export function cmToIn(cm: number): number {
  return cm / CM_PER_INCH;
}

export function inToCm(inches: number): number {
  return inches * CM_PER_INCH;
}

export function kgToLb(kg: number): number {
  return kg / KG_PER_LB;
}

export function lbToKg(lb: number): number {
  return lb * KG_PER_LB;
}

/** Rounds to the nearest half — inches read best in 0.5 steps. */
export function roundToHalf(value: number): number {
  return Math.round(value * 2) / 2;
}

/** Splits a height in cm into feet + inches for the dual ft/in input. */
export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cmToIn(cm);
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round(totalInches - feet * 12);
  if (inches === 12) {
    feet += 1;
    inches = 0;
  }
  return { feet, inches };
}

export function feetInchesToCm(feet: number, inches: number): number {
  return inToCm(feet * 12 + inches);
}

/** Formats a stored metric length for display in the chosen unit system. */
export function formatLength(cm: number, units: UnitSystem): string {
  if (units === 'imperial') {
    return `${roundToHalf(cmToIn(cm))} in`;
  }
  // Show at most one decimal, without trailing ".0".
  return `${Math.round(cm * 10) / 10} cm`;
}

/** Formats a stored weight (kg) for display in the chosen unit system. */
export function formatWeight(kg: number, units: UnitSystem): string {
  if (units === 'imperial') {
    return `${Math.round(kgToLb(kg))} lb`;
  }
  return `${Math.round(kg * 10) / 10} kg`;
}

/**
 * Converts a number the user typed (in their unit system) to the metric
 * value we store. `dimension` decides which conversion applies.
 */
export function inputToMetric(value: number, dimension: 'length' | 'weight', units: UnitSystem): number {
  if (units === 'metric') return value;
  return dimension === 'weight' ? lbToKg(value) : inToCm(value);
}

/** Converts a stored metric value to the user's unit system for editing. */
export function metricToInput(value: number, dimension: 'length' | 'weight', units: UnitSystem): number {
  if (units === 'metric') return value;
  const converted = dimension === 'weight' ? kgToLb(value) : cmToIn(value);
  return Math.round(converted * 10) / 10;
}
