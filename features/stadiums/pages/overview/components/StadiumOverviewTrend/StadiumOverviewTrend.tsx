import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Space } from '@/components/ui/Space';
import { Text } from '@/components/ui/Text';

import { useStadiums } from '@/features/stadiums/shared/hooks/useStadiums';

import { useGetStyles } from '@/hooks/useGetStyles';

import { getStadiumOverviewTrendStyles } from './StadiumOverviewTrend.styles';

const StadiumOverviewTrend = () => {
  const styles = useGetStyles(getStadiumOverviewTrendStyles);

  const { data, status } = useStadiums({
    per_page: 5,
    page: 1,
  });

  if (status === 'pending') {
    return;
  }

  if (status === 'error') {
    return;
  }

  const stadiums = data.data;

  return (
    <View>
      <Flex justifyContent="space-between" alignItems="flex-end">
        <Text size="h2">Sân nổi bật</Text>
        <Link href="/stadiums">
          <Text size="h4" color="primary">
            Xem tất cả
          </Text>
        </Link>
      </Flex>

      <Space size="lg" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {stadiums.map((stadium, index) => (
          <Card
            key={stadium.id}
            padding={16}
            radius="xl"
            style={[styles.card, index < stadiums.length - 1 && styles.cardGap]}
          >
            {/* Image */}
            <View>
              <Image source={stadium.image} style={styles.image} />
              <Flex gap={4} style={styles.rating}>
                <Icon variant="fit">
                  <MaterialIcons name="star" size={18} />
                </Icon>
                <Text size="h4" style={styles.ratingText}>
                  {stadium.rating} ({stadium.rating_count})
                </Text>
              </Flex>
            </View>

            {/* Name */}
            <Text size="h3" numberOfLines={2}>
              {stadium.name}
            </Text>

            {/* Address */}
            {stadium.province?.name && (
              <Flex>
                <Icon variant="fit" color="muted" translateY={1}>
                  <MaterialIcons name="location-on" size={18} />
                </Icon>
                <Text color="muted">{stadium.province.name}</Text>
              </Flex>
            )}

            <Space size="px" />

            {/* Button */}
            <Button
              radius="full"
              fullWidth
              styleOverrides={{ container: styles.buttonContainer }}
              onPress={() =>
                router.navigate({
                  pathname: '/stadiums/[stadiumId]',
                  params: { stadiumId: stadium.id },
                })
              }
            >
              Đặt sân
            </Button>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export default StadiumOverviewTrend;
