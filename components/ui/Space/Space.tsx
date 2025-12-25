import React from 'react';

import { StyleSheet, View, ViewProps } from 'react-native';

import { Spacing } from '@/constants/theme';

import { useGetStyles } from '@/hooks/useGetStyles';

type SpaceSize = 'px' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type SpaceProps = {
  size?: SpaceSize;
  orientation?: 'horizontal' | 'vertical';
} & ViewProps;

type GetStylesProps = {
  size: SpaceSize;
  orientation: 'horizontal' | 'vertical';
};

const Space = ({ size = 'md', orientation = 'horizontal', style, ...props }: SpaceProps) => {
  const styles = useGetStyles(getStyles, { size, orientation });

  return <View style={[styles.container, style]} {...props}></View>;
};

export default Space;

const getStyles = ({ size, orientation }: GetStylesProps) =>
  StyleSheet.create({
    container: {
      ...(orientation === 'horizontal' && {
        ...(size === 'px' && { height: 1 }),
        ...(size === 'xs' && { height: Spacing.xs }),
        ...(size === 'sm' && { height: Spacing.sm }),
        ...(size === 'md' && { height: Spacing.md }),
        ...(size === 'lg' && { height: Spacing.lg }),
        ...(size === 'xl' && { height: Spacing.xl }),
      }),
      ...(orientation === 'vertical' && {
        ...(size === 'px' && { width: 1 }),
        ...(size === 'xs' && { width: Spacing.xs }),
        ...(size === 'sm' && { width: Spacing.sm }),
        ...(size === 'md' && { width: Spacing.md }),
        ...(size === 'lg' && { width: Spacing.lg }),
        ...(size === 'xl' && { width: Spacing.xl }),
      }),
    },
  });
