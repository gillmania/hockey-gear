// ===== Entitlements stub =====
// v1 is completely free. When premium features arrive (e.g. via RevenueCat),
// this is the ONLY file that changes: wire `hasPremium` to the purchase SDK
// and gate features by calling it. Nothing else in the app knows about
// payments, which keeps a future paywall a drop-in change.

export type Entitlement = 'premium';

export function hasEntitlement(_entitlement: Entitlement): boolean {
  return true; // everything unlocked in the free v1
}
