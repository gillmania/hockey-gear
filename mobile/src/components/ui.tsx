// Small shared building blocks: panel card, section heading, help text,
// text input and chip row. Together they carry the 16-bit rink look from
// the original style.css so every screen stays consistent.

import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TextInputProps, Pressable, View, ViewProps } from 'react-native';

import { colors, pixelFont, radius, spacing } from '../theme';

export function Card({ style, ...props }: ViewProps) {
  return <View style={[styles.card, style]} {...props} />;
}

export function Heading({ children }: { children: React.ReactNode }) {
  return <Text style={styles.heading}>{children}</Text>;
}

export function HelpText({ children }: { children: React.ReactNode }) {
  return <Text style={styles.help}>{children}</Text>;
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <Text style={styles.fieldLabel}>{children}</Text>;
}

export function Input(props: TextInputProps) {
  return <TextInput placeholderTextColor={colors.muted} style={styles.input} {...props} />;
}

interface ChipRowProps<T extends string> {
  options: { value: T; label: string }[];
  selected: T;
  onSelect: (value: T) => void;
}

/** Horizontal row of selectable chips — our picker replacement. */
export function ChipRow<T extends string>({ options, selected, onSelect }: ChipRowProps<T>) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
      {options.map((option) => {
        const active = option.value === selected;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onSelect(option.value)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  heading: {
    fontFamily: pixelFont,
    fontSize: 11,
    lineHeight: 18,
    color: colors.gold,
    textTransform: 'uppercase',
    marginTop: spacing.lg,
    marginBottom: spacing.sm + 4,
  },
  help: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  fieldLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.panel2,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radius.md,
    color: colors.text,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 10,
    fontSize: 16,
  },
  chipRow: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chip: {
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.sm,
  },
  chipActive: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  chipLabel: {
    color: colors.muted,
    fontSize: 13,
  },
  chipLabelActive: {
    color: colors.onAccent,
    fontWeight: '700',
  },
});
