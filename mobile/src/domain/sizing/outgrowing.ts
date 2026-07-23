// ===== "Outgrowing soon" indicator =====
// Reuses the size-range tables: when a measurement sits near the top of its
// matched range, the next size is around the corner. With measurement
// history we can also estimate WHEN, using the recent growth rate.

import { Range, SizeRow, SkateRow } from './types';

/** Above this fraction of the range we warn that the size is almost outgrown. */
export const OUTGROWING_FRACTION = 0.8;

/** For skates: warn when the next size's foot length is this close (cm). */
export const SKATE_MARGIN_CM = 0.4;

/** Only show a time estimate when it is this close (months). */
export const TREND_MONTHS_LIMIT = 3;

export type OutgrowStatus = 'ok' | 'outgrowing-soon' | 'outgrown';

/**
 * Status for a value matched against a range (e.g. height in Junior M's
 * 140–150 cm). `hasLargerSize` should be false for the chart's largest size —
 * there is nothing to grow into, so no badge.
 */
export function rangeStatus(value: number, range: Range, hasLargerSize: boolean): OutgrowStatus {
  const [min, max] = range;
  if (value > max) {
    return 'outgrown';
  }
  if (!hasLargerSize || !Number.isFinite(max)) {
    return 'ok'; // Largest size, or open-ended range ("and up").
  }
  const fraction = (value - min) / (max - min);
  return fraction >= OUTGROWING_FRACTION ? 'outgrowing-soon' : 'ok';
}

/**
 * Status for a skate match: the table is points (foot length per size),
 * so we warn when the foot is within SKATE_MARGIN_CM of the matched size's
 * upper foot length.
 */
export function skateStatus(footLengthCm: number, matchedRow: SkateRow, hasLargerSize: boolean): OutgrowStatus {
  if (footLengthCm > matchedRow.footLengthCm) {
    return 'outgrown';
  }
  if (!hasLargerSize) {
    return 'ok';
  }
  return matchedRow.footLengthCm - footLengthCm <= SKATE_MARGIN_CM ? 'outgrowing-soon' : 'ok';
}

/** Does the table hold a size larger than the given row? */
export function hasLargerRangeSize(rows: SizeRow[], row: SizeRow): boolean {
  return rows.indexOf(row) < rows.length - 1;
}

export function hasLargerSkateSize(rows: SkateRow[], row: SkateRow): boolean {
  return rows.indexOf(row) < rows.length - 1;
}

export interface HistoryPoint {
  /** ISO timestamp of when the measurement was taken. */
  takenAt: string;
  value: number;
}

const MS_PER_MONTH = 1000 * 60 * 60 * 24 * 30.44;

/**
 * Estimates months until `value` passes `max`, from the growth rate between
 * the two most recent history points. Returns null when history is too thin,
 * growth is zero/negative (kids don't shrink — treat as no trend), or the
 * estimate is further away than TREND_MONTHS_LIMIT.
 */
export function monthsUntilOutgrown(history: HistoryPoint[], max: number): number | null {
  if (history.length < 2 || !Number.isFinite(max)) {
    return null;
  }

  const sorted = [...history].sort((a, b) => a.takenAt.localeCompare(b.takenAt));
  const prev = sorted[sorted.length - 2];
  const last = sorted[sorted.length - 1];

  const months = (new Date(last.takenAt).getTime() - new Date(prev.takenAt).getTime()) / MS_PER_MONTH;
  if (months <= 0) {
    return null;
  }
  const rate = (last.value - prev.value) / months; // cm (or kg) per month
  if (rate <= 0) {
    return null;
  }

  const monthsLeft = (max - last.value) / rate;
  if (monthsLeft < 0 || monthsLeft > TREND_MONTHS_LIMIT) {
    return null;
  }
  return Math.max(1, Math.round(monthsLeft));
}
