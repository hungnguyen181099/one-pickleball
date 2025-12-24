import React from 'react';

import { StyleSheet, View } from 'react-native';

type RHFLayoutProps = {
  children: React.ReactNode;
};

const RHFLayout = ({ children }: RHFLayoutProps) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
});

export default RHFLayout;
