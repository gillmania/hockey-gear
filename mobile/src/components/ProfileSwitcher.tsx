// Compact avatar row shown at the top of every tab: tap to switch profile,
// tap the gear pencil to manage profiles. Parents with several kids switch
// constantly, so this always stays one tap away.

import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useProfilesStore, useSettingsStore } from '../data/stores';
import { colors, pixelFont, spacing } from '../theme';

export function ProfileSwitcher() {
  const router = useRouter();
  const profiles = useProfilesStore((s) => s.profiles);
  const activeProfileId = useSettingsStore((s) => s.activeProfileId);
  const setActiveProfile = useSettingsStore((s) => s.setActiveProfile);

  return (
    <View style={styles.row}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.avatars}>
        {profiles.map((profile) => {
          const active = profile.id === activeProfileId;
          return (
            <Pressable
              key={profile.id}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={profile.name}
              onPress={() => setActiveProfile(profile.id)}
              style={[styles.avatar, { borderColor: active ? profile.iconColor : colors.line }]}
            >
              <Text style={[styles.avatarLetter, { color: profile.iconColor }]}>
                {profile.name.slice(0, 1).toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Profiles"
        onPress={() => router.push('/profiles')}
        style={styles.manage}
      >
        <Text style={styles.manageLabel}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  avatars: {
    gap: spacing.sm,
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontFamily: pixelFont,
    fontSize: 12,
    lineHeight: 16,
  },
  manage: {
    marginLeft: spacing.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageLabel: {
    color: colors.muted,
    fontSize: 18,
    lineHeight: 20,
  },
});
