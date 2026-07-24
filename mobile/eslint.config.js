// ESLint flat config using Expo's shared rules.
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const globals = require('globals');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['node_modules/**', '.expo/**', 'dist/**'],
  },
  {
    // One-off Node build scripts (not part of the app bundle).
    files: ['scripts/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
]);
