// ===== All brands collected =====
// Add a new brand by creating a file next to these (see docs/BRAND-DATA-GUIDE.md
// in the repo root), then registering it here. The rest of the app —
// brand pickers and suggestions — takes care of itself.

import { BrandConfig } from '../types';
import { bauer } from './bauer';
import { ccm } from './ccm';
import { warrior } from './warrior';

// TRUE, Sherwood and STX are planned next — their official charts must be
// transcribed and verified against the source first (docs/BRAND-DATA-GUIDE.md).
export const BRANDS: Record<string, BrandConfig> = {
  bauer,
  ccm,
  warrior,
};

export const BRAND_IDS = Object.keys(BRANDS);

/** Finds a brand by its display name (e.g. "Bauer"). */
export function brandByName(name: string): BrandConfig | null {
  for (const id of BRAND_IDS) {
    if (BRANDS[id].name === name) {
      return BRANDS[id];
    }
  }
  return null;
}
