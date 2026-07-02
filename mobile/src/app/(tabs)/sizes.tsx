// ===== Sizes tab — the app's crown jewel =====
// Pick a brand, get a suggested size for every equipment part from the
// profile's measurements — the app converts for each brand's measuring
// method. Includes the "outgrowing soon" badge per part.

import { Link } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { OutgrowBadge } from '@/components/OutgrowBadge';
import { ChipRow, HelpText, Heading } from '@/components/ui';
import { currentMeasurements, currentShoeSize, measurementHistory } from '@/data/selectors';
import { useMeasurementsStore, useSettingsStore } from '@/data/stores';
import { BRANDS, BRAND_IDS } from '@/domain/sizing/brands';
import {
  hasLargerRangeSize,
  hasLargerSkateSize,
  monthsUntilOutgrown,
  OutgrowStatus,
  rangeStatus,
  skateStatus,
} from '@/domain/sizing/outgrowing';
import { Suggestion, suggestAll } from '@/domain/sizing/suggest';
import { SizeRow, SkateRow } from '@/domain/sizing/types';
import { PixelIcon } from '@/icons/PixelIcon';
import { IconKey } from '@/icons/grids';
import { colors, pixelFont, radius, spacing } from '@/theme';

/** Icon per suggestion part ('general' shows the jersey, like the old app). */
const PART_ICON: Record<string, IconKey> = {
  helmet: 'helmet',
  general: 'jersey',
  shoulderPads: 'shoulderPads',
  elbowPads: 'elbowPads',
  pants: 'pants',
  shinGuards: 'shinGuards',
  gloves: 'gloves',
  skates: 'skates',
};

export default function SizesScreen() {
  const { t } = useTranslation();
  const profileId = useSettingsStore((s) => s.activeProfileId);
  const brandId = useSettingsStore((s) => s.selectedBrandId);
  const setSelectedBrand = useSettingsStore((s) => s.setSelectedBrand);
  const records = useMeasurementsStore((s) => s.records);

  const brand = BRANDS[brandId] ?? BRANDS[BRAND_IDS[0]];

  const measurements = useMemo(
    () => (profileId ? currentMeasurements(records, profileId) : {}),
    [records, profileId],
  );
  const shoeSize = useMemo(
    () => (profileId ? currentShoeSize(records, profileId) : null),
    [records, profileId],
  );

  const suggestions = useMemo(
    () => suggestAll(brand, measurements, shoeSize),
    [brand, measurements, shoeSize],
  );

  const brandOptions = BRAND_IDS.map((id) => ({ value: id, label: BRANDS[id].name }));

  /** Outgrow status + trend months for one suggestion. */
  const statusFor = (s: Suggestion): { status: OutgrowStatus; months: number | null } => {
    if (!s.match || s.lookupValue == null || !profileId) {
      return { status: 'ok', months: null };
    }
    const config = brand.parts[s.part]!;
    if (config.kind === 'skate') {
      const row = s.match.row as SkateRow;
      const status = skateStatus(s.lookupValue, row, hasLargerSkateSize(config.table, row));
      return { status, months: null };
    }
    const row = s.match.row as SizeRow;
    const range = row[config.field];
    if (!range) return { status: 'ok', months: null };
    const status = rangeStatus(s.lookupValue, range, hasLargerRangeSize(config.table, row));
    // Trend estimate needs history for the underlying measurement.
    // The adjustment shifts both history and the range equally, so we
    // compare raw history against max + adjustment.
    const history = measurementHistory(records, profileId, config.measurement);
    const months =
      status === 'outgrowing-soon'
        ? monthsUntilOutgrown(history, range[1] + (config.adjustmentCm ?? 0))
        : null;
    return { status, months };
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Heading>{t('sizing.title')}</Heading>
      <HelpText>{t('sizing.help')}</HelpText>

      <Text style={styles.brandLabel}>{t('sizing.brandLabel')}</Text>
      <ChipRow options={brandOptions} selected={brand.id} onSelect={setSelectedBrand} />

      <View style={styles.list}>
        {suggestions.map((s) => {
          const { status, months } = statusFor(s);
          return (
            <View key={s.part} style={styles.row}>
              <View style={styles.rowIcon}>
                <PixelIcon icon={PART_ICON[s.part]} size={34} />
              </View>
              <View style={styles.rowBody}>
                <Text style={styles.rowName}>{t(`parts.${s.part}`)}</Text>
                {s.unavailable ? (
                  <Text style={styles.rowEmpty}>{t('sizing.noGuide', { brand: brand.name })}</Text>
                ) : s.sizeLabel == null ? (
                  <Link
                    href="/measurements"
                    style={styles.rowLink}
                  >
                    {t('sizing.goMeasure', {
                      field: t(`measurements.fields.${s.missingMeasurement ?? 'height'}`).toLowerCase(),
                    })}
                  </Link>
                ) : (
                  <>
                    <Text style={styles.rowSize}>
                      {s.sizeLabel}
                      {!s.exact || s.fromShoeSize ? (
                        <Text style={styles.rowApprox}> {t('sizing.approx')}</Text>
                      ) : null}
                    </Text>
                    {s.part === 'skates' && (
                      <Text style={styles.rowExtra}>
                        {s.runnerMm != null
                          ? t('sizing.runner', { mm: s.runnerMm })
                          : t('sizing.runnerNone')}
                        {s.fromShoeSize ? ` · ${t('sizing.fromShoe')}` : ''}
                      </Text>
                    )}
                    {s.noteKey && <Text style={styles.rowExtra}>{t(s.noteKey)}</Text>}
                    <OutgrowBadge status={status} months={months} />
                  </>
                )}
              </View>
            </View>
          );
        })}
      </View>

      <Text style={styles.disclaimer}>{t('sizing.disclaimer')}</Text>
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
  brandLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  list: {
    marginTop: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radius.lg,
    padding: spacing.sm + 4,
    marginBottom: spacing.sm,
  },
  rowIcon: {
    marginRight: spacing.sm + 4,
  },
  rowBody: {
    flex: 1,
  },
  rowName: {
    color: colors.muted,
    fontSize: 13,
  },
  rowSize: {
    color: colors.text,
    fontFamily: pixelFont,
    fontSize: 11,
    lineHeight: 18,
    marginTop: 3,
  },
  rowApprox: {
    color: colors.gold,
    fontFamily: undefined,
    fontSize: 12,
  },
  rowExtra: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  rowEmpty: {
    color: colors.muted,
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 3,
  },
  rowLink: {
    color: colors.blue,
    fontSize: 13,
    marginTop: 3,
    textDecorationLine: 'underline',
  },
  disclaimer: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: spacing.md,
  },
});
