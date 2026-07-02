// ===== i18n setup =====
// i18next + react-i18next, with the device language via expo-localization.
// English is the fallback; Swedish ships as the second language.
// The user can override the language in Settings ("system" follows the device).

import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import sv from './locales/sv.json';

export const SUPPORTED_LOCALES = ['en', 'sv'] as const;

export function deviceLocale(): 'en' | 'sv' {
  const tags = getLocales();
  for (const tag of tags) {
    if (tag.languageCode === 'sv') return 'sv';
    if (tag.languageCode === 'en') return 'en';
  }
  return 'en';
}

/** Sensible default unit system from the device region (US/Liberia/Myanmar → imperial). */
export function deviceUnits(): 'metric' | 'imperial' {
  const region = getLocales()[0]?.regionCode;
  return region === 'US' || region === 'LR' || region === 'MM' ? 'imperial' : 'metric';
}

/** Sensible default shoe-size system from the device region. */
export function deviceShoeSystem(): 'eu' | 'us' | 'uk' {
  const region = getLocales()[0]?.regionCode;
  if (region === 'US' || region === 'CA') return 'us';
  if (region === 'GB' || region === 'IE') return 'uk';
  return 'eu';
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    sv: { translation: sv },
  },
  lng: deviceLocale(),
  fallbackLng: 'en',
  interpolation: {
    // React already escapes rendered strings.
    escapeValue: false,
  },
});

export default i18n;
