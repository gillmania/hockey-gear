// ===== Shoe size → foot length =====
// Fallback when the user hasn't measured the foot. All conversions are
// APPROXIMATE — shoe sizes vary between brands, and skate sizes are not
// shoe sizes. The UI always nudges the user to measure the foot instead.
//
// Sources:
// - EU (Paris point): EU ≈ (foot length + 1.5 cm toe allowance) × 1.5,
//   same formula as the original web app (storleksguide.js).
// - US/UK (barleycorn, adult men's scale): US ≈ 3 × foot(in) − 22.5 and
//   UK = US − 1, per ISO/TS 19407 relationships as documented on
//   https://en.wikipedia.org/wiki/Shoe_size (retrieved 2026-07-02).
//   NOTE: US kids' sizes use a different offset — one more reason the
//   result is labeled approximate and measuring is recommended.

export type ShoeSizeSystem = 'eu' | 'us' | 'uk';

const CM_PER_INCH = 2.54;

/** Approximate foot length (cm) from an EU shoe size. */
export function euShoeToFootLength(eu: number): number | null {
  if (!eu || Number.isNaN(eu)) return null;
  return eu / 1.5 - 1.5;
}

/** Approximate foot length (cm) from a US (men's) shoe size. */
export function usShoeToFootLength(us: number): number | null {
  if (!us || Number.isNaN(us)) return null;
  return ((us + 22.5) / 3) * CM_PER_INCH;
}

/** Approximate foot length (cm) from a UK shoe size. */
export function ukShoeToFootLength(uk: number): number | null {
  if (!uk || Number.isNaN(uk)) return null;
  return ((uk + 23.5) / 3) * CM_PER_INCH;
}

/** Converts a shoe size in any supported system to approximate foot length (cm). */
export function shoeSizeToFootLength(size: number, system: ShoeSizeSystem): number | null {
  switch (system) {
    case 'eu':
      return euShoeToFootLength(size);
    case 'us':
      return usShoeToFootLength(size);
    case 'uk':
      return ukShoeToFootLength(size);
  }
}
