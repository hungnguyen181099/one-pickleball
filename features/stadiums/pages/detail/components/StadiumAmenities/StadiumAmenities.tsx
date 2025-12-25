import React from 'react';

import { Flex } from '@/components/ui/Flex';
import { Text } from '@/components/ui/Text';

import { useGetStyles } from '@/hooks/useGetStyles';

import { getStadiumAmenitiesStyles } from './StadiumAmenities.styles';

type StadiumAmenitiesProps = {
  items: string[];
};

const StadiumAmenities = ({ items }: StadiumAmenitiesProps) => {
  const styles = useGetStyles(getStadiumAmenitiesStyles);

  return (
    <Flex direction="column" alignItems="flex-start" style={styles.container}>
      <Text size="h2">Tiện ích</Text>

      {items.length === 0 && <Text color="secondary">Không có tiện ích khả dụng</Text>}

      <Flex gap={16} wrap="wrap">
        {items.map((item, index) => (
          <Flex key={index} justifyContent="center" style={styles.item}>
            <Text>{item}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default StadiumAmenities;
