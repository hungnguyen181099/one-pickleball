import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Flex } from '@/components/ui/Flex';
import { Text } from '@/components/ui/Text';

import { useGetStyles } from '@/hooks/useGetStyles';

import { getHomeTopBarStyles } from './HomeTopBar.styles';

const HomeTopBar = () => {
  const styles = useGetStyles(getHomeTopBarStyles);

  return (
    <Flex justifyContent="space-between" style={styles.container}>
      {/* Left */}
      <Flex gap={16}>
        <MaterialCommunityIcons name="menu" size={24} />
        <Flex>
          <Text color="primary">
            <MaterialCommunityIcons name="tennis" size={24} />
          </Text>
          <Text>
            <Text color="primary" size="h4">
              One
            </Text>
            <Text size="h4">Pickleball</Text>
          </Text>
        </Flex>
      </Flex>

      {/* Right */}
      <MaterialCommunityIcons name="bell" size={20} />
    </Flex>
  );
};

export default HomeTopBar;
