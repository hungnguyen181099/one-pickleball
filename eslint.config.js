// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const reactPlugin = require('eslint-plugin-react');
const reactNativePlugin = require('eslint-plugin-react-native');
const eslintConfigPrettier = require('eslint-config-prettier/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    plugins: {
      react: reactPlugin,
      'react-native': reactNativePlugin,
    },
    rules: {
      ...reactNativePlugin.configs.all.rules,
      'react-native/no-inline-styles': 0,
      'react-native/no-color-literals': 0,
      'react-native/split-platform-components': 0,
      'react-native/no-raw-text': 0,
      'react-native/sort-styles': 0,
    },
  },
  eslintConfigPrettier,
]);
