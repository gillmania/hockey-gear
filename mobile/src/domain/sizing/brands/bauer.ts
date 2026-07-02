// ===== Bauer =====
// Sources (as documented in the original storleksguide.js):
// - Protective sizes: Bauer's official "Bauer Protective Equipment" chart.
// - Skate sizes + runner lengths: Bauer's TUUK runner chart.
// - Helmet sizes: Bauer's helmet guide (via hockeymonkey.com).
// All values transcribed from the official charts — do not invent numbers.
// weightKg = kg, heightCm/chestCm/forearmCm/waistCm = cm. null = the chart
// has no value for that size.

import { BrandConfig, SizeRow, SkateRow } from '../types';

export const BAUER_APPAREL: SizeRow[] = [
  { name: 'Youth S',        ageRange: '3–5',   weightKg: [14, 19],  heightCm: [91, 107],  chestCm: [51, 56],        forearmCm: [15, 18], waistCm: [48, 53] },
  { name: 'Youth M',        ageRange: '5–7',   weightKg: [18, 24],  heightCm: [104, 119], chestCm: [56, 61],        forearmCm: [16, 19], waistCm: [51, 56] },
  { name: 'Youth L',        ageRange: '7–9',   weightKg: [23, 29],  heightCm: [117, 135], chestCm: [59, 64],        forearmCm: [18, 23], waistCm: [54, 62] },
  { name: 'Junior S',       ageRange: '8–10',  weightKg: [24, 31],  heightCm: [127, 142], chestCm: [61, 66],        forearmCm: [20, 23], waistCm: [56, 64] },
  { name: 'Junior M',       ageRange: '10–11', weightKg: [30, 36],  heightCm: [140, 150], chestCm: [66, 71],        forearmCm: [22, 25], waistCm: [62, 72] },
  { name: 'Junior L',       ageRange: '11–13', weightKg: [36, 45],  heightCm: [147, 165], chestCm: null,            forearmCm: null,     waistCm: null },
  { name: 'Intermediate M', ageRange: '11–13', weightKg: [36, 45],  heightCm: [147, 165], chestCm: [71, 81],        forearmCm: [24, 27], waistCm: [71, 80] },
  { name: 'Intermediate L', ageRange: '13+',   weightKg: [45, 68],  heightCm: [165, 175], chestCm: [81, 102],       forearmCm: [26, 29], waistCm: [76, 86] },
  { name: 'Senior M',       ageRange: '14+',   weightKg: [59, 77],  heightCm: [170, 180], chestCm: [97, 107],       forearmCm: [27, 32], waistCm: [81, 91] },
  { name: 'Senior L',       ageRange: '15+',   weightKg: [68, 86],  heightCm: [175, 185], chestCm: [102, 112],      forearmCm: [29, 34], waistCm: [86, 97] },
  { name: 'Senior XL',      ageRange: '15+',   weightKg: [77, 95],  heightCm: [180, 195], chestCm: [107, 117],      forearmCm: [32, 37], waistCm: [91, 102] },
  { name: 'Senior XXL',     ageRange: '15+',   weightKg: [86, 104], heightCm: [185, 200], chestCm: [112, Infinity], forearmCm: null,     waistCm: [97, 107] },
  { name: 'Senior XXXL',    ageRange: '15+',   weightKg: [95, Infinity], heightCm: [191, Infinity], chestCm: [112, Infinity], forearmCm: null, waistCm: [102, Infinity] },
  { name: 'Woman XS',       ageRange: '12+',   weightKg: [41, 50],  heightCm: [140, 155], chestCm: [76, 86],        forearmCm: null,     waistCm: [61, 69] },
  { name: 'Woman S',        ageRange: '12+',   weightKg: [46, 59],  heightCm: [150, 165], chestCm: [81, 91],        forearmCm: null,     waistCm: [66, 74] },
  { name: 'Woman M',        ageRange: '15+',   weightKg: [55, 68],  heightCm: [160, 175], chestCm: [86, 97],        forearmCm: null,     waistCm: [71, 79] },
  { name: 'Woman L',        ageRange: '15+',   weightKg: [64, 77],  heightCm: [170, 185], chestCm: [91, 102],       forearmCm: null,     waistCm: [76, 84] },
];

// Shin guards are sized in inches. valueCm = shin length (kneecap to ankle bone).
export const BAUER_SHIN_GUARDS: SizeRow[] = [
  { name: '8"',  valueCm: [25.5, 28] },
  { name: '9"',  valueCm: [28, 31] },
  { name: '10"', valueCm: [31, 33.5] },
  { name: '11"', valueCm: [33.5, 36] },
  { name: '12"', valueCm: [36, 38.5] },
  { name: '13"', valueCm: [38.5, 41] },
  { name: '14"', valueCm: [41, 43.5] },
  { name: '15"', valueCm: [43.5, 46] },
  { name: '16"', valueCm: [46, 48.5] },
  { name: '17"', valueCm: [48.5, 51.5] },
  { name: '18"', valueCm: [51.5, Infinity] },
];

