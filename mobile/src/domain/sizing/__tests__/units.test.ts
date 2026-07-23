import {
  cmToFeetInches,
  cmToIn,
  feetInchesToCm,
  formatLength,
  formatWeight,
  inputToMetric,
  inToCm,
  kgToLb,
  lbToKg,
  roundToHalf,
} from '../units';
import { euShoeToFootLength, shoeSizeToFootLength, ukShoeToFootLength, usShoeToFootLength } from '../shoeSize';

describe('units', () => {
  test('cm ↔ inches round-trips', () => {
    expect(cmToIn(2.54)).toBeCloseTo(1);
    expect(inToCm(cmToIn(32))).toBeCloseTo(32);
  });

  test('kg ↔ lb round-trips', () => {
    expect(kgToLb(0.45359237)).toBeCloseTo(1);
    expect(lbToKg(kgToLb(38))).toBeCloseTo(38);
  });

  test('roundToHalf', () => {
    expect(roundToHalf(12.3)).toBe(12.5);
    expect(roundToHalf(12.24)).toBe(12);
  });

  test('height 145 cm ≈ 4 ft 9 in, and back', () => {
    expect(cmToFeetInches(145)).toEqual({ feet: 4, inches: 9 });
    expect(feetInchesToCm(4, 9)).toBeCloseTo(144.78);
  });

  test('inch overflow carries into feet (183 cm = 6 ft 0 in)', () => {
    expect(cmToFeetInches(183)).toEqual({ feet: 6, inches: 0 });
  });

  test('formatting respects the unit system', () => {
    expect(formatLength(32, 'metric')).toBe('32 cm');
    expect(formatLength(32, 'imperial')).toBe('12.5 in');
    expect(formatWeight(38, 'metric')).toBe('38 kg');
    expect(formatWeight(38, 'imperial')).toBe('84 lb');
  });

  test('imperial input converts to stored metric', () => {
    expect(inputToMetric(12.5, 'length', 'imperial')).toBeCloseTo(31.75);
    expect(inputToMetric(84, 'weight', 'imperial')).toBeCloseTo(38.1, 1);
    expect(inputToMetric(32, 'length', 'metric')).toBe(32);
  });
});

describe('shoe size → foot length (approximate)', () => {
  test('EU 36 → 22.5 cm (original formula)', () => {
    expect(euShoeToFootLength(36)).toBeCloseTo(22.5);
  });

  test('US 4 → ≈22.4 cm (barleycorn men’s scale)', () => {
    expect(usShoeToFootLength(4)).toBeCloseTo(22.44, 1);
  });

  test('UK 3 → ≈22.4 cm (UK = US − 1)', () => {
    expect(ukShoeToFootLength(3)).toBeCloseTo(usShoeToFootLength(4)!, 5);
  });

  test('dispatcher picks the right system', () => {
    expect(shoeSizeToFootLength(36, 'eu')).toBeCloseTo(22.5);
    expect(shoeSizeToFootLength(4, 'us')).toBeCloseTo(22.44, 1);
    expect(shoeSizeToFootLength(3, 'uk')).toBeCloseTo(22.44, 1);
  });

  test('invalid input → null', () => {
    expect(euShoeToFootLength(Number.NaN)).toBeNull();
    expect(usShoeToFootLength(0)).toBeNull();
  });
});
