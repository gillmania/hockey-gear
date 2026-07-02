// The four tabs. Until onboarding has created the first profile we
// redirect there instead of showing an empty app.

import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProfileSwitcher } from '@/components/ProfileSwitcher';
import { useSettingsStore } from '@/data/stores';
import { PixelIcon } from '@/icons/PixelIcon';
import { IconKey } from '@/icons/grids';
import { colors, pixelFont } from '@/theme';

function tabIcon(icon: IconKey) {
  function TabIcon({ focused }: { focused: boolean }) {
    return (
      <Text style={{ opacity: focused ? 1 : 0.45 }}>
        <PixelIcon icon={icon} size={26} />
      </Text>
    );
  }
  return TabIcon;
}

export default function TabsLayout() {
  const { t } = useTranslation();
  const onboarded = useSettingsStore((s) => s.onboarded);

  if (!onboarded) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ProfileSwitcher />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopColor: colors.line,
            borderTopWidth: 2,
            height: 62,
            paddingTop: 6,
          },
          tabBarActiveTintColor: colors.blue,
          tabBarInactiveTintColor: colors.muted,
          tabBarLabelStyle: { fontFamily: pixelFont, fontSize: 7 },
          sceneStyle: { backgroundColor: colors.background },
        }}
      >
        <Tabs.Screen name="index" options={{ title: t('tabs.gear'), tabBarIcon: tabIcon('bag') }} />
        <Tabs.Screen name="sizes" options={{ title: t('tabs.sizes'), tabBarIcon: tabIcon('jersey') }} />
        <Tabs.Screen
          name="measurements"
          options={{ title: t('tabs.measurements'), tabBarIcon: tabIcon('stick') }}
        />
        <Tabs.Screen name="settings" options={{ title: t('tabs.settings'), tabBarIcon: tabIcon('other') }} />
      </Tabs>
    </SafeAreaView>
  );
}
