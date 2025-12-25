import React from 'react';

import { View } from 'react-native';

import { useGetStyles } from '@/hooks/useGetStyles';

import { getScreenContainerStyles } from './ScreenContainer.styles';

type ScreenContainerProps = {
  children: React.ReactNode;
};

const ScreenContainer = ({ children }: ScreenContainerProps) => {
  const styles = useGetStyles(getScreenContainerStyles);

  return <View style={styles.container}>{children}</View>;
};

export default ScreenContainer;
