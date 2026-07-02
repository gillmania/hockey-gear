// ===== Onboarding (first run) =====
// One friendly screen: pick language + units (prefilled from the device)
// and create the first profile. More profiles can be added later.

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PixelButton } from '@/components/PixelButton';
import { Card, ChipRow, FieldLabel, HelpText, Input } from '@/components/ui';
import { LocaleSetting, useProfilesStore, useSettingsStore } from '@/data/stores';
import { deviceShoeSystem, deviceUnits } from '@/i18n';
import { UnitSystem } from '@/domain/sizing/units';
import { PixelIcon } from '@/icons/PixelIcon';
import { colors, pixelFont, spacing } from '@/theme';

export const PROFILE_COLORS = ['#39c2ff', '#36e0a0', '#ffd23f', '#ff3b47', '#c792ea', '#f78c6c'];

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const settings = useSettingsStore();
  const addProfile = useProfilesStore((s) => s.addProfile);

  const [name, setName] = useState('');
  const [color, setColor] = useState(PROFILE_COLORS[0]);
  const [units, setUnits] = useState<UnitSystem>(deviceUnits());

  const start = () => {
    if (!name.trim()) return;
    const profile = addProfile(name.trim(), color);
    settings.setActiveProfile(profile.id);
    settings.setUnits(units);
    settings.setShoeSizeSystem(deviceShoeSystem());
    settings.setOnboarded(true);
    router.replace('/');
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

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <PixelIcon icon="skates" size={72} />
          <Text style={styles.title}>{t('onboarding.welcomeTitle')}</Text>
          <HelpText>{t('onboarding.welcomeText')}</HelpText>
        </View>

        <Card>
          <FieldLabel>{t('onboarding.languageLabel')}</FieldLabel>
          <ChipRow options={localeOptions} selected={settings.locale} onSelect={settings.setLocale} />
          <FieldLabel>{t('onboarding.unitsLabel')}</FieldLabel>
          <ChipRow options={unitOptions} selected={units} onSelect={setUnits} />
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>{t('onboarding.profileTitle')}</Text>
          <HelpText>{t('onboarding.profileText')}</HelpText>
          <Input value={name} onChangeText={setName} placeholder={t('profiles.namePlaceholder')} />
          <FieldLabel>{t('profiles.colorLabel')}</FieldLabel>
          <View style={styles.colors}>
            {PROFILE_COLORS.map((c) => (
              <Text
                key={c}
                onPress={() => setColor(c)}
                style={[styles.colorDot, { backgroundColor: c }, color === c && styles.colorDotActive]}
              />
            ))}
          </View>
        </Card>

        <PixelButton title={t('onboarding.start')} onPress={start} disabled={!name.trim()} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  hero: {
    alignItems: 'center',
    marginVertical: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    fontFamily: pixelFont,
    fontSize: 16,
    lineHeight: 26,
    color: colors.blue,
  },
  sectionTitle: {
    fontFamily: pixelFont,
    fontSize: 10,
    lineHeight: 16,
    color: colors.gold,
    marginBottom: spacing.sm,
  },
  colors: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  colorDot: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
  },
  colorDotActive: {
    borderWidth: 3,
    borderColor: colors.text,
  },
});
