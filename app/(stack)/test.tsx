import React from 'react';

import { View } from 'react-native';

import { Button } from '@/components/ui/Button';

import { useThemedColors } from '@/hooks/use-theme';

const TestScreen = () => {
  const styles = useThemedColors();

  return (
    <View style={{ backgroundColor: styles.backgroundSecondary, padding: 16 }}>
      <Button variant="default">123</Button>
      <Button variant="filled">123</Button>
      <Button variant="light">123</Button>
      <Button variant="outline">123</Button>
      <Button variant="transparent">123</Button>
    </View>
  );
};

export default TestScreen;
