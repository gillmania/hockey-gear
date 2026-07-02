// ===== Measurements tab =====
// The body figure + the measurement form. Saving APPENDS a new record —
// that append-only history powers the growth charts and trend estimates.
// Inputs are unit-aware: imperial users type inches/lbs (feet+inches for
// height); everything is stored metric.

import { Link } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { BodyFigure } from '@/components/BodyFigure';
import { PixelButton } from '@/components/PixelButton';
import { Card, FieldLabel, HelpText, Heading, Input } from '@/components/ui';
import { currentMeasurements, currentShoeSize } from '@/data/selectors';
import { useMeasurementsStore, useSettingsStore } from '@/data/stores';
import { ShoeSizeSystem } from '@/domain/sizing/shoeSize';
import { Measurements, ShoeSizeValue } from '@/domain/sizing/suggest';
import {
  cmToFeetInches,
  feetInchesToCm,
  inputToMetric,
  metricToInput,
  UnitSystem,
} from '@/domain/sizing/units';
import { MeasurementKey } from '@/domain/sizing/types';
import { colors, spacing } from '@/theme';

/** Form order with the same numbering as the figure (1–7). */
const FIELDS: { key: MeasurementKey; number?: string; dimension: 'length' | 'weight' }[] = [
  { key: 'height', dimension: 'length' },
  { key: 'weight', dimension: 'weight' },
  { key: 'chest', number: '1', dimension: 'length' },
  { key: 'forearm', number: '2', dimension: 'length' },
  { key: 'waist', number: '3', dimension: 'length' },
  { key: 'shin', number: '4', dimension: 'length' },
  { key: 'hand', number: '5', dimension: 'length' },
  { key: 'foot', number: '6', dimension: 'length' },
  { key: 'head', number: '7', dimension: 'length' },
];

function parseNumber(text: string): number | null {
  const value = parseFloat(text.replace(',', '.'));
  return Number.isNaN(value) ? null : value;
}

export default function MeasurementsScreen() {
  const { t } = useTranslation();
  const profileId = useSettingsStore((s) => s.activeProfileId);
  const units = useSettingsStore((s) => s.units);
  const shoeSystem = useSettingsStore((s) => s.shoeSizeSystem);
  const records = useMeasurementsStore((s) => s.records);

  const stored = useMemo(
    () => (profileId ? currentMeasurements(records, profileId) : {}),
    [records, profileId],
  );
  const storedShoe = useMemo(
    () => (profileId ? currentShoeSize(records, profileId) : null),
    [records, profileId],
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Heading>{t('measurements.title')}</Heading>
      <HelpText>{t('measurements.help')}</HelpText>

      <BodyFigure measurements={stored} units={units} />

      {/* Remount when profile/units/shoe system change, so the form
          re-initializes from the stored values without effect gymnastics. */}
      <MeasurementsForm
        key={`${profileId}-${units}-${shoeSystem}`}
        profileId={profileId}
        units={units}
        shoeSystem={shoeSystem}
        stored={stored}
        storedShoe={storedShoe}
      />
    </ScrollView>
  );
}

interface FormProps {
  profileId: string | null;
  units: UnitSystem;
  shoeSystem: ShoeSizeSystem;
  stored: Measurements;
  storedShoe: ShoeSizeValue | null;
}

