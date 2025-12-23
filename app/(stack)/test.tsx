import React, { useState } from 'react';

import { dayjsExt } from '@/lib/days';
import { View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { DateTimePicker } from '@/components/ui/DateTimePicker';
import { Flex } from '@/components/ui/Flex';
import { Text } from '@/components/ui/Text';

import { useThemedColors } from '@/hooks/use-theme';

const TestScreen = () => {
  const styles = useThemedColors();

  const [value, setValue] = useState<Date>(dayjsExt('2025-12-25').toDate());

  return (
    <View style={{ backgroundColor: styles.backgroundSecondary, padding: 16 }}>
      {/* Button */}
      <DateTimePicker value={value} onDateChange={setValue} mode='time'/>

      <Flex direction="column" gap={8} alignItems="stretch">
        <Text size="h2">Button</Text>
        <Button variant="default" size="md" fullWidth>
          Default
        </Button>
        <Button variant="filled">Filled</Button>
        <Button variant="light">Light</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="transparent">Transparent</Button>
      </Flex>

      {/* Chip */}
      <Flex direction="column" gap={8} alignItems="stretch">
        <Text size="h2">Chip</Text>
        <Chip variant="filled" size="lg">
          Filled
        </Chip>
        <Chip variant="outline">Outline</Chip>
        <Chip variant="light" size="sm">
          Light
        </Chip>
      </Flex>

      {/* Badge */}
      <Flex direction="column" gap={8} alignItems="stretch">
        <Text size="h2">Badge</Text>
        <Badge variant="default" size="sm">
          Default
        </Badge>
        <Badge variant="filled" color="success">
          Filled
        </Badge>
        <Badge variant="light" size="lg" color="warning">
          Light
        </Badge>
        <Badge variant="outline" color="error">
          Outline
        </Badge>
        <Badge variant="transparent" color="info">
          Transparent
        </Badge>
      </Flex>
    </View>
  );
};

export default TestScreen;
