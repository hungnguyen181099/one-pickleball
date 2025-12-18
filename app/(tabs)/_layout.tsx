import React from 'react';

import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconSymbol } from '@/components/icon-symbol';

import { Colors } from '@/constants/theme';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemedColors } from '@/hooks/use-theme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 4,
          paddingBottom: insets.bottom,
          height: 60 + insets.bottom,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="stadiums"
        options={{
          title: 'Sân',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="mappin.and.ellipse" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tournament"
        options={{
          title: 'Giải đấu',
          tabBarIcon: ({ color }) => <Feather name="star" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'Tin tức',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="bookmark.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'Tôi',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
