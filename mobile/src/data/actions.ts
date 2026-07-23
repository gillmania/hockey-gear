// Cross-store actions that must stay consistent.

import { useGearStore, useMeasurementsStore, useProfilesStore, useSettingsStore } from './stores';

/**
 * Deletes a profile AND everything that belongs to it (gear, measurement
 * history). If it was the active profile, activates another one.
 */
export function deleteProfileCascade(profileId: string): void {
  useGearStore.getState().removeForProfile(profileId);
  useMeasurementsStore.getState().removeForProfile(profileId);
  useProfilesStore.getState().removeProfile(profileId);

  const settings = useSettingsStore.getState();
  if (settings.activeProfileId === profileId) {
    const remaining = useProfilesStore.getState().profiles;
    settings.setActiveProfile(remaining.length > 0 ? remaining[0].id : null);
  }
}
