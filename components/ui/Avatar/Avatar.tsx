import React, { useState } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, ImageStyle } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { AppColors, Radius, ThemeColors } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

type AvatarProps = {
  src: string;
  size?: number;
  style?: ImageStyle;
};

const isValidImageUri = (src?: string) => typeof src === 'string' && /^(https?|file):\/\//.test(src);

const Avatar = ({ src, size = 48, style }: AvatarProps) => {
  const [isError, setIsError] = useState<boolean>(false);
  const colors = useThemedColors();

  const fallbackStyles = getStyles({ size, colors });

  if (isError || !src || !isValidImageUri(src)) {
    return (
      <View style={[fallbackStyles.container, style]}>
        <MaterialCommunityIcons name="account" size={size / 3} color={AppColors.primaryLight} />
      </View>
    );
  }

  return <Image source={src} contentFit="cover" onError={() => setIsError(true)} style={style} />;
};

const getStyles = ({ size, colors }: { size: number; colors: ThemeColors }) =>
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
