import React from 'react';

import { StyleColorsProps } from '@/types';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { useGetStyles } from '@/hooks/useGetStyles';

type Orientation = 'horizontal' | 'vertical';

type CommonProps = {
  orientation: Orientation;
  opacity: ViewStyle['opacity'];
  marginVertical: ViewStyle['marginVertical'];
  marginHorizontal: ViewStyle['marginHorizontal'];
};

type SeparatorProps = Partial<CommonProps> & ViewProps;

type GetStylesProps = CommonProps & StyleColorsProps;

const Separator = ({
  orientation = 'horizontal',
  opacity = 0.5,
  marginVertical = 0,
  marginHorizontal = 0,
  style,
  ...props
}: SeparatorProps) => {
  const styles = useGetStyles(getStyles, { orientation, opacity, marginHorizontal, marginVertical });

  return <View style={[styles.container, style]} {...props}></View>;
};

export default Separator;

const getStyles = ({ colors, orientation, opacity, marginHorizontal, marginVertical }: GetStylesProps) =>
  StyleSheet.create({
    container: {
      opacity,
      marginHorizontal,
      marginVertical,
      backgroundColor: colors.border,
      ...(orientation === 'horizontal' && { height: 1 }),
      ...(orientation === 'vertical' && { width: 1, alignSelf: 'stretch' }),
    },
  });
