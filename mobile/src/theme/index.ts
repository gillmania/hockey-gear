// ===== Hockey Arena – 16-bit theme =====
// Ported from the original web app's style.css :root variables.
// One place for every color/spacing value so all screens look the same.

export const colors = {
  blue: '#39c2ff', // ice-blue accent
  blueDark: '#1f9fe0',
  red: '#ff3b47', // hockey red
  green: '#36e0a0',
  gold: '#ffd23f',
  background: '#0a1626', // dark rink
  card: '#13243d', // panel
  panel2: '#0e1d33', // fields/frames
  line: '#27425f',
  text: '#eaf2fb',
  muted: '#9fb3c8',
  // Text drawn on top of a bright blue button needs a dark color.
  onAccent: '#052437',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
} as const;

// The retro pixel font, loaded in app/_layout.tsx via @expo-google-fonts.
export const pixelFont = 'PressStart2P_400Regular';
