import React, { useMemo } from 'react';

import { Pressable, View } from 'react-native';

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
          <Text size="title" fontWeight={600}>
            {formatCurrencyWithoutUnit(minimumPrice)}
          </Text>
          <Text color="secondary">/giờ</Text>
        </Flex>
      </View>

      <Pressable disabled={isDisabled} style={[styles.button, isDisabled && styles.buttonDisabled]}>
        <Text size="lg" fontWeight={600} style={[styles.buttonText, isDisabled && styles.buttonTextDisabled]}>
          Đặt sân ngay
        </Text>
      </Pressable>
    </Flex>
  );
};

export default StadiumFooter;
