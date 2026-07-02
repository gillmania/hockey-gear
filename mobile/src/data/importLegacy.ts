// ===== Import from the old web app =====
// The old PWA stores everything in localStorage under Swedish keys/values.
// Its "Exportera min data" button produces JSON like:
//   { exportVersion: 1,
//     hockeyGear: [{ typ, storlek, marke, anteckning }, ...],
//     hockeyMeasurements: { langd, vikt, brost, underarm, midja,
//                           skenben, handlangd, fotlangd, skostorlek, huvud } }
// This module maps that into the new model. Numbers arrive as strings
// (they came from <input> fields) — parse defensively.

import { GearType } from './schema';
import { MeasurementKey } from '../domain/sizing/types';

/** Old Swedish gear-type labels → new English keys. */
const GEAR_TYPE_MAP: Record<string, GearType> = {
  'Hjälm': 'helmet',
  'Halsskydd': 'neckGuard',
  'Axelskydd': 'shoulderPads',
  'Armbågsskydd': 'elbowPads',
  'Handskar': 'gloves',
  'Hockeybyxa': 'pants',
  'Benskydd': 'shinGuards',
  'Skridskor': 'skates',
  'Klubba': 'stick',
  'Suspensoar': 'jock',
  'Hockeyväska': 'bag',
  'Annat': 'other',
};

/** Old measurement field ids → new keys. */
const MEASUREMENT_MAP: Record<string, MeasurementKey> = {
  langd: 'height',
  vikt: 'weight',
  brost: 'chest',
  underarm: 'forearm',
  midja: 'waist',
  skenben: 'shin',
  handlangd: 'hand',
  fotlangd: 'foot',
  huvud: 'head',
};

export interface LegacyImportResult {
  gear: { type: GearType; brand: string; size: string; note?: string }[];
  /** Metric values, ready for one MeasurementRecord. */
  values: Partial<Record<MeasurementKey, number>>;
  /** The old app only knew EU shoe sizes. */
  shoeSize: { system: 'eu'; value: number } | null;
}

function parseValue(raw: unknown): number | null {
  if (typeof raw === 'number') return Number.isNaN(raw) ? null : raw;
  if (typeof raw !== 'string' || raw.trim() === '') return null;
  const value = parseFloat(raw.replace(',', '.'));
  return Number.isNaN(value) ? null : value;
}

/**
 * Parses a pasted legacy export. Throws on malformed input — the import
 * screen turns that into a friendly error message.
 */
export function parseLegacyExport(text: string): LegacyImportResult {
  const data: unknown = JSON.parse(text);
  if (typeof data !== 'object' || data === null) {
    throw new Error('not an object');
  }
  const payload = data as {
    hockeyGear?: unknown;
    hockeyMeasurements?: unknown;
  };

  if (!Array.isArray(payload.hockeyGear) && typeof payload.hockeyMeasurements !== 'object') {
    throw new Error('unrecognized export');
  }

  const gear: LegacyImportResult['gear'] = [];
  if (Array.isArray(payload.hockeyGear)) {
    for (const raw of payload.hockeyGear) {
      if (typeof raw !== 'object' || raw === null) continue;
      const item = raw as { typ?: unknown; storlek?: unknown; marke?: unknown; anteckning?: unknown };
      const size = typeof item.storlek === 'string' ? item.storlek : '';
      if (!size) continue; // size was required in the old app; skip junk rows
      gear.push({
        type: GEAR_TYPE_MAP[String(item.typ)] ?? 'other',
        brand: typeof item.marke === 'string' ? item.marke : '',
        size,
        note: typeof item.anteckning === 'string' && item.anteckning ? item.anteckning : undefined,
      });
    }
  }

  const values: LegacyImportResult['values'] = {};
  let shoeSize: LegacyImportResult['shoeSize'] = null;
  if (typeof payload.hockeyMeasurements === 'object' && payload.hockeyMeasurements !== null) {
    const measurements = payload.hockeyMeasurements as Record<string, unknown>;
    for (const [oldKey, newKey] of Object.entries(MEASUREMENT_MAP)) {
      const value = parseValue(measurements[oldKey]);
      if (value != null) values[newKey] = value;
    }
    const shoe = parseValue(measurements.skostorlek);
    if (shoe != null) shoeSize = { system: 'eu', value: shoe };
  }

  return { gear, values, shoeSize };
}
