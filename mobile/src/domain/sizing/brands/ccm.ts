// ===== CCM =====
// Sources (as documented in the original storleksguide.js):
// - Protective sizes: CCM's official size guide (via monkeysportseurope.com).
// - Helmet sizes: CCM Tacks 910 chart.
// - Gloves + skates: SkatePro's CCM charts.
// All values transcribed from the charts — do not invent numbers.
// NOTE: CCM's pant chart uses the true waist measurement (no adjustment,
// unlike Bauer). CCM's shin chart measures kneecap → top of the skate boot,
// ~5.5 cm shorter than Bauer's kneecap → ankle bone method, hence the
// adjustmentCm on shinGuards below.

import { BrandConfig, SizeRow, SkateRow } from '../types';

export const CCM_APPAREL: SizeRow[] = [
  { name: 'Youth S',   weightKg: null, heightCm: [102, 109],      chestCm: [58, 58],        forearmCm: [11, 15],       waistCm: [51, 55] },
  { name: 'Youth M',   weightKg: null, heightCm: [109, 117],      chestCm: [58, 64],        forearmCm: [14, 17],       waistCm: [53, 57] },
  { name: 'Youth L',   weightKg: null, heightCm: [117, 127],      chestCm: [60, 70],        forearmCm: [15, 19],       waistCm: [56, 60] },
  { name: 'Junior S',  weightKg: null, heightCm: [127, 137],      chestCm: [60, 76],        forearmCm: [16, 20],       waistCm: [58, 64] },
  { name: 'Junior M',  weightKg: null, heightCm: [137, 147],      chestCm: [67, 81],        forearmCm: [18, 22],       waistCm: [62, 72] },
  { name: 'Junior L',  weightKg: null, heightCm: [147, 157],      chestCm: [75, 89],        forearmCm: [20, 25],       waistCm: [69, 79] },
  { name: 'Junior XL', weightKg: null, heightCm: null,            chestCm: null,            forearmCm: null,           waistCm: [69, 74] },
  { name: 'Senior S',  weightKg: null, heightCm: [157, 168],      chestCm: [86, 97],        forearmCm: [23, 27],       waistCm: [74, 82] },
  { name: 'Senior M',  weightKg: null, heightCm: [168, 178],      chestCm: [94, 104],       forearmCm: [25, 29],       waistCm: [79, 89] },
  { name: 'Senior L',  weightKg: null, heightCm: [178, 188],      chestCm: [102, 112],      forearmCm: [28, 32],       waistCm: [86, 99] },
  { name: 'Senior XL', weightKg: null, heightCm: [183, Infinity], chestCm: [109, 122],      forearmCm: [29, Infinity], waistCm: [95, 107] },
];

// Shin guards: tibia in cm → inch size. See the measuring-method note above.
export const CCM_SHIN_GUARDS: SizeRow[] = [
  { name: '8"',  valueCm: [20, 23] },
  { name: '9"',  valueCm: [23, 25] },
  { name: '10"', valueCm: [25, 28] },
  { name: '11"', valueCm: [28, 30] },
  { name: '12"', valueCm: [30, 33] },
  { name: '13"', valueCm: [33, 36] },
  { name: '14"', valueCm: [36, 38] },
  { name: '15"', valueCm: [38, 41] },
  { name: '16"', valueCm: [41, 43] },
  { name: '17"', valueCm: [43, 46] },
];

// Helmet: head circumference (cm) → size (CCM Tacks 910 chart).
// NOTE: helmets are adjustable and vary between models — always try on.
export const CCM_HELMETS: SizeRow[] = [
  { name: 'X-Small', valueCm: [51.5, 55.5] },
  { name: 'Small',   valueCm: [52.5, 57] },
  { name: 'Medium',  valueCm: [55.5, 60] },
  { name: 'Large',   valueCm: [58.5, 63] },
];

// Gloves: hand length (middle fingertip to wrist) in cm → inch size. Source: SkatePro.
export const CCM_GLOVES: SizeRow[] = [
  { name: '8"',  valueCm: [10.5, 13] },
  { name: '9"',  valueCm: [11.5, 14] },
  { name: '10"', valueCm: [13, 15.5] },
  { name: '11"', valueCm: [14, 16.5] },
  { name: '12"', valueCm: [15.5, 18] },
  { name: '13"', valueCm: [16.5, 19] },
  { name: '14"', valueCm: [18, 20.5] },
  { name: '15"', valueCm: [19, 22] },
];

