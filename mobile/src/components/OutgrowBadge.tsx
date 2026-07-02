// The "outgrowing soon" badge — the app's season-to-season hook.
// Shown next to size suggestions and on owned gear that is getting tight.

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { OutgrowStatus } from '../domain/sizing/outgrowing';
import { colors, pixelFont, radius, spacing } from '../theme';

interface Props {
  status: OutgrowStatus;
  /** When known: months until the size is likely outgrown. */
  months?: number | null;
}

export function OutgrowBadge({ status, months }: Props) {
  const { t } = useTranslation();

  if (status === 'ok') {
    return null;
  }

  const soon = status === 'outgrowing-soon';
  return (
    <View style={[styles.badge, soon ? styles.soon : styles.outgrown]}>
      <Text style={[styles.label, soon ? styles.soonLabel : styles.outgrownLabel]}>
        {soon ? t('sizing.outgrowingSoon') : t('sizing.outgrown')}
        {soon && months != null ? ` · ${t('sizing.outgrownInMonths', { months })}` : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1.5,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
  },
  soon: {
    borderColor: colors.gold,
    backgroundColor: 'rgba(255, 210, 63, 0.12)',
  },
  outgrown: {
    borderColor: colors.red,
    backgroundColor: 'rgba(255, 59, 71, 0.12)',
  },
  label: {
    fontFamily: pixelFont,
    fontSize: 7,
    lineHeight: 11,
  },
  soonLabel: {
    color: colors.gold,
  },
  outgrownLabel: {
    color: colors.red,
  },
});
