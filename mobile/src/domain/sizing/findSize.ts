// ===== Size lookup =====
// Ported from hittaStorlek/hittaSkridsko in the original storleksguide.js.
// The logic is unchanged: exact range match first, nearest match as fallback
// (so the user always gets a suggestion, marked as approximate).

import { RangeField, SizeMatch, SizeRow, SkateRow } from './types';

/**
 * Finds the size row where `value` fits the range in `field`.
 * Returns null when no value is given. If no range contains the value,
 * the nearest row is returned with exact=false.
 */
export function findSize(
  value: number | null | undefined,
  rows: SizeRow[],
  field: RangeField,
): SizeMatch<SizeRow> | null {
  if (value == null || Number.isNaN(value)) {
    return null; // No measurement entered yet.
  }

  let nearest: SizeRow | null = null;
  let nearestDistance = Infinity;

  for (const row of rows) {
    const range = row[field];
    if (!range) {
      continue; // This size has no value for that measurement.
    }

    const [min, max] = range;

    // Fits inside the range? Perfect match.
    if (value >= min && value <= max) {
      return { row, exact: true };
    }

    // Otherwise: how far off are we? Remember the nearest row.
    const distance = value < min ? min - value : value - max;
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearest = row;
    }
  }

  return nearest ? { row: nearest, exact: false } : null;
}

/**
 * Finds the right skate size for a foot length.
 * Skates must fit the whole foot, so we pick the smallest size whose
 * foot length is big enough (rounding up).
 */
export function findSkateSize(
  footLengthCm: number | null | undefined,
  rows: SkateRow[],
): SizeMatch<SkateRow> | null {
  if (footLengthCm == null || Number.isNaN(footLengthCm) || rows.length === 0) {
    return null; // No foot length entered yet.
  }

  for (const row of rows) {
    if (row.footLengthCm >= footLengthCm) {
      return { row, exact: true };
    }
  }

  // Foot is bigger than the whole table — take the largest size (approximate).
  return { row: rows[rows.length - 1], exact: false };
}
