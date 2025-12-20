import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Flex } from '@/components/ui/Flex';
import { Text } from '@/components/ui/Text';

import { StadiumDetailResponse } from '@/features/stadiums/shared/types';

import { useGetStyles } from '@/hooks/useGetStyles';

import { getStadiumCourtsStyles } from './StadiumCourts.styles';

type StadiumCourtsProps = {
  items: StadiumDetailResponse['data']['courts'];
};

const formatToK = (value: number) => {
  if (value < 1000) return value.toString();

  const roundedDown = Math.floor(value / 1000);
  return `${roundedDown}k`;
};

const StadiumCourts = ({ items }: StadiumCourtsProps) => {
  const styles = useGetStyles(getStadiumCourtsStyles);

  return (
    <View style={styles.container}>
      <Text size="h2">Danh sách sân</Text>

      {items.length === 0 && <Text color="secondary">Không có sân khả dụng</Text>}

      <View style={styles.list}>
        {items.map((item, index) => (
          <Flex justifyContent="space-between" key={index} style={styles.card}>
            {/* Left */}
            <View style={styles.left}>
              {/* Name */}
              <Flex gap={8} wrap="wrap">
                <Text size="h2">{item.court_name}</Text>
                <View style={[styles.status, item.is_active ? styles.statusActive : styles.statusInactive]}>
                  <Text color={item.is_active ? 'success' : 'error'} size="sm" fontWeight={600}>
                    {item.is_active ? 'TRỐNG' : 'FULL'}
                  </Text>
                </View>
              </Flex>

              {/* Info */}
              <Flex gap={8}>
                <Text color="secondary">{item.court_type === 'outdoor' ? 'Ngoài trời' : 'Trong nhà'}</Text>
                <Text color="secondary">•</Text>
                <Flex>
                  <MaterialCommunityIcons name="account-group" style={styles.icon} />
                  <Text color="secondary">{item.capacity} người</Text>
                </Flex>
              </Flex>
            </View>

            {/* Right */}
            <Text style={styles.price}>
              <Text size="h2" color="primary">
                {formatToK(item.rental_price)}
              </Text>
              <Text color="secondary">/giờ</Text>
            </Text>
          </Flex>
        ))}
      </View>
    </View>
  );
};

export default StadiumCourts;
