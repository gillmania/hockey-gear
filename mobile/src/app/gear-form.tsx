// ===== Add/edit gear (modal) =====
// Type picker, brand picker (known brands + free text), size input with
// tappable suggestions from the brand's chart for that gear type, note.

import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { PixelButton } from '@/components/PixelButton';
import { Card, ChipRow, FieldLabel, HelpText, Input } from '@/components/ui';
import { GEAR_TYPES, GearType } from '@/data/schema';
import { useGearStore, useSettingsStore } from '@/data/stores';
import { BRANDS, BRAND_IDS, brandByName } from '@/domain/sizing/brands';
import { GEAR_TYPE_TO_PART } from '@/domain/sizing/gearStatus';
import { colors, spacing } from '@/theme';

const OTHER = '__other__';

export default function GearFormScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const profileId = useSettingsStore((s) => s.activeProfileId);
  const items = useGearStore((s) => s.items);
  const addItem = useGearStore((s) => s.addItem);
  const updateItem = useGearStore((s) => s.updateItem);

  const editing = useMemo(() => items.find((item) => item.id === id) ?? null, [items, id]);

  const knownBrand = editing ? brandByName(editing.brand) : null;
  const [type, setType] = useState<GearType>(editing?.type ?? 'helmet');
  const [brandChoice, setBrandChoice] = useState<string>(
    editing ? (knownBrand ? knownBrand.id : OTHER) : BRAND_IDS[0],
  );
  const [customBrand, setCustomBrand] = useState(editing && !knownBrand ? editing.brand : '');
  const [size, setSize] = useState(editing?.size ?? '');
  const [note, setNote] = useState(editing?.note ?? '');

  const typeOptions = GEAR_TYPES.map((value) => ({ value, label: t(`gearTypes.${value}`) }));
  const brandOptions = [
    ...BRAND_IDS.map((bid) => ({ value: bid, label: BRANDS[bid].name })),
    { value: OTHER, label: t('gear.otherBrand') },
  ];

  // Size suggestions from the chosen brand's chart for this gear type.
  const suggestions = useMemo(() => {
    if (brandChoice === OTHER) return [];
    const part = GEAR_TYPE_TO_PART[type];
    const config = part ? BRANDS[brandChoice]?.parts[part] : undefined;
    if (!config) return [];
    const labels = config.table.map((row) => row.name);
    return [...new Set(labels)];
  }, [brandChoice, type]);

  const save = () => {
    if (!profileId || !size.trim()) return;
    const brand = brandChoice === OTHER ? customBrand.trim() : BRANDS[brandChoice].name;
    const draft = { type, brand, size: size.trim(), note: note.trim() || undefined };
    if (editing) {
      updateItem(editing.id, draft);
    } else {
      addItem(profileId, draft);
    }
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: editing ? t('gear.editTitle') : t('gear.addTitle') }} />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <Card>
          <FieldLabel>{t('gear.typeLabel')}</FieldLabel>
          <ChipRow options={typeOptions} selected={type} onSelect={(v) => setType(v as GearType)} />

          <FieldLabel>{t('gear.brandLabel')}</FieldLabel>
          <ChipRow options={brandOptions} selected={brandChoice} onSelect={setBrandChoice} />
          {brandChoice === OTHER && (
            <>
              <FieldLabel>{t('gear.customBrandLabel')}</FieldLabel>
              <Input
                value={customBrand}
                onChangeText={setCustomBrand}
                placeholder={t('gear.customBrandPlaceholder')}
              />
            </>
          )}

          <FieldLabel>{t('gear.sizeLabel')}</FieldLabel>
          <Input value={size} onChangeText={setSize} placeholder={t('gear.sizePlaceholder')} />
          {suggestions.length > 0 && (
            <>
              <HelpText>
                {t('gear.sizeSuggestions', { brand: BRANDS[brandChoice]?.name ?? '' })}
              </HelpText>
              <ChipRow
                options={suggestions.map((label) => ({ value: label, label }))}
                selected={size}
                onSelect={setSize}
              />
            </>
          )}

          <FieldLabel>{t('gear.noteLabel')}</FieldLabel>
          <Input value={note} onChangeText={setNote} placeholder={t('gear.notePlaceholder')} />

          <View style={styles.buttons}>
            <PixelButton
              title={editing ? t('gear.saveEdit') : t('common.add')}
              onPress={save}
              disabled={!size.trim() || (brandChoice === OTHER && !customBrand.trim())}
            />
            <PixelButton
              title={t('common.cancel')}
              variant="secondary"
              onPress={() => router.back()}
              style={styles.cancel}
            />
          </View>
        </Card>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  buttons: {
    marginTop: spacing.md,
  },
  cancel: {
    marginTop: spacing.sm,
  },
});
