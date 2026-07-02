import { BRANDS } from '../brands';
import { suggestAll, suggestForPart } from '../suggest';

const measurements = {
  height: 145,
  weight: 38,
  chest: 72,
  forearm: 24,
  waist: 68,
  shin: 32,
  hand: 14,
  foot: 22.5,
  head: 54,
};

describe('suggestForPart', () => {
  test('Bauer pants apply the 7.6 cm chart deduction (waist 68 → Youth L)', () => {
    const s = suggestForPart(BRANDS.bauer, 'pants', measurements);
    expect(s.sizeLabel).toBe('Youth L');
    expect(s.exact).toBe(true);
    expect(s.lookupValue).toBeCloseTo(60.4);
  });

  test('CCM pants use the true waist (68 → Junior M)', () => {
    const s = suggestForPart(BRANDS.ccm, 'pants', measurements);
    expect(s.sizeLabel).toBe('Junior M');
    expect(s.exact).toBe(true);
  });

  test('CCM shin guards adjust 5.5 cm and carry the note key', () => {
    const s = suggestForPart(BRANDS.ccm, 'shinGuards', measurements);
    expect(s.sizeLabel).toBe('10"');
    expect(s.noteKey).toBe('sizing.notes.ccmShin');
  });

  test('Bauer skates give size and runner length from measured foot', () => {
    const s = suggestForPart(BRANDS.bauer, 'skates', measurements);
    expect(s.sizeLabel).toBe('Junior 3');
    expect(s.runnerMm).toBe(230);
    expect(s.fromShoeSize).toBe(false);
    expect(s.exact).toBe(true);
  });

  test('skates fall back to EU shoe size when foot is missing (EU 36 → foot 22.5 → Junior 3)', () => {
    const { foot: _foot, ...withoutFoot } = measurements;
    const s = suggestForPart(BRANDS.bauer, 'skates', withoutFoot, { system: 'eu', value: 36 });
    expect(s.sizeLabel).toBe('Junior 3');
    expect(s.fromShoeSize).toBe(true);
    expect(s.exact).toBe(false); // estimated → always approximate
  });

  test('missing measurement is reported', () => {
    const s = suggestForPart(BRANDS.bauer, 'helmet', {});
    expect(s.sizeLabel).toBeNull();
    expect(s.missingMeasurement).toBe('head');
  });

  test('Warrior has no helmet guide → unavailable', () => {
    const s = suggestForPart(BRANDS.warrior, 'helmet', measurements);
    expect(s.unavailable).toBe(true);
  });

  test('Warrior sizes shin guards by height (145 cm → 12")', () => {
    const s = suggestForPart(BRANDS.warrior, 'shinGuards', measurements);
    expect(s.sizeLabel).toBe('12"');
  });
});

describe('suggestAll', () => {
  test('returns all eight parts in display order', () => {
    const all = suggestAll(BRANDS.bauer, measurements);
    expect(all.map((s) => s.part)).toEqual([
      'helmet',
      'general',
      'shoulderPads',
      'elbowPads',
      'pants',
      'shinGuards',
      'gloves',
      'skates',
    ]);
    // With full measurements, Bauer suggests something for every part.
    expect(all.every((s) => s.sizeLabel !== null)).toBe(true);
  });
});
