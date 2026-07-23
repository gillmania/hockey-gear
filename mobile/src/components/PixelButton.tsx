// Arcade-style button: pixel font, ice-blue glow when primary.
// Port of the .stor-knapp / .flik-knapp look from the original style.css.

import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { colors, pixelFont, radius, spacing } from '../theme';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: ViewStyle;
  disabled?: boolean;
}

export function PixelButton({ title, onPress, variant = 'primary', style, disabled }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'danger' && styles.danger,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === 'primary' ? styles.labelOnAccent : styles.labelOnPanel,
          variant === 'danger' && styles.labelDanger,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 2,
    borderRadius: radius.md,
    paddingVertical: 13,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    shadowColor: colors.blue,
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 4,
  },
  secondary: {
    backgroundColor: colors.card,
    borderColor: colors.line,
  },
  danger: {
    backgroundColor: colors.card,
    borderColor: colors.red,
  },
  pressed: {
    transform: [{ translateY: 1 }],
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontFamily: pixelFont,
    fontSize: 9,
    lineHeight: 14,
    textAlign: 'center',
  },
  labelOnAccent: {
    color: colors.onAccent,
  },
  labelOnPanel: {
    color: colors.text,
  },
  labelDanger: {
    color: colors.red,
  },
});
