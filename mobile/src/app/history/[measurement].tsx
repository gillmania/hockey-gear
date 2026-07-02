// ===== Growth history for one measurement =====
// Chronological list + a simple pixel-style bar chart drawn with our own
// SVG (no chart library — keeps the aesthetic and the dependency count).

import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';

import { HelpText } from '@/components/ui';
import { measurementHistory } from '@/data/selectors';
import { useMeasurementsStore, useSettingsStore } from '@/data/stores';
import { formatLength, formatWeight } from '@/domain/sizing/units';
import { MeasurementKey } from '@/domain/sizing/types';
import { colors, radius, spacing } from '@/theme';

const CHART_WIDTH = 320;
const CHART_HEIGHT = 160;
const MAX_BARS = 12;

export default function HistoryScreen() {
  const { t, i18n } = useTranslation();
  const params = useLocalSearchParams<{ measurement: string }>();
  const key = (params.measurement ?? 'height') as MeasurementKey;

  const profileId = useSettingsStore((s) => s.activeProfileId);
  const units = useSettingsStore((s) => s.units);
  const records = useMeasurementsStore((s) => s.records);

  const points = useMemo(
    () => (profileId ? measurementHistory(records, profileId, key) : []),
    [records, profileId, key],
  );

  const format = (value: number) =>
    key === 'weight' ? formatWeight(value, units) : formatLength(value, units);

  const fieldName = t(`measurements.fields.${key}`);

  // Show the most recent bars; scale from slightly below min to max.
  const bars = points.slice(-MAX_BARS);
  const values = bars.map((p) => p.value);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, max);
  const floor = min === max ? min * 0.9 : min - (max - min) * 0.25;
  const barWidth = CHART_WIDTH / Math.max(bars.length, 1);

  return (
    <>
      <Stack.Screen options={{ title: t('measurements.historyTitle', { field: fieldName }) }} />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        {points.length === 0 ? (
          <HelpText>{t('measurements.historyEmpty')}</HelpText>
        ) : (
          <>
            <View style={styles.chartCard}>
              <Svg width="100%" height={CHART_HEIGHT + 24} viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT + 24}`}>
                {bars.map((point, i) => {
                  const h = Math.max(((point.value - floor) / (max - floor)) * CHART_HEIGHT, 6);
                  // Chunky 8px-ish steps keep the retro look.
                  const height = Math.round(h / 8) * 8;
                  return (
                    <React.Fragment key={point.takenAt + i}>
                      <Rect
                        x={i * barWidth + barWidth * 0.15}
                        y={CHART_HEIGHT - height}
                        width={barWidth * 0.7}
                        height={height}
                        fill={i === bars.length - 1 ? colors.blue : colors.line}
                      />
                      <SvgText
                        x={i * barWidth + barWidth / 2}
                        y={CHART_HEIGHT - height - 5}
                        textAnchor="middle"
                        fill={colors.muted}
                        fontSize={9}
                      >
                        {String(Math.round(point.value * 10) / 10)}
                      </SvgText>
                    </React.Fragment>
                  );
                })}
              </Svg>
            </View>

            {[...points].reverse().map((point) => (
              <View key={point.takenAt} style={styles.row}>
                <Text style={styles.rowDate}>
                  {new Date(point.takenAt).toLocaleDateString(i18n.language)}
                </Text>
                <Text style={styles.rowValue}>{format(point.value)}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </>
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
  chartCard: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radius.lg,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    marginBottom: spacing.xs + 2,
  },
  rowDate: {
    color: colors.muted,
    fontSize: 14,
  },
  rowValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
});
