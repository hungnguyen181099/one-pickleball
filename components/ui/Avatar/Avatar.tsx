/* eslint-disable react-native/no-unused-styles */
import React, { useState } from 'react';

import { FontAwesome6 } from '@expo/vector-icons';
import { Image, ImageStyle, useImage } from 'expo-image';
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

  const image = useImage(src, {
    onError() {
      setIsError(true);
    },
  });

  const fallbackStyles = getStyles({ size, colors });

  if (isError) {
    return (
      <View style={[fallbackStyles.container, style]}>
        <FontAwesome6 name="user" size={size / 2} color={AppColors.primaryLight} />
      </View>
    );
  }

  return <Image source={image} contentFit="cover" style={style} />;
};

const getStyles = ({ size, colors }: { size: number; colors: ThemeColor }) =>
  StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: Radius.full,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Avatar;
