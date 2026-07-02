// ===== Size suggestions =====
// The calculation half of the original app's visaForslag(): given a brand
// and the profile's measurements, work out the suggested size for each
// equipment part. Rendering lives in the UI; this module is pure logic.

import { findSize, findSkateSize } from './findSize';
import { ShoeSizeSystem, shoeSizeToFootLength } from './shoeSize';
import { BrandConfig, GearPart, MeasurementKey, SizeMatch, SizeRow, SkateRow } from './types';

/** Display order for the suggestion list, same as the original app. */
export const PART_ORDER: GearPart[] = [
  'helmet',
  'general',
  'shoulderPads',
  'elbowPads',
  'pants',
  'shinGuards',
  'gloves',
  'skates',
];

export interface Suggestion {
  part: GearPart;
  /** null = could not suggest (missing measurement or no guide). */
  sizeLabel: string | null;
  /** false = nearest match or estimated from shoe size — show "approximate". */
  exact: boolean;
  /** True when the skate size was estimated from shoe size, not a measured foot. */
  fromShoeSize: boolean;
  /** Runner (blade) length in mm — skates only, when the brand publishes it. */
  runnerMm: number | null;
  /** i18n key for a brand note (e.g. CCM's shin measuring method). */
  noteKey: string | null;
  /** The measurement the user needs to fill in, when sizeLabel is null. */
  missingMeasurement: MeasurementKey | null;
  /** True when the brand has no guide at all for this part. */
  unavailable: boolean;
  /** The matched range row — used by the outgrowing indicator. */
  match: SizeMatch<SizeRow> | SizeMatch<SkateRow> | null;
  /** The measured value used for the lookup (after adjustment), metric. */
  lookupValue: number | null;
}

export type Measurements = Partial<Record<MeasurementKey, number>>;

export interface ShoeSizeValue {
  system: ShoeSizeSystem;
  value: number;
}

/** Computes the suggestion for one equipment part. */
export function suggestForPart(
  brand: BrandConfig,
  part: GearPart,
  measurements: Measurements,
  shoeSize?: ShoeSizeValue | null,
): Suggestion {
  const base: Suggestion = {
    part,
    sizeLabel: null,
    exact: false,
    fromShoeSize: false,
    runnerMm: null,
    noteKey: null,
    missingMeasurement: null,
    unavailable: false,
    match: null,
    lookupValue: null,
  };

  const config = brand.parts[part];
  if (!config) {
    // The brand has no guide for this part (e.g. Warrior has no helmet chart).
    return { ...base, unavailable: true };
  }

  base.noteKey = config.noteKey ?? null;

  if (config.kind === 'skate') {
    // Skates: foot length → size + runner length. Falls back to shoe size.
    let foot: number | null = measurements.foot ?? null;
    let fromShoeSize = false;
    if (foot == null && shoeSize) {
      foot = shoeSizeToFootLength(shoeSize.value, shoeSize.system);
      fromShoeSize = true;
    }
    if (foot == null) {
      return { ...base, missingMeasurement: config.measurement };
    }

    const match = findSkateSize(foot, config.table);
    if (!match) {
      return { ...base, missingMeasurement: config.measurement };
    }
    return {
      ...base,
      sizeLabel: match.row.name,
      exact: match.exact && !fromShoeSize,
      fromShoeSize,
      runnerMm: match.row.runnerMm,
      match,
      lookupValue: foot,
    };
  }

  // Range parts: take the measurement, subtract any brand adjustment, look up.
  const raw = measurements[config.measurement];
  if (raw == null) {
    return { ...base, missingMeasurement: config.measurement };
  }
  const value = config.adjustmentCm ? raw - config.adjustmentCm : raw;

  const match = findSize(value, config.table, config.field);
  if (!match) {
    return { ...base, missingMeasurement: config.measurement };
  }
  return {
    ...base,
    sizeLabel: match.row.name,
    exact: match.exact,
    match,
    lookupValue: value,
  };
}

/** Computes suggestions for every part, in display order. */
export function suggestAll(
  brand: BrandConfig,
  measurements: Measurements,
  shoeSize?: ShoeSizeValue | null,
): Suggestion[] {
  return PART_ORDER.map((part) => suggestForPart(brand, part, measurements, shoeSize));
}
