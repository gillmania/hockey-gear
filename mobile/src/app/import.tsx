// ===== Import from the old web app =====
// Paste the JSON from the old app's "Exportera min data" button.
// The data lands on the ACTIVE profile (measurements as one record dated
// now), so a family can import each kid's old device one at a time.

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { PixelButton } from '@/components/PixelButton';
import { Card, HelpText, Input } from '@/components/ui';
import { parseLegacyExport } from '@/data/importLegacy';
import { useGearStore, useMeasurementsStore, useSettingsStore } from '@/data/stores';
import { colors, spacing } from '@/theme';

export default function ImportScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const profileId = useSettingsStore((s) => s.activeProfileId);
  const addItem = useGearStore((s) => s.addItem);
  const addRecord = useMeasurementsStore((s) => s.addRecord);

  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const runImport = () => {
    if (!profileId) return;
    setError(false);
    try {
      const result = parseLegacyExport(text);
      for (const draft of result.gear) {
        addItem(profileId, draft);
      }
      const hasMeasurements = Object.keys(result.values).length > 0 || result.shoeSize;
      if (hasMeasurements) {
        addRecord({
          profileId,
          takenAt: new Date().toISOString(),
          values: result.values,
          ...(result.shoeSize ? { shoeSize: result.shoeSize } : {}),
        });
      }
      setSuccess(
        t('settings.importSuccess', {
          gear: result.gear.length,
          measurements: hasMeasurements ? 1 : 0,
        }),
      );
      setTimeout(() => router.back(), 1800);
    } catch {
      setError(true);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Card>
        <HelpText>{t('settings.importHelp')}</HelpText>
        <Input
          value={text}
          onChangeText={setText}
          placeholder={t('settings.importPlaceholder')}
          multiline
          numberOfLines={8}
          style={styles.textArea}
        />
        {error && <Text style={styles.error}>{t('settings.importError')}</Text>}
        {success && <Text style={styles.success}>✅ {success}</Text>}
        <PixelButton
          title={t('settings.importButton')}
          onPress={runImport}
          disabled={!text.trim()}
          style={styles.button}
        />
      </Card>
    </ScrollView>
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
  textArea: {
    backgroundColor: colors.panel2,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: 10,
    color: colors.text,
    padding: spacing.sm + 4,
    minHeight: 160,
    textAlignVertical: 'top',
    fontSize: 13,
  },
  error: {
    color: colors.red,
    marginTop: spacing.sm,
    fontSize: 14,
  },
  success: {
    color: colors.green,
    marginTop: spacing.sm,
    fontSize: 14,
  },
  button: {
    marginTop: spacing.md,
  },
});
