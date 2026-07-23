// ===== Gear tab =====
// The active profile's gear as cards: pixel icon, size, brand, note,
// filter chips, and an automatic "getting too small" badge when the size
// can be matched against the brand's chart. FAB opens the add/edit modal.

import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { OutgrowBadge } from '@/components/OutgrowBadge';
import { ChipRow, HelpText } from '@/components/ui';
import { currentMeasurements } from '@/data/selectors';
import { GearItem } from '@/data/schema';
import { useGearStore, useMeasurementsStore, useSettingsStore } from '@/data/stores';
import { gearOutgrowStatus } from '@/domain/sizing/gearStatus';
import { PixelIcon } from '@/icons/PixelIcon';
import { IconKey } from '@/icons/grids';
import { colors, pixelFont, radius, spacing } from '@/theme';

const ALL = '__all__';

export default function GearScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const profileId = useSettingsStore((s) => s.activeProfileId);
  const items = useGearStore((s) => s.items);
  const removeItem = useGearStore((s) => s.removeItem);
  const records = useMeasurementsStore((s) => s.records);

  const [filterType, setFilterType] = useState(ALL);
  const [filterBrand, setFilterBrand] = useState(ALL);

  const mine = useMemo(() => items.filter((item) => item.profileId === profileId), [items, profileId]);
  const measurements = useMemo(
    () => (profileId ? currentMeasurements(records, profileId) : {}),
    [records, profileId],
  );

  const typeOptions = useMemo(() => {
    const seen = [...new Set(mine.map((i) => i.type))];
    return [
      { value: ALL, label: t('common.all') },
      ...seen.map((type) => ({ value: type, label: t(`gearTypes.${type}`) })),
    ];
  }, [mine, t]);

  const brandOptions = useMemo(() => {
    const seen = [...new Set(mine.map((i) => i.brand).filter(Boolean))].sort();
    return [{ value: ALL, label: t('common.all') }, ...seen.map((b) => ({ value: b, label: b }))];
  }, [mine, t]);

  const visible = mine.filter(
    (item) =>
      (filterType === ALL || item.type === filterType) &&
      (filterBrand === ALL || item.brand === filterBrand),
  );

  const confirmDelete = (item: GearItem) => {
    const name = t(`gearTypes.${item.type}`);
    if (Platform.OS === 'web') {
      // Alert has no buttons on web.
      if (globalThis.confirm?.(t('gear.deleteConfirm', { name }))) removeItem(item.id);
      return;
    }
    Alert.alert(t('common.confirm'), t('gear.deleteConfirm', { name }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: () => removeItem(item.id) },
    ]);
  };

  const renderItem = ({ item }: { item: GearItem }) => {
    const status = gearOutgrowStatus(item.type, item.brand, item.size, measurements);
    const details = [t('gear.sizeShort', { size: item.size }), item.brand, item.note]
      .filter(Boolean)
      .join(' · ');
    return (
      <View style={styles.card}>
        <View style={styles.cardIcon}>
          <PixelIcon icon={item.type as IconKey} size={40} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardType}>{t(`gearTypes.${item.type}`)}</Text>
          <Text style={styles.cardDetails}>{details}</Text>
          {status && status !== 'ok' && <OutgrowBadge status={status} />}
        </View>
        <View style={styles.cardButtons}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/gear-form', params: { id: item.id } })}
            style={styles.smallButton}
          >
            <Text style={styles.smallButtonLabel}>{t('common.edit')}</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => confirmDelete(item)} style={styles.smallButton}>
            <Text style={[styles.smallButtonLabel, styles.deleteLabel]}>{t('common.delete')}</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{t('gear.listTitle')}</Text>
      {mine.length > 0 && (
        <View style={styles.filters}>
          <ChipRow options={typeOptions} selected={filterType} onSelect={setFilterType} />
          <ChipRow options={brandOptions} selected={filterBrand} onSelect={setFilterBrand} />
        </View>
      )}
      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <HelpText>{mine.length === 0 ? t('gear.empty') : t('gear.noMatch')}</HelpText>
        }
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('gear.addTitle')}
        onPress={() => router.push('/gear-form')}
        style={styles.fab}
      >
        <Text style={styles.fabLabel}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
  },
  title: {
    fontFamily: pixelFont,
    fontSize: 11,
    lineHeight: 18,
    color: colors.gold,
    textTransform: 'uppercase',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  filters: {
    marginBottom: spacing.sm,
  },
  list: {
    paddingBottom: 90,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radius.lg,
    padding: spacing.sm + 4,
    marginBottom: spacing.sm,
  },
  cardIcon: {
    marginRight: spacing.sm + 4,
  },
  cardInfo: {
    flex: 1,
  },
  cardType: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  cardDetails: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 2,
  },
  cardButtons: {
    gap: spacing.xs,
  },
  smallButton: {
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  smallButtonLabel: {
    color: colors.blue,
    fontSize: 12,
    textAlign: 'center',
  },
  deleteLabel: {
    color: colors.red,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.blue,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  fabLabel: {
    color: colors.onAccent,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '700',
  },
});
