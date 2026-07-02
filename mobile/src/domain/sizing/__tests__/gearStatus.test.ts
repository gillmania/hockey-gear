import { gearOutgrowStatus } from '../gearStatus';

describe('gearOutgrowStatus', () => {
  test('owned Bauer 10" shin guards with shin 33 cm (range 31–33.5, fraction 0.8) → outgrowing-soon', () => {
    expect(gearOutgrowStatus('shinGuards', 'Bauer', '10"', { shin: 33 })).toBe('outgrowing-soon');
  });

  test('owned Bauer 10" shin guards with shin 31.5 cm → ok', () => {
    expect(gearOutgrowStatus('shinGuards', 'Bauer', '10"', { shin: 31.5 })).toBe('ok');
  });

  test('owned Bauer 10" shin guards with shin 34 cm → outgrown', () => {
    expect(gearOutgrowStatus('shinGuards', 'Bauer', '10"', { shin: 34 })).toBe('outgrown');
  });

  test('owned Bauer Junior 3 skates with foot 22.3 cm (0.3 margin) → outgrowing-soon', () => {
    expect(gearOutgrowStatus('skates', 'Bauer', 'Junior 3', { foot: 22.3 })).toBe('outgrowing-soon');
  });

  test('CCM shin guards apply the 5.5 cm adjustment (shin 33 → 27.5 in 25–28) → outgrowing-soon', () => {
    expect(gearOutgrowStatus('shinGuards', 'CCM', '10"', { shin: 33 })).toBe('outgrowing-soon');
  });

  test('unknown brand → null', () => {
    expect(gearOutgrowStatus('shinGuards', 'Egen Snickrad', '10"', { shin: 33 })).toBeNull();
  });

  test('type without a chart (stick) → null', () => {
    expect(gearOutgrowStatus('stick', 'Bauer', '152 cm', { height: 150 })).toBeNull();
  });

  test('size label not in the chart → null', () => {
    expect(gearOutgrowStatus('shinGuards', 'Bauer', 'XXL', { shin: 33 })).toBeNull();
  });

  test('missing measurement → null', () => {
    expect(gearOutgrowStatus('shinGuards', 'Bauer', '10"', {})).toBeNull();
  });
});
