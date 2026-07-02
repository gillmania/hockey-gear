// Root layout: loads the pixel font, boots i18n, keeps the language in sync
// with Settings, and declares the navigation structure.

import { PressStart2P_400Regular, useFonts } from '@expo-google-fonts/press-start-2p';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import i18n, { deviceLocale } from '@/i18n';
import { useSettingsStore } from '@/data/stores';
import { colors, pixelFont } from '@/theme';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { t } = useTranslation();
  const [fontsLoaded] = useFonts({ PressStart2P_400Regular });
  const locale = useSettingsStore((s) => s.locale);

  // Wait for AsyncStorage rehydration so we don't flash the wrong screen.
  const [hydrated, setHydrated] = useState(useSettingsStore.persist.hasHydrated());
  useEffect(() => useSettingsStore.persist.onFinishHydration(() => setHydrated(true)), []);

  // Keep i18next in sync with the language setting ("system" follows the device).
  useEffect(() => {
    void i18n.changeLanguage(locale === 'system' ? deviceLocale() : locale);
  }, [locale]);

  useEffect(() => {
    if (fontsLoaded && hydrated) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, hydrated]);

  if (!fontsLoaded || !hydrated) {
    return null; // splash screen is still visible
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.blue,
          headerTitleStyle: { fontFamily: pixelFont, fontSize: 12 },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="gear-form" options={{ presentation: 'modal', title: t('gear.addTitle') }} />
        <Stack.Screen name="profiles" options={{ title: t('profiles.title') }} />
        <Stack.Screen name="history/[measurement]" options={{ title: t('measurements.historyLink') }} />
        <Stack.Screen name="import" options={{ title: t('settings.importTitle') }} />
      </Stack>
    </>
  );
}
