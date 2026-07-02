import { MeasurementRecord } from '../schema';
import { currentMeasurements, currentShoeSize, measurementHistory } from '../selectors';

const records: MeasurementRecord[] = [
  {
    id: 'r1',
    profileId: 'kid1',
    takenAt: '2026-01-01T00:00:00Z',
    values: { height: 140, foot: 21.8, chest: 68 },
    shoeSize: { system: 'eu', value: 34 },
  },
  {
    id: 'r2',
    profileId: 'kid1',
    takenAt: '2026-06-01T00:00:00Z',
    values: { height: 146, foot: 22.4 }, // chest not remeasured
  },
  {
    id: 'r3',
    profileId: 'kid2',
    takenAt: '2026-06-15T00:00:00Z',
    values: { height: 120 },
  },
];

describe('currentMeasurements', () => {
  test('latest value wins per key; unmeasured keys survive from older records', () => {
    expect(currentMeasurements(records, 'kid1')).toEqual({ height: 146, foot: 22.4, chest: 68 });
  });

  test('profiles are isolated', () => {
    expect(currentMeasurements(records, 'kid2')).toEqual({ height: 120 });
    expect(currentMeasurements(records, 'nobody')).toEqual({});
  });

  test('unsorted input is handled (sorts by takenAt)', () => {
    const reversed = [...records].reverse();
    expect(currentMeasurements(reversed, 'kid1')).toEqual({ height: 146, foot: 22.4, chest: 68 });
  });
});

describe('currentShoeSize', () => {
  test('returns the most recent shoe size entry', () => {
    expect(currentShoeSize(records, 'kid1')).toEqual({ system: 'eu', value: 34 });
  });

  test('null when never entered', () => {
    expect(currentShoeSize(records, 'kid2')).toBeNull();
  });
});

describe('measurementHistory', () => {
  test('chronological points for one key', () => {
    expect(measurementHistory(records, 'kid1', 'height')).toEqual([
      { takenAt: '2026-01-01T00:00:00Z', value: 140 },
      { takenAt: '2026-06-01T00:00:00Z', value: 146 },
    ]);
  });

  test('keys missing from a record are skipped', () => {
    expect(measurementHistory(records, 'kid1', 'chest')).toEqual([
      { takenAt: '2026-01-01T00:00:00Z', value: 68 },
    ]);
  });
});
