// ===== Data model =====
// Canonical rules:
// - everything is stored METRIC (cm/kg) — units are a display concern
// - timestamps are ISO 8601 strings
// - keys/ids are English; display names come from i18n

import { ShoeSizeSystem } from '../domain/sizing/shoeSize';
import { MeasurementKey } from '../domain/sizing/types';

/** Kinds of gear a player can own. Display names live in i18n. */
export type GearType =
  | 'helmet'
  | 'neckGuard'
  | 'shoulderPads'
  | 'elbowPads'
  | 'gloves'
  | 'pants'
  | 'shinGuards'
  | 'skates'
  | 'stick'
  | 'jock'
  | 'bag'
  | 'other';

export const GEAR_TYPES: GearType[] = [
  'helmet',
  'neckGuard',
  'shoulderPads',
  'elbowPads',
  'gloves',
  'pants',
  'shinGuards',
  'skates',
  'stick',
  'jock',
  'bag',
  'other',
];

/** One family member (usually a kid) with their own gear and measurements. */
export interface Profile {
  id: string;
  name: string;
  /** Avatar accent color, one of theme's profile colors. */
  iconColor: string;
  createdAt: string;
}

export interface GearItem {
  id: string;
  profileId: string;
  type: GearType;
  /** Brand as free text or a known brand name (e.g. "Bauer"). */
  brand: string;
  /** Size exactly as printed on the gear, e.g. '12"' or "Junior M". */
  size: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * One measuring session. Append-only: saving measurements creates a new
 * record, which is what makes growth history possible. Values are partial —
 * remeasuring only the foot is fine.
 */
export interface MeasurementRecord {
  id: string;
  profileId: string;
  takenAt: string;
  /** Metric values (cm; weight in kg). */
  values: Partial<Record<MeasurementKey, number>>;
  /** Fallback when the foot has not been measured. */
  shoeSize?: { system: ShoeSizeSystem; value: number };
}
