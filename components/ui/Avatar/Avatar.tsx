/* eslint-disable react-native/no-unused-styles */
import React, { useState } from 'react';

import { FontAwesome6 } from '@expo/vector-icons';
import { Image, ImageStyle } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { AppColors, Radius, ThemeColor } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

type AvatarProps = {
  src: string;
  size?: number;
  style?: ImageStyle;
};

const Avatar = ({ src, size = 48, style }: AvatarProps) => {
  const [isError, setIsError] = useState<boolean>(false);
  const colors = useThemedColors();

  const fallbackStyles = getStyles({ size, colors });

  if (isError || !src) {
    return (
      <View style={[fallbackStyles.container, style]}>
        <FontAwesome6 name="user" size={size / 3} color={AppColors.primaryLight} />
      </View>
    );
  }

  return <Image source={src} contentFit="cover" onError={() => setIsError(true)} style={style} />;
};

const getStyles = ({ size, colors }: { size: number; colors: ThemeColor }) =>
  StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: Radius.full,
      backgroundColor: colors.backgroundTertiary,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Avatar;
