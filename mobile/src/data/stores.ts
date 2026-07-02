// ===== Persistent stores =====
// Zustand + AsyncStorage: the simplest credible local-first storage.
// Data volume is tiny (a few profiles × dozens of records), so JSON in
// AsyncStorage beats SQLite here — human-readable, trivially exportable.
// Every store is versioned from day one so future schema changes can
// migrate old data instead of losing it.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ShoeSizeSystem } from '../domain/sizing/shoeSize';
import { UnitSystem } from '../domain/sizing/units';
import { GearItem, GearType, MeasurementRecord, Profile } from './schema';
import { makeId } from './ids';

const storage = createJSONStorage(() => AsyncStorage);

// ---- Settings ----

export type LocaleSetting = 'system' | 'en' | 'sv';

interface SettingsState {
  locale: LocaleSetting;
  units: UnitSystem;
  shoeSizeSystem: ShoeSizeSystem;
  activeProfileId: string | null;
  selectedBrandId: string;
  /** False until onboarding has created the first profile. */
  onboarded: boolean;
  setLocale: (locale: LocaleSetting) => void;
  setUnits: (units: UnitSystem) => void;
  setShoeSizeSystem: (system: ShoeSizeSystem) => void;
  setActiveProfile: (id: string | null) => void;
  setSelectedBrand: (id: string) => void;
  setOnboarded: (onboarded: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      locale: 'system',
      units: 'metric',
      shoeSizeSystem: 'eu',
      activeProfileId: null,
      selectedBrandId: 'bauer',
      onboarded: false,
      setLocale: (locale) => set({ locale }),
      setUnits: (units) => set({ units }),
      setShoeSizeSystem: (shoeSizeSystem) => set({ shoeSizeSystem }),
      setActiveProfile: (activeProfileId) => set({ activeProfileId }),
      setSelectedBrand: (selectedBrandId) => set({ selectedBrandId }),
      setOnboarded: (onboarded) => set({ onboarded }),
    }),
    { name: 'settings', version: 1, storage },
  ),
);

// ---- Profiles ----

interface ProfilesState {
  profiles: Profile[];
  addProfile: (name: string, iconColor: string) => Profile;
  renameProfile: (id: string, name: string) => void;
  setProfileColor: (id: string, iconColor: string) => void;
  /** Only removes the profile — use deleteProfileCascade() from actions.ts. */
  removeProfile: (id: string) => void;
}

export const useProfilesStore = create<ProfilesState>()(
  persist(
    (set) => ({
      profiles: [],
      addProfile: (name, iconColor) => {
        const profile: Profile = { id: makeId(), name, iconColor, createdAt: new Date().toISOString() };
        set((state) => ({ profiles: [...state.profiles, profile] }));
        return profile;
      },
      renameProfile: (id, name) =>
        set((state) => ({
          profiles: state.profiles.map((p) => (p.id === id ? { ...p, name } : p)),
        })),
      setProfileColor: (id, iconColor) =>
        set((state) => ({
          profiles: state.profiles.map((p) => (p.id === id ? { ...p, iconColor } : p)),
        })),
      removeProfile: (id) =>
        set((state) => ({ profiles: state.profiles.filter((p) => p.id !== id) })),
    }),
    { name: 'profiles', version: 1, storage },
  ),
);

// ---- Gear ----

export interface GearDraft {
  type: GearType;
  brand: string;
  size: string;
  note?: string;
}

interface GearState {
  items: GearItem[];
  addItem: (profileId: string, draft: GearDraft) => GearItem;
  updateItem: (id: string, draft: GearDraft) => void;
  removeItem: (id: string) => void;
  removeForProfile: (profileId: string) => void;
}

export const useGearStore = create<GearState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (profileId, draft) => {
        const now = new Date().toISOString();
        const item: GearItem = { id: makeId(), profileId, ...draft, createdAt: now, updatedAt: now };
        set((state) => ({ items: [...state.items, item] }));
        return item;
      },
      updateItem: (id, draft) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...draft, updatedAt: new Date().toISOString() } : item,
          ),
        })),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      removeForProfile: (profileId) =>
        set((state) => ({ items: state.items.filter((item) => item.profileId !== profileId) })),
    }),
    { name: 'gear', version: 1, storage },
  ),
);

// ---- Measurements (append-only history) ----

interface MeasurementsState {
  records: MeasurementRecord[];
  addRecord: (record: Omit<MeasurementRecord, 'id'>) => MeasurementRecord;
  removeRecord: (id: string) => void;
  removeForProfile: (profileId: string) => void;
}

export const useMeasurementsStore = create<MeasurementsState>()(
  persist(
    (set) => ({
      records: [],
      addRecord: (record) => {
        const full: MeasurementRecord = { id: makeId(), ...record };
        set((state) => ({ records: [...state.records, full] }));
        return full;
      },
      removeRecord: (id) =>
        set((state) => ({ records: state.records.filter((r) => r.id !== id) })),
      removeForProfile: (profileId) =>
        set((state) => ({ records: state.records.filter((r) => r.profileId !== profileId) })),
    }),
    { name: 'measurements', version: 1, storage },
  ),
);
