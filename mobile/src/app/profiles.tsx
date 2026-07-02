// ===== Profiles =====
// Add, rename (tap name), recolor and delete family members. Deleting
// cascades to the profile's gear and measurement history, with confirmation.

import React, { useState } from 'react';
import { Alert, FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { PixelButton } from '@/components/PixelButton';
import { Card, FieldLabel, HelpText, Input } from '@/components/ui';
import { deleteProfileCascade } from '@/data/actions';
import { Profile } from '@/data/schema';
import { useProfilesStore, useSettingsStore } from '@/data/stores';
import { colors, pixelFont, radius, spacing } from '@/theme';
import { PROFILE_COLORS } from './onboarding';

export default function ProfilesScreen() {
  const { t } = useTranslation();
  const profiles = useProfilesStore((s) => s.profiles);
  const addProfile = useProfilesStore((s) => s.addProfile);
  const renameProfile = useProfilesStore((s) => s.renameProfile);
  const setProfileColor = useProfilesStore((s) => s.setProfileColor);
  const activeProfileId = useSettingsStore((s) => s.activeProfileId);
  const setActiveProfile = useSettingsStore((s) => s.setActiveProfile);

  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(PROFILE_COLORS[1]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const create = () => {
    if (!newName.trim()) return;
    const profile = addProfile(newName.trim(), newColor);
    if (!activeProfileId) setActiveProfile(profile.id);
    setNewName('');
  };

  const confirmDelete = (profile: Profile) => {
    const message = t('profiles.deleteConfirm', { name: profile.name });
    if (Platform.OS === 'web') {
      if (globalThis.confirm?.(message)) deleteProfileCascade(profile.id);
      return;
    }
    Alert.alert(t('common.confirm'), message, [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: () => deleteProfileCascade(profile.id) },
    ]);
  };

  const commitRename = () => {
    if (editingId && editingName.trim()) {
      renameProfile(editingId, editingName.trim());
    }
    setEditingId(null);
  };

  const renderProfile = ({ item }: { item: Profile }) => {
    const active = item.id === activeProfileId;
    return (
      <View style={[styles.row, active && { borderColor: item.iconColor }]}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setActiveProfile(item.id)}
          style={styles.rowMain}
        >
          <View style={[styles.avatar, { borderColor: item.iconColor }]}>
            <Text style={[styles.avatarLetter, { color: item.iconColor }]}>
              {item.name.slice(0, 1).toUpperCase()}
            </Text>
          </View>
          {editingId === item.id ? (
            <View style={styles.renameField}>
              <Input value={editingName} onChangeText={setEditingName} onBlur={commitRename} autoFocus />
            </View>
          ) : (
            <Text
              style={styles.name}
              onLongPress={() => {
                setEditingId(item.id);
                setEditingName(item.name);
              }}
            >
              {item.name}
            </Text>
          )}
        </Pressable>
        <View style={styles.colors}>
          {PROFILE_COLORS.map((c) => (
            <Text
              key={c}
              onPress={() => setProfileColor(item.id, c)}
              style={[styles.colorDot, { backgroundColor: c }, item.iconColor === c && styles.colorDotActive]}
            />
          ))}
        </View>
        <Pressable accessibilityRole="button" onPress={() => confirmDelete(item)} style={styles.deleteButton}>
          <Text style={styles.deleteLabel}>{t('common.delete')}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={renderProfile}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<HelpText>{t('profiles.empty')}</HelpText>}
        ListFooterComponent={
          <Card style={styles.addCard}>
            <FieldLabel>{t('profiles.addTitle')}</FieldLabel>
            <Input value={newName} onChangeText={setNewName} placeholder={t('profiles.namePlaceholder')} />
            <FieldLabel>{t('profiles.colorLabel')}</FieldLabel>
            <View style={styles.colors}>
              {PROFILE_COLORS.map((c) => (
                <Text
                  key={c}
                  onPress={() => setNewColor(c)}
                  style={[styles.colorDot, { backgroundColor: c }, newColor === c && styles.colorDotActive]}
                />
              ))}
            </View>
            <PixelButton title={t('profiles.create')} onPress={create} disabled={!newName.trim()} style={styles.createButton} />
          </Card>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
  },
  row: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radius.lg,
    padding: spacing.sm + 4,
    marginBottom: spacing.sm,
  },
  rowMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 4,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.panel2,
  },
  avatarLetter: {
    fontFamily: pixelFont,
    fontSize: 14,
    lineHeight: 20,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  renameField: {
    flex: 1,
  },
  colors: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  colorDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    overflow: 'hidden',
  },
  colorDotActive: {
    borderWidth: 3,
    borderColor: colors.text,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    marginTop: spacing.sm,
  },
  deleteLabel: {
    color: colors.red,
    fontSize: 12,
  },
  addCard: {
    marginTop: spacing.sm,
  },
  createButton: {
    marginTop: spacing.md,
  },
});
