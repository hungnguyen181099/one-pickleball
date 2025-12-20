import React, { useMemo } from 'react';

import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { Text } from '@/components/ui/Text';

import { StadiumDetailResponse } from '@/features/stadiums/shared/types';

import { useGetStyles } from '@/hooks/useGetStyles';

import { formatCurrencyWithoutUnit } from '@/utils/format.utils';

import { getStadiumFooterStyles } from './StadiumFooter.styles';

type StadiumFooterProps = {
  courts: StadiumDetailResponse['data']['courts'];
};

const StadiumFooter = ({ courts }: StadiumFooterProps) => {
  const styles = useGetStyles(getStadiumFooterStyles);

  const isDisabled = useMemo(() => courts.length === 0, [courts]);

  const minimumPrice = useMemo(() => {
    let min = Infinity;
    courts.forEach((court) => {
      if (court.rental_price < min) {
        min = court.rental_price;
      }
    });
    return min;
  }, [courts]);

  return (
    <Flex gap={32} style={styles.container}>
      <View>
        <Text color="secondary" size="sm">
          Giá thuê từ
        </Text>
        <Flex gap={4}>
          <Text size="h1" fontWeight={600}>
            {formatCurrencyWithoutUnit(minimumPrice)}
          </Text>
          <Text color="secondary">/giờ</Text>
        </Flex>
      </View>

      <Button
        radius="full"
        disabled={isDisabled}
        styleOverrides={{
          container: styles.button,
          text: styles.buttonText,
        }}
      >
        Đặt sân ngay
      </Button>
    </Flex>
  );
};

export default StadiumFooter;