// Skates: foot length (cm) → skate size. Source: SkatePro.
// CCM does not publish runner lengths, hence runnerMm: null.
export const CCM_SKATES: SkateRow[] = [
  { footLengthCm: 14.5, name: 'Youth 6',    runnerMm: null },
  { footLengthCm: 15.2, name: 'Youth 7',    runnerMm: null },
  { footLengthCm: 16.2, name: 'Youth 8',    runnerMm: null },
  { footLengthCm: 17.0, name: 'Youth 9',    runnerMm: null },
  { footLengthCm: 17.4, name: 'Youth 9.5',  runnerMm: null },
  { footLengthCm: 17.8, name: 'Youth 10',   runnerMm: null },
  { footLengthCm: 18.2, name: 'Youth 10.5', runnerMm: null },
  { footLengthCm: 18.7, name: 'Youth 11',   runnerMm: null },
  { footLengthCm: 19.1, name: 'Youth 11.5', runnerMm: null },
  { footLengthCm: 19.5, name: 'Youth 12',   runnerMm: null },
  { footLengthCm: 19.9, name: 'Youth 12.5', runnerMm: null },
  { footLengthCm: 20.3, name: 'Youth 13',   runnerMm: null },
  { footLengthCm: 20.6, name: 'Youth 13.5', runnerMm: null },
  { footLengthCm: 21.0, name: 'Junior 1',   runnerMm: null },
  { footLengthCm: 21.4, name: 'Junior 1.5', runnerMm: null },
  { footLengthCm: 21.8, name: 'Junior 2',   runnerMm: null },
  { footLengthCm: 22.2, name: 'Junior 2.5', runnerMm: null },
  { footLengthCm: 22.6, name: 'Junior 3',   runnerMm: null },
  { footLengthCm: 23.1, name: 'Junior 3.5', runnerMm: null },
  { footLengthCm: 23.5, name: 'Junior 4',   runnerMm: null },
  { footLengthCm: 23.9, name: 'Junior 4.5', runnerMm: null },
  { footLengthCm: 24.3, name: 'Junior 5',   runnerMm: null },
  { footLengthCm: 24.7, name: 'Junior 5.5', runnerMm: null },
  { footLengthCm: 25.1, name: 'Senior 6',   runnerMm: null },
  { footLengthCm: 25.5, name: 'Senior 6.5', runnerMm: null },
  { footLengthCm: 26.0, name: 'Senior 7',   runnerMm: null },
  { footLengthCm: 26.4, name: 'Senior 7.5', runnerMm: null },
  { footLengthCm: 26.8, name: 'Senior 8',   runnerMm: null },
  { footLengthCm: 27.2, name: 'Senior 8.5', runnerMm: null },
  { footLengthCm: 27.7, name: 'Senior 9',   runnerMm: null },
  { footLengthCm: 28.1, name: 'Senior 9.5', runnerMm: null },
  { footLengthCm: 28.5, name: 'Senior 10',  runnerMm: null },
  { footLengthCm: 28.9, name: 'Senior 10.5', runnerMm: null },
  { footLengthCm: 29.4, name: 'Senior 11',  runnerMm: null },
  { footLengthCm: 29.8, name: 'Senior 11.5', runnerMm: null },
  { footLengthCm: 30.2, name: 'Senior 12',  runnerMm: null },
];

export const ccm: BrandConfig = {
  id: 'ccm',
  name: 'CCM',
  parts: {
    helmet:       { kind: 'range', measurement: 'head',    table: CCM_HELMETS,     field: 'valueCm' },
    general:      { kind: 'range', measurement: 'height',  table: CCM_APPAREL,     field: 'heightCm' },
    shoulderPads: { kind: 'range', measurement: 'chest',   table: CCM_APPAREL,     field: 'chestCm' },
    elbowPads:    { kind: 'range', measurement: 'forearm', table: CCM_APPAREL,     field: 'forearmCm' },
    pants:        { kind: 'range', measurement: 'waist',   table: CCM_APPAREL,     field: 'waistCm' },
    shinGuards:   { kind: 'range', measurement: 'shin',    table: CCM_SHIN_GUARDS, field: 'valueCm', adjustmentCm: 5.5, noteKey: 'sizing.notes.ccmShin' },
    gloves:       { kind: 'range', measurement: 'hand',    table: CCM_GLOVES,      field: 'valueCm' },
    skates:       { kind: 'skate', measurement: 'foot',    table: CCM_SKATES },
  },
};
