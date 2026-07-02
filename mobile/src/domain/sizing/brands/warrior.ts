// ===== Warrior =====
// Source (as documented in the original storleksguide.js): Warrior's size
// guide via intersport.se. Warrior sizes everything by HEIGHT (cm), not by
// circumference or shin length. The guide only covers shoulder pads, elbow
// pads and shin guards. Sizes overlap between age groups (Minior/Junior/
// Int/Senior), which is why the names are age-tagged.

import { BrandConfig, SizeRow } from '../types';

// Shoulder pads AND elbow pads use the same height table at Warrior.
export const WARRIOR_SHOULDER: SizeRow[] = [
  { name: 'Minior S',  heightCm: [99, 124] },
  { name: 'Minior L',  heightCm: [111, 135] },
  { name: 'Junior S',  heightCm: [129, 142] },
  { name: 'Junior L',  heightCm: [137, 155] },
  { name: 'Int S',     heightCm: [152, 165] },
  { name: 'Int L',     heightCm: [163, 175] },
  { name: 'Senior S',  heightCm: [163, 175] },
  { name: 'Senior M',  heightCm: [168, 183] },
  { name: 'Senior L',  heightCm: [175, 188] },
  { name: 'Senior XL', heightCm: [175, 188] },
];

// Shin guards: inch size by height (cm).
export const WARRIOR_SHIN_GUARDS: SizeRow[] = [
  { name: '8"',  heightCm: [102, 112] },
  { name: '9"',  heightCm: [112, 122] },
  { name: '10"', heightCm: [122, 134] },
  { name: '11"', heightCm: [132, 142] },
  { name: '12"', heightCm: [142, 158] },
  { name: '13"', heightCm: [158, 168] },
  { name: '14"', heightCm: [170, 178] },
  { name: '15"', heightCm: [170, 178] },
  { name: '16"', heightCm: [178, 188] },
  { name: '17"', heightCm: [183, Infinity] },
];

export const warrior: BrandConfig = {
  id: 'warrior',
  name: 'Warrior',
  parts: {
    general:      { kind: 'range', measurement: 'height', table: WARRIOR_SHOULDER,    field: 'heightCm' },
    shoulderPads: { kind: 'range', measurement: 'height', table: WARRIOR_SHOULDER,    field: 'heightCm' },
    elbowPads:    { kind: 'range', measurement: 'height', table: WARRIOR_SHOULDER,    field: 'heightCm' },
    shinGuards:   { kind: 'range', measurement: 'height', table: WARRIOR_SHIN_GUARDS, field: 'heightCm' },
  },
};
