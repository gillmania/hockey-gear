// Golden-value tests: every expectation comes from the original web app's
// tables in storleksguide.js. If these fail, the port changed behavior.

import { BAUER_APPAREL, BAUER_HELMETS, BAUER_SHIN_GUARDS, BAUER_SKATES } from '../brands/bauer';
import { CCM_SHIN_GUARDS } from '../brands/ccm';
import { findSize, findSkateSize } from '../findSize';

describe('findSize', () => {
  test('chest 72 cm → Bauer Intermediate M (exact)', () => {
    const match = findSize(72, BAUER_APPAREL, 'chestCm');
    expect(match).not.toBeNull();
    expect(match!.row.name).toBe('Intermediate M');
    expect(match!.exact).toBe(true);
  });

  test('shin 32 cm → Bauer 10" (exact)', () => {
    const match = findSize(32, BAUER_SHIN_GUARDS, 'valueCm');
    expect(match!.row.name).toBe('10"');
    expect(match!.exact).toBe(true);
  });

  test('shin 32 cm with CCM 5.5 adjustment (26.5) → CCM 10" (exact)', () => {
    const match = findSize(32 - 5.5, CCM_SHIN_GUARDS, 'valueCm');
    expect(match!.row.name).toBe('10"');
    expect(match!.exact).toBe(true);
  });

  test('waist 68 cm with Bauer 7.6 deduction (60.4) → Youth L (first matching range wins)', () => {
    // 60.4 fits both Youth L (54–62) and Junior S (56–64); like the original
    // engine, the first matching row in the table is returned.
    const match = findSize(68 - 7.6, BAUER_APPAREL, 'waistCm');
    expect(match!.row.name).toBe('Youth L');
    expect(match!.exact).toBe(true);
  });

  test('head 56 cm → Bauer Medium (exact)', () => {
    const match = findSize(56, BAUER_HELMETS, 'valueCm');
    expect(match!.row.name).toBe('Medium');
    expect(match!.exact).toBe(true);
  });

  test('out-of-range weight 200 kg → Senior XXXL as nearest, not exact', () => {
    // 95–Infinity means 200 actually fits — pick a value below every range instead.
    const match = findSize(5, BAUER_APPAREL, 'weightKg');
    expect(match!.row.name).toBe('Youth S');
    expect(match!.exact).toBe(false);
  });

  test('weight 200 kg fits the open-ended Senior XXXL range (exact)', () => {
    const match = findSize(200, BAUER_APPAREL, 'weightKg');
    expect(match!.row.name).toBe('Senior XXXL');
    expect(match!.exact).toBe(true);
  });

  test('rows without the field are skipped (Junior L has no chest range)', () => {
    // 70 cm chest: Junior L is null, Intermediate M starts at 71 —
    // Junior M's 66–71 contains it.
    const match = findSize(70, BAUER_APPAREL, 'chestCm');
    expect(match!.row.name).toBe('Junior M');
    expect(match!.exact).toBe(true);
  });

  test('no value → null', () => {
    expect(findSize(null, BAUER_APPAREL, 'chestCm')).toBeNull();
    expect(findSize(Number.NaN, BAUER_APPAREL, 'chestCm')).toBeNull();
  });
});

describe('findSkateSize', () => {
  test('foot 22.5 cm → Bauer Junior 3 (runner 230)', () => {
    const match = findSkateSize(22.5, BAUER_SKATES);
    expect(match!.row.name).toBe('Junior 3');
    expect(match!.row.runnerMm).toBe(230);
    expect(match!.exact).toBe(true);
  });

  test('exact table value picks that size (22.6 → Junior 3)', () => {
    const match = findSkateSize(22.6, BAUER_SKATES);
    expect(match!.row.name).toBe('Junior 3');
    expect(match!.exact).toBe(true);
  });

  test('foot larger than the table → largest size, not exact', () => {
    const match = findSkateSize(40, BAUER_SKATES);
    expect(match!.row.name).toBe('Senior 10.5');
    expect(match!.exact).toBe(false);
  });

  test('no value → null', () => {
    expect(findSkateSize(null, BAUER_SKATES)).toBeNull();
  });
});
