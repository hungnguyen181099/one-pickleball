import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, View, ViewStyle } from 'react-native';

import { Text } from '@/components/ui/Text';

import { useGetStyles } from '@/hooks/useGetStyles';

import { getScreenHeaderStyles } from './ScreenHeader.styles';

type ScreenHeaderProps = {
  title?: string;
  showBack?: boolean;
  withBorder?: boolean;
  paddingHorizontal?: number;
  styleOverrides?: {
    container?: ViewStyle;
  };
};

const ScreenHeader = ({
  paddingHorizontal = 16,
  styleOverrides = {},
  withBorder = true,
  showBack = true,
  title = '',
}: ScreenHeaderProps) => {
  const styles = useGetStyles(getScreenHeaderStyles, { withBorder, paddingHorizontal });

  return (
    <View style={[styles.container, styleOverrides.container]}>
      {showBack && (
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <MaterialCommunityIcons name="arrow-left" style={styles.back} />
        </Pressable>
      )}
      <Text size="h2">{title}</Text>
    </View>
  );
};

export default ScreenHeader;
