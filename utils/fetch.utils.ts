import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { AppConfig } from '@/config/app.config';

const getAuthToken = async () => {
  try {
    return Platform.OS === 'web' ? localStorage.getItem('session') : await SecureStore.getItemAsync('session');
  } catch {
    return null;
  }
};

const buildHeaders = async (headers?: HeadersInit) => {
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const token = await getAuthToken();

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  return { ...defaultHeaders, ...headers };
};

export const buildUrl = (url: string) => {
  if (!url) return '';

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  const base = AppConfig.api.standardBaseUrl.replace(/\/+$/, '');
  const path = url.replace(/^\/+/, '');

  return `${base}/${path}`;
};

export const fetchWrapper = async <T>(url: string, options?: RequestInit) => {
  const fullUrl = buildUrl(url);
  const headers = await buildHeaders(options?.headers);

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    let data: T;

    // Process response base on Content-Type
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = (await response.text()) as any;
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};
