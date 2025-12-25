import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/Text';

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
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2,
        },
        tabBarLabel(props) {
          return (
            <Text size="sm" color={props.focused ? 'primary' : 'default'}>
              {props.children}
            </Text>
          );
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="stadium-overview"
        options={{
          title: 'Sân',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={24} name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tournament"
        options={{
          title: 'Giải đấu',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="tennis" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'Tin tức',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={24} name="newspaper-variant" color={color} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'Tôi',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={24} name="account" color={color} />,
        }}
      />
    </Tabs>
  );
}
