// ===== Outgrow status for OWNED gear =====
// If a gear item's brand+size matches a row in the brand's chart, we can
// compare the profile's current measurement against that row and warn when
// the item is getting too small — the automatic version of the old app's
// hand-written "börjar bli liten" note.

import {
  hasLargerRangeSize,
  hasLargerSkateSize,
  OutgrowStatus,
  rangeStatus,
  skateStatus,
} from './outgrowing';
import { brandByName } from './brands';
import { Measurements } from './suggest';
import { GearPart } from './types';

/** Which sizing part applies to each owned gear type (subset that has charts). */
export const GEAR_TYPE_TO_PART: Partial<Record<string, GearPart>> = {
  helmet: 'helmet',
  shoulderPads: 'shoulderPads',
  elbowPads: 'elbowPads',
  pants: 'pants',
  shinGuards: 'shinGuards',
  gloves: 'gloves',
  skates: 'skates',
};

/**
 * Returns the outgrow status for an owned item, or null when it cannot be
 * determined (unknown brand, size not in the chart, measurement missing).
 */
export function gearOutgrowStatus(
  gearType: string,
  brandName: string,
  size: string,
  measurements: Measurements,
): OutgrowStatus | null {
  const brand = brandByName(brandName);
  const part = GEAR_TYPE_TO_PART[gearType];
  if (!brand || !part) return null;

  const config = brand.parts[part];
  if (!config) return null;

  if (config.kind === 'skate') {
    const row = config.table.find((r) => r.name === size);
    const foot = measurements.foot;
    if (!row || foot == null) return null;
    return skateStatus(foot, row, hasLargerSkateSize(config.table, row));
  }

  const row = config.table.find((r) => r.name === size);
  if (!row) return null;
  const range = row[config.field];
  const raw = measurements[config.measurement];
  if (!range || raw == null) return null;

  const value = config.adjustmentCm ? raw - config.adjustmentCm : raw;
  return rangeStatus(value, range, hasLargerRangeSize(config.table, row));
}
