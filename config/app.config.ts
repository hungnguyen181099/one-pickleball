/**
 * Application Configuration
 * Centralized configuration for the app
 */

export const AppConfig = {
  // API Configuration
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_URL || 'https://onepickleball.vn/api/',
    timeout: 30000,
    retryAttempts: 3,
  },

  // App Information
  app: {
    name: 'onePickleball',
    version: '1.0.0',
    bundleId: 'com.onepickleball.app',
  },

  // Feature Flags
  features: {
    enableNotifications: true,
    enableAnalytics: false,
    enableCrashReporting: false,
  },

  // Storage Keys
  storageKeys: {
    theme: '@app_theme_mode',
    user: '@user_data',
    token: '@auth_token',
    language: '@app_language',
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 50,
  },
};

export default AppConfig;
