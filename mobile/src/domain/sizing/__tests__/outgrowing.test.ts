import { BAUER_APPAREL, BAUER_SKATES } from '../brands/bauer';
import {
  hasLargerRangeSize,
  hasLargerSkateSize,
  monthsUntilOutgrown,
  rangeStatus,
  skateStatus,
} from '../outgrowing';

// Bauer Junior M height range is 140–150 cm.
const juniorM = BAUER_APPAREL.find((r) => r.name === 'Junior M')!;
// Bauer Junior 3 fits feet up to 22.6 cm.
const junior3 = BAUER_SKATES.find((r) => r.name === 'Junior 3')!;

describe('rangeStatus', () => {
  test('height 148.5 in 140–150 (fraction 0.85) → outgrowing-soon', () => {
    expect(rangeStatus(148.5, juniorM.heightCm!, true)).toBe('outgrowing-soon');
  });

  test('height 145 in 140–150 (fraction 0.5) → ok', () => {
    expect(rangeStatus(145, juniorM.heightCm!, true)).toBe('ok');
  });

  test('exactly at the 0.8 threshold (148) → outgrowing-soon', () => {
    expect(rangeStatus(148, juniorM.heightCm!, true)).toBe('outgrowing-soon');
  });

  test('above the range → outgrown', () => {
    expect(rangeStatus(151, juniorM.heightCm!, true)).toBe('outgrown');
  });

  test('largest size never warns (nothing to grow into)', () => {
    expect(rangeStatus(148.5, juniorM.heightCm!, false)).toBe('ok');
  });

  test('open-ended range ("and up") never warns', () => {
    expect(rangeStatus(500, [95, Infinity], true)).toBe('ok');
  });
});

describe('skateStatus', () => {
  test('foot 22.3 vs Junior 3 at 22.6 (0.3 cm margin) → outgrowing-soon', () => {
    expect(skateStatus(22.3, junior3, true)).toBe('outgrowing-soon');
  });

  test('foot 22.0 vs Junior 3 (0.6 cm margin) → ok', () => {
    expect(skateStatus(22.0, junior3, true)).toBe('ok');
  });

  test('foot past the size → outgrown', () => {
    expect(skateStatus(22.8, junior3, true)).toBe('outgrown');
  });
});

describe('table position helpers', () => {
  test('Junior M is not the largest apparel size', () => {
    expect(hasLargerRangeSize(BAUER_APPAREL, juniorM)).toBe(true);
  });

  test('the last skate row has no larger size', () => {
    expect(hasLargerSkateSize(BAUER_SKATES, BAUER_SKATES[BAUER_SKATES.length - 1])).toBe(false);
  });
});

describe('monthsUntilOutgrown', () => {
  test('140 → 146 over 6 months, now at max 150: ~4 cm left at 1 cm/month → null (> 3 months)', () => {
    const history = [
      { takenAt: '2026-01-01T00:00:00Z', value: 140 },
      { takenAt: '2026-07-01T00:00:00Z', value: 146 },
    ];
    expect(monthsUntilOutgrown(history, 150)).toBeNull();
  });

  test('146 → 148 over 1 month, max 150: ~1 month left', () => {
    const history = [
      { takenAt: '2026-06-01T00:00:00Z', value: 146 },
      { takenAt: '2026-07-01T00:00:00Z', value: 148 },
    ];
    expect(monthsUntilOutgrown(history, 150)).toBe(1);
  });

  test('single record → null (no trend without history)', () => {
    expect(monthsUntilOutgrown([{ takenAt: '2026-07-01T00:00:00Z', value: 148 }], 150)).toBeNull();
  });

  test('no growth → null', () => {
    const history = [
      { takenAt: '2026-06-01T00:00:00Z', value: 148 },
      { takenAt: '2026-07-01T00:00:00Z', value: 148 },
    ];
    expect(monthsUntilOutgrown(history, 150)).toBeNull();
  });

  test('open-ended max → null', () => {
    const history = [
      { takenAt: '2026-06-01T00:00:00Z', value: 146 },
      { takenAt: '2026-07-01T00:00:00Z', value: 148 },
    ];
    expect(monthsUntilOutgrown(history, Infinity)).toBeNull();
  });
});
