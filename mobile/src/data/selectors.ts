// ===== Pure selectors over the stored data =====
// Kept free of React/zustand imports so they can be unit-tested directly.

import { HistoryPoint } from '../domain/sizing/outgrowing';
import { ShoeSizeValue, Measurements } from '../domain/sizing/suggest';
import { MeasurementKey } from '../domain/sizing/types';
import { MeasurementRecord } from './schema';

function sortedByTime(records: MeasurementRecord[]): MeasurementRecord[] {
  return [...records].sort((a, b) => a.takenAt.localeCompare(b.takenAt));
}

/**
 * The profile's CURRENT measurements: records merged oldest→newest, so the
 * latest record that contains a value wins per key. This lets the user
 * remeasure just the foot without retyping everything else.
 */
export function currentMeasurements(records: MeasurementRecord[], profileId: string): Measurements {
  const merged: Measurements = {};
  for (const record of sortedByTime(records)) {
    if (record.profileId !== profileId) continue;
    Object.assign(merged, record.values);
  }
  return merged;
}

/** The profile's most recent shoe size entry, if any. */
export function currentShoeSize(records: MeasurementRecord[], profileId: string): ShoeSizeValue | null {
  let latest: ShoeSizeValue | null = null;
  for (const record of sortedByTime(records)) {
    if (record.profileId !== profileId) continue;
    if (record.shoeSize) latest = record.shoeSize;
  }
  return latest;
}

/** Chronological history for one measurement, e.g. every recorded height. */
export function measurementHistory(
  records: MeasurementRecord[],
  profileId: string,
  key: MeasurementKey,
): HistoryPoint[] {
  const points: HistoryPoint[] = [];
  for (const record of sortedByTime(records)) {
    if (record.profileId !== profileId) continue;
    const value = record.values[key];
    if (value != null) {
      points.push({ takenAt: record.takenAt, value });
    }
  }
  return points;
}
