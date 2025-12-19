import React from 'react';

import { View } from 'react-native';

import { useGetStyles } from '@/hooks/useGetStyles';

import { getStadiumRibbonStyles } from './StadiumRibbon.styles';

const StadiumRibbon = () => {
  const styles = useGetStyles(getStadiumRibbonStyles);

  return <View style={styles.container}></View>;
};

export default StadiumRibbon;
