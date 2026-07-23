// ===== Settings tab =====
// Language, units, shoe-size system, share, export/import and the about
// section (non-affiliation disclaimer, privacy note, chart sources).

import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Share, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { PixelButton } from '@/components/PixelButton';
import { Card, ChipRow, FieldLabel, HelpText, Heading } from '@/components/ui';
import {
  LocaleSetting,
  useGearStore,
  useMeasurementsStore,
  useProfilesStore,
  useSettingsStore,
} from '@/data/stores';
import { ShoeSizeSystem } from '@/domain/sizing/shoeSize';
import { UnitSystem } from '@/domain/sizing/units';
import { colors, spacing } from '@/theme';

const APP_LINK = 'https://gillmania.github.io/hockey-gear/';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = useSettingsStore((s) => s.locale);
  const setLocale = useSettingsStore((s) => s.setLocale);
  const units = useSettingsStore((s) => s.units);
  const setUnits = useSettingsStore((s) => s.setUnits);
  const shoeSystem = useSettingsStore((s) => s.shoeSizeSystem);
  const setShoeSystem = useSettingsStore((s) => s.setShoeSizeSystem);

  const shareApp = () => {
    void Share.share({ message: `${t('settings.shareText')}\n${APP_LINK}` });
  };

  const exportData = () => {
    const payload = {
      exportVersion: 2,
      exportedAt: new Date().toISOString(),
      profiles: useProfilesStore.getState().profiles,
      gear: useGearStore.getState().items,
      measurements: useMeasurementsStore.getState().records,
    };
    void Share.share({ message: JSON.stringify(payload, null, 2) });
  };

  const localeOptions: { value: LocaleSetting; label: string }[] = [
    { value: 'system', label: t('settings.languageSystem') },
    { value: 'sv', label: 'Svenska' },
    { value: 'en', label: 'English' },
  ];
  const unitOptions: { value: UnitSystem; label: string }[] = [
    { value: 'metric', label: t('onboarding.unitsMetric') },
    { value: 'imperial', label: t('onboarding.unitsImperial') },
  ];
  const shoeOptions: { value: ShoeSizeSystem; label: string }[] = [
    { value: 'eu', label: 'EU' },
    { value: 'us', label: 'US' },
    { value: 'uk', label: 'UK' },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Heading>{t('settings.title')}</Heading>

      <Card>
        <FieldLabel>{t('settings.language')}</FieldLabel>
        <ChipRow options={localeOptions} selected={locale} onSelect={setLocale} />
        <FieldLabel>{t('settings.units')}</FieldLabel>
        <ChipRow options={unitOptions} selected={units} onSelect={setUnits} />
        <FieldLabel>{t('settings.shoeSizeSystem')}</FieldLabel>
        <ChipRow options={shoeOptions} selected={shoeSystem} onSelect={setShoeSystem} />
      </Card>

      <Card>
        <PixelButton title={`📤 ${t('settings.share')}`} onPress={shareApp} />
        <PixelButton
          title={t('settings.exportData')}
          variant="secondary"
          onPress={exportData}
          style={styles.spacedButton}
        />
        <PixelButton
          title={t('settings.importData')}
          variant="secondary"
          onPress={() => router.push('/import')}
          style={styles.spacedButton}
        />
      </Card>

      <Card>
        <FieldLabel>{t('settings.about')}</FieldLabel>
        <HelpText>{t('settings.aboutText')}</HelpText>
        <HelpText>{t('sizing.disclaimer')}</HelpText>
        <HelpText>{t('settings.privacy')}</HelpText>
        <FieldLabel>{t('settings.sources')}</FieldLabel>
        <HelpText>
          Bauer: “Bauer Protective Equipment”, TUUK runner chart · CCM: officiell storleksguide
          (monkeysportseurope.com), Tacks 910, SkatePro · Warrior: intersport.se
        </HelpText>
        <Text style={styles.version}>
          {t('settings.version')} {Constants.expoConfig?.version ?? '1.0.0'}
        </Text>
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
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  spacedButton: {
    marginTop: spacing.sm,
  },
  version: {
    color: colors.muted,
    fontSize: 12,
    marginTop: spacing.sm,
  },
});