// Gloves are sized in inches. valueCm = hand length (middle fingertip to wrist).
export const BAUER_GLOVES: SizeRow[] = [
  { name: '8"',  valueCm: [10.5, 13] },
  { name: '9"',  valueCm: [11.5, 14] },
  { name: '10"', valueCm: [13, 15.5] },
  { name: '11"', valueCm: [14, 16.5] },
  { name: '12"', valueCm: [15.5, 18] },
  { name: '13"', valueCm: [16.5, 19] },
  { name: '14"', valueCm: [18, 20.5] },
  { name: '15"', valueCm: [19, 22] },
];

// Skates: foot length (cm) → recommended skate size + runner length (mm).
// runnerMm comes from Bauer's TUUK chart; null = not listed (Youth sizes).
// Sorted from smallest to largest foot.
export const BAUER_SKATES: SkateRow[] = [
  { footLengthCm: 14.5, name: 'Youth 6',    runnerMm: null },
  { footLengthCm: 15.2, name: 'Youth 7',    runnerMm: null },
  { footLengthCm: 16.2, name: 'Youth 8',    runnerMm: null },
  { footLengthCm: 17.0, name: 'Youth 9',    runnerMm: null },
  { footLengthCm: 17.4, name: 'Youth 9.5',  runnerMm: null },
  { footLengthCm: 17.8, name: 'Youth 10',   runnerMm: null },
  { footLengthCm: 18.3, name: 'Youth 10.5', runnerMm: null },
  { footLengthCm: 18.7, name: 'Youth 11',   runnerMm: null },
  { footLengthCm: 19.1, name: 'Youth 11.5', runnerMm: null },
  { footLengthCm: 19.5, name: 'Youth 12',   runnerMm: null },
  { footLengthCm: 19.9, name: 'Youth 12.5', runnerMm: null },
  { footLengthCm: 20.7, name: 'Youth 13.5', runnerMm: null },
  { footLengthCm: 21.0, name: 'Junior 1',   runnerMm: 212 },
  { footLengthCm: 21.4, name: 'Junior 1.5', runnerMm: 212 },
  { footLengthCm: 21.8, name: 'Junior 2',   runnerMm: 221 },
  { footLengthCm: 22.2, name: 'Junior 2.5', runnerMm: 221 },
  { footLengthCm: 22.6, name: 'Junior 3',   runnerMm: 230 },
  { footLengthCm: 23.1, name: 'Junior 3.5', runnerMm: 230 },
  { footLengthCm: 23.5, name: 'Junior 4',   runnerMm: 238 },
  { footLengthCm: 24.3, name: 'Junior 4.5', runnerMm: 238 },
  { footLengthCm: 24.7, name: 'Junior 5',   runnerMm: 246 },
  { footLengthCm: 24.9, name: 'Junior 5.5', runnerMm: 246 },
  { footLengthCm: 25.1, name: 'Senior 6',   runnerMm: 254 },
  { footLengthCm: 25.5, name: 'Senior 6.5', runnerMm: 254 },
  { footLengthCm: 26.0, name: 'Senior 7',   runnerMm: 263 },
  { footLengthCm: 26.4, name: 'Senior 7.5', runnerMm: 263 },
  { footLengthCm: 26.8, name: 'Senior 8',   runnerMm: 272 },
  { footLengthCm: 27.2, name: 'Senior 8.5', runnerMm: 272 },
  { footLengthCm: 27.7, name: 'Senior 9',   runnerMm: 280 },
  { footLengthCm: 28.1, name: 'Senior 9.5', runnerMm: 280 },
  { footLengthCm: 28.5, name: 'Senior 10',  runnerMm: 288 },
  { footLengthCm: 28.9, name: 'Senior 10.5', runnerMm: 288 },
];

// Helmet: head circumference (cm) → size.
// NOTE: helmets are adjustable and vary between models — always try on.
export const BAUER_HELMETS: SizeRow[] = [
  { name: 'Small',  valueCm: [51, 55.5] },
  { name: 'Medium', valueCm: [54.5, 59] },
  { name: 'Large',  valueCm: [57.5, 62] },
];

export const bauer: BrandConfig = {
  id: 'bauer',
  name: 'Bauer',
  parts: {
    helmet:       { kind: 'range', measurement: 'head',    table: BAUER_HELMETS,     field: 'valueCm' },
    general:      { kind: 'range', measurement: 'height',  table: BAUER_APPAREL,     field: 'heightCm' },
    shoulderPads: { kind: 'range', measurement: 'chest',   table: BAUER_APPAREL,     field: 'chestCm' },
    elbowPads:    { kind: 'range', measurement: 'forearm', table: BAUER_APPAREL,     field: 'forearmCm' },
    // Bauer's pant chart expects 7.6 cm (3") less than the true waist measurement.
    pants:        { kind: 'range', measurement: 'waist',   table: BAUER_APPAREL,     field: 'waistCm', adjustmentCm: 7.6 },
    shinGuards:   { kind: 'range', measurement: 'shin',    table: BAUER_SHIN_GUARDS, field: 'valueCm' },
    gloves:       { kind: 'range', measurement: 'hand',    table: BAUER_GLOVES,      field: 'valueCm' },
    skates:       { kind: 'skate', measurement: 'foot',    table: BAUER_SKATES },
  },
};
