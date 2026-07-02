import { parseLegacyExport } from '../importLegacy';

// A realistic payload: exactly what the old app's export button produces
// from its localStorage (strings from <input> fields, Swedish labels).
const realPayload = JSON.stringify({
  exportVersion: 1,
  hockeyGear: [
    { typ: 'Hjälm', storlek: 'Medium', marke: 'Bauer', anteckning: '' },
    { typ: 'Skridskor', storlek: 'Junior 3', marke: 'CCM', anteckning: 'börjar bli liten' },
    { typ: 'Klubba', storlek: '142 cm', marke: 'Egen Snickrad', anteckning: '' },
  ],
  hockeyMeasurements: {
    langd: '145',
    vikt: '38',
    brost: '72',
    underarm: '24',
    midja: '68',
    skenben: '32',
    handlangd: '14',
    fotlangd: '22.5',
    skostorlek: '36',
    huvud: '54',
  },
  valtVarumarke: 'bauer',
});

describe('parseLegacyExport', () => {
  test('maps gear types, brands, sizes and notes', () => {
    const result = parseLegacyExport(realPayload);
    expect(result.gear).toEqual([
      { type: 'helmet', brand: 'Bauer', size: 'Medium', note: undefined },
      { type: 'skates', brand: 'CCM', size: 'Junior 3', note: 'börjar bli liten' },
      { type: 'stick', brand: 'Egen Snickrad', size: '142 cm', note: undefined },
    ]);
  });

  test('maps all measurement keys to the new names, as numbers', () => {
    const result = parseLegacyExport(realPayload);
    expect(result.values).toEqual({
      height: 145,
      weight: 38,
      chest: 72,
      forearm: 24,
      waist: 68,
      shin: 32,
      hand: 14,
      foot: 22.5,
      head: 54,
    });
    expect(result.shoeSize).toEqual({ system: 'eu', value: 36 });
  });

  test('handles decimal comma and empty fields', () => {
    const result = parseLegacyExport(
      JSON.stringify({ hockeyGear: [], hockeyMeasurements: { fotlangd: '22,5', langd: '' } }),
    );
    expect(result.values).toEqual({ foot: 22.5 });
    expect(result.shoeSize).toBeNull();
  });

  test('measurements-only export works (no gear array)', () => {
    const result = parseLegacyExport(JSON.stringify({ hockeyMeasurements: { langd: '150' } }));
    expect(result.gear).toEqual([]);
    expect(result.values).toEqual({ height: 150 });
  });

  test('rejects malformed input', () => {
    expect(() => parseLegacyExport('not json')).toThrow();
    expect(() => parseLegacyExport('42')).toThrow();
    expect(() => parseLegacyExport('{"foo": 1}')).toThrow();
  });
});
