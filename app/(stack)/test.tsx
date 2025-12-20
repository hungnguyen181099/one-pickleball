import React from 'react';

import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Flex } from '@/components/ui/Flex';
import { Text } from '@/components/ui/Text';

import { useThemedColors } from '@/hooks/use-theme';

const TestScreen = () => {
  const styles = useThemedColors();

  return (
    <View style={{ backgroundColor: styles.backgroundSecondary, padding: 16 }}>
      <Flex direction="column" gap={8} alignItems="stretch">
        <Text size="h2">Button</Text>
        <Button variant="default">Default</Button>
        <Button variant="filled">Filled</Button>
        <Button variant="light">Light</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="transparent">Transparent</Button>
      </Flex>
      <Flex direction="column" gap={8} alignItems="stretch">
        <Text size="h2">Chip</Text>
        <Chip variant="filled">Filled</Chip>
        <Chip variant="outline">Outline</Chip>
        <Chip variant="light">Light</Chip>
      </Flex>
    </View>
  );
};

export default TestScreen;
