// Shape validation for every registered brand: catches transcription slips
// (reversed ranges, unsorted skate tables, configs pointing at missing data).
// Runs over BRANDS so new brands are validated automatically.

import { BRANDS } from '../brands';
import { BrandConfig, PartConfig, SizeRow } from '../types';

const RANGE_FIELDS = ['weightKg', 'heightCm', 'chestCm', 'forearmCm', 'waistCm', 'valueCm'] as const;

describe.each(Object.values(BRANDS))('brand $name', (brand: BrandConfig) => {
  test('has at least one part', () => {
    expect(Object.keys(brand.parts).length).toBeGreaterThan(0);
  });

  const partEntries = Object.entries(brand.parts) as [string, PartConfig][];

  test.each(partEntries)('%s: table rows are valid', (_part: string, config: PartConfig) => {
    if (config.kind === 'skate') {
      const table = config.table;
      expect(table.length).toBeGreaterThan(0);
      // Sorted ascending by foot length, strictly increasing.
      for (let i = 1; i < table.length; i++) {
        expect(table[i].footLengthCm).toBeGreaterThan(table[i - 1].footLengthCm);
      }
      return;
    }

    const table = config.table;
    expect(table.length).toBeGreaterThan(0);

    // Every row must have a printable size label and sane ranges.
    for (const row of table) {
      expect(row.name.length).toBeGreaterThan(0);
      for (const field of RANGE_FIELDS) {
        const range = row[field];
        if (range) {
          const [min, max] = range;
          expect(min).toBeLessThanOrEqual(max);
          expect(min).toBeGreaterThan(0);
        }
      }
    }

    // The configured field must exist in at least one row,
    // otherwise the part could never produce a suggestion.
    const usable = table.some((row: SizeRow) => row[config.field]);
    expect(usable).toBe(true);
  });
});
