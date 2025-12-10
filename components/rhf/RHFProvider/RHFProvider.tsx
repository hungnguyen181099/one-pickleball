import React from 'react';

import { StyleSheet, View } from 'react-native';

type RHFProviderProps = {
  children: React.ReactNode;
};

const RHFProvider = ({ children }: RHFProviderProps) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
});

export default RHFProvider;
