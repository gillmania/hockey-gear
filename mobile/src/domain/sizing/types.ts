// ===== Sizing engine types =====
// Ported from the original web app's storleksguide.js.
// The core idea: the user enters body measurements ONCE, and every brand's
// config maps the right measurement + size table + adjustments, because
// brands measure differently (Bauer/CCM by circumference, Warrior by height).
//
// IMPORTANT: never invent numbers — every table must come from the brand's
// official size chart. Each brand file cites its source in the header comment.

/** An inclusive range "from min to max". Use Infinity for "and up". */
export type Range = readonly [min: number, max: number];

/** Body measurements the app tracks. All in cm, except weight (kg). */
export type MeasurementKey =
  | 'height'
  | 'weight'
  | 'chest'
  | 'forearm'
  | 'waist'
  | 'shin'
  | 'hand'
  | 'foot'
  | 'head';

/** The fields a size row can match against. Metric, like everything stored. */
export type RangeField = 'weightKg' | 'heightCm' | 'chestCm' | 'forearmCm' | 'waistCm' | 'valueCm';

/**
 * One size (Youth S, Junior M, '12"' ...) with its measurement ranges.
 * A null/missing field means the brand's chart has no value for that size.
 */
export interface SizeRow {
  /** Size label exactly as the brand prints it, e.g. "Junior M" or '12"'. */
  name: string;
  /** Optional age hint from the chart, e.g. "10–11". */
  ageRange?: string;
  weightKg?: Range | null;
  heightCm?: Range | null;
  chestCm?: Range | null;
  forearmCm?: Range | null;
  waistCm?: Range | null;
  /** Generic single-measurement tables (shin guards, gloves, helmets). */
  valueCm?: Range | null;
}

/** Skate tables map a foot length to a size (point table, not ranges). */
export interface SkateRow {
  /** Foot length in cm this size fits up to (heel to longest toe). */
  footLengthCm: number;
  /** Skate size label, e.g. "Junior 3". */
  name: string;
  /** Runner (blade holder) length in mm, when the brand publishes it. */
  runnerMm: number | null;
}

/** Equipment parts a brand can offer size guidance for. */
export type GearPart =
  | 'helmet'
  | 'general' // general apparel size (jersey etc.)
  | 'shoulderPads'
  | 'elbowPads'
  | 'pants'
  | 'shinGuards'
  | 'gloves'
  | 'skates';

/**
 * How one brand sizes one equipment part:
 * which measurement to read, which table to look in, and any adjustment
 * for the brand's measuring method (e.g. CCM measures shin to the skate
 * boot top, ~5.5 cm shorter than Bauer's kneecap-to-ankle-bone method).
 */
export type PartConfig =
  | {
      kind: 'range';
      measurement: MeasurementKey;
      table: SizeRow[];
      field: RangeField;
      /** Cm subtracted from the measured value before lookup. */
      adjustmentCm?: number;
      /** i18n key for a short explanatory note shown next to the suggestion. */
      noteKey?: string;
    }
  | {
      kind: 'skate';
      measurement: 'foot';
      table: SkateRow[];
      noteKey?: string;
    };

export interface BrandConfig {
  id: string;
  /** Brand name as displayed, e.g. "Bauer". */
  name: string;
  parts: Partial<Record<GearPart, PartConfig>>;
}

/** Result of a size lookup. exact=false means "nearest match, approximate". */
export interface SizeMatch<Row> {
  row: Row;
  exact: boolean;
}