function MeasurementsForm({ profileId, units, shoeSystem, stored, storedShoe }: FormProps) {
  const { t } = useTranslation();
  const addRecord = useMeasurementsStore((s) => s.addRecord);

  // Initial form state (strings in display units) from the stored metrics.
  const [form, setForm] = useState<Partial<Record<MeasurementKey, string>>>(() => {
    const initial: Partial<Record<MeasurementKey, string>> = {};
    for (const field of FIELDS) {
      const metric = stored[field.key];
      if (metric == null) continue;
      if (field.key === 'height' && units === 'imperial') {
        initial.height = String(cmToFeetInches(metric).inches);
      } else {
        initial[field.key] = String(metricToInput(metric, field.dimension, units));
      }
    }
    return initial;
  });
  const [heightFeet, setHeightFeet] = useState(() =>
    stored.height != null && units === 'imperial' ? String(cmToFeetInches(stored.height).feet) : '',
  );
  const [shoeText, setShoeText] = useState(() =>
    storedShoe && storedShoe.system === shoeSystem ? String(storedShoe.value) : '',
  );
  const [savedFlash, setSavedFlash] = useState(false);

  const save = () => {
    if (!profileId) return;

    const values: Partial<Record<MeasurementKey, number>> = {};
    for (const field of FIELDS) {
      const text = form[field.key];
      if (field.key === 'height' && units === 'imperial') {
        const feet = parseNumber(heightFeet);
        const inches = parseNumber(text ?? '') ?? 0;
        if (feet != null) values.height = Math.round(feetInchesToCm(feet, inches) * 10) / 10;
        continue;
      }
      if (!text) continue;
      const num = parseNumber(text);
      if (num == null) continue;
      values[field.key] = Math.round(inputToMetric(num, field.dimension, units) * 10) / 10;
    }

    const shoe = parseNumber(shoeText);
    addRecord({
      profileId,
      takenAt: new Date().toISOString(),
      values,
      ...(shoe != null ? { shoeSize: { system: shoeSystem, value: shoe } } : {}),
    });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2500);
  };

  const unitSuffix = (dimension: 'length' | 'weight') =>
    units === 'imperial' ? (dimension === 'weight' ? 'lb' : 'in') : dimension === 'weight' ? 'kg' : 'cm';

  return (
    <Card>
      {FIELDS.map((field) => (
        <View key={field.key}>
          <View style={styles.labelRow}>
            <FieldLabel>
              {field.number ? `${field.number}. ` : ''}
              {t(`measurements.fields.${field.key}`)} ({unitSuffix(field.dimension)})
            </FieldLabel>
            <Link
              href={{ pathname: '/history/[measurement]', params: { measurement: field.key } }}
              style={styles.historyLink}
            >
              {t('measurements.historyLink')}
            </Link>
          </View>
          <HelpText>{t(`measurements.instructions.${field.key}`)}</HelpText>
          {field.key === 'height' && units === 'imperial' ? (
            <View style={styles.dualRow}>
              <View style={styles.dualField}>
                <Input value={heightFeet} onChangeText={setHeightFeet} keyboardType="numeric" placeholder="ft" />
              </View>
              <View style={styles.dualField}>
                <Input
                  value={form.height ?? ''}
                  onChangeText={(text) => setForm((f) => ({ ...f, height: text }))}
                  keyboardType="numeric"
                  placeholder="in"
                />
              </View>
            </View>
          ) : (
            <Input
              value={form[field.key] ?? ''}
              onChangeText={(text) => setForm((f) => ({ ...f, [field.key]: text }))}
              keyboardType="numeric"
              placeholder={unitSuffix(field.dimension)}
            />
          )}
        </View>
      ))}

      <FieldLabel>{t('measurements.shoeSizeLabel', { system: shoeSystem.toUpperCase() })}</FieldLabel>
      <HelpText>{t('measurements.shoeSizeHelp')}</HelpText>
      <Input value={shoeText} onChangeText={setShoeText} keyboardType="numeric" placeholder={shoeSystem.toUpperCase()} />

      <View style={styles.saveArea}>
        <PixelButton title={t('measurements.saveButton')} onPress={save} />
        {savedFlash && <Text style={styles.saved}>✅ {t('measurements.savedAsNew')}</Text>}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyLink: {
    color: colors.blue,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  dualRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dualField: {
    flex: 1,
  },
  saveArea: {
    marginTop: spacing.md,
  },
  saved: {
    color: colors.green,
    textAlign: 'center',
    marginTop: spacing.sm,
    fontSize: 14,
  },
});
