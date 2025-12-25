import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert, Linking, Pressable, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Flex } from '@/components/ui/Flex';
import { Grid, GridItem } from '@/components/ui/Grid';
import { Icon } from '@/components/ui/Icon';
import { Separator } from '@/components/ui/Separator';
import { Text } from '@/components/ui/Text';

import { StadiumDetailResponse } from '@/features/stadiums/shared/types';

import { useGetStyles } from '@/hooks/useGetStyles';

import { isNowInOpeningTime } from '@/utils/isNowInOpeningTime';

import { getStadiumHeaderStyles } from './StadiumHeader.styles';

type StadiumHeaderProps = StadiumDetailResponse['data'];

const StadiumHeader = ({
  name,
  courts,
  phone,
  email,
  address,
  rating,
  rating_count,
  opening_time,
  closing_time,
}: StadiumHeaderProps) => {
  const styles = useGetStyles(getStadiumHeaderStyles);

  const handleCall = async () => {
    const url = `tel:${phone}`;

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Lỗi', 'Không thể thực hiện cuộc gọi trên thiết bị này');
    }
  };

  const handleEmail = async () => {
    const url = `mailto:${email}`;

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Lỗi', 'Thiết bị không hỗ trợ gửi email');
    }
  };

  const isOpen = isNowInOpeningTime(opening_time, closing_time);

  return (
    <View style={styles.container}>
      <Flex>
        <Badge withDot variant="outline-light" color={isOpen ? 'success' : 'error'}>
          <Text color="inherit" size="inherit" fontWeight={600}>
            {isOpen ? 'Đang mở cửa' : 'Đã đóng cửa'}
          </Text>
        </Badge>
        <Text size="sm" color="muted">
          Đóng cửa lúc {closing_time}
        </Text>
      </Flex>

      <Text size="h1">{name}</Text>

      <Flex>
        <MaterialCommunityIcons name="tennis" style={styles.courtsIcon} />
        <Text color="muted" size="sm">
          {courts.length} sân tiêu chuẩn
        </Text>
      </Flex>

      <Grid columns={2} gap={8}>
        <GridItem>
          <Pressable onPress={handleCall}>
            <Card padding={16} radius="full">
              <Flex justifyContent="center">
                <Icon variant="fit">
                  <MaterialCommunityIcons name="phone" size={24} />
                </Icon>
                <Text size="h4">Gọi điện</Text>
              </Flex>
            </Card>
          </Pressable>
        </GridItem>
        <GridItem>
          <Pressable onPress={handleEmail}>
            <Card padding={16} radius="full">
              <Flex justifyContent="center">
                <Icon variant="fit">
                  <MaterialCommunityIcons name="message-text" size={24} />
                </Icon>
                <Text size="h4">Nhắn tin</Text>
              </Flex>
            </Card>
          </Pressable>
        </GridItem>
      </Grid>

      <Card radius="xl" padding={24} style={styles.card}>
        <Flex direction="column" alignItems="flex-start" gap={4}>
          <Flex gap={4}>
            <Text size="h2">{rating}</Text>
            <MaterialCommunityIcons name="star" style={styles.ratingIcon} />
          </Flex>
          <Text color="muted" size="sm">
            {rating_count} lượt đánh giá
          </Text>
        </Flex>
        <Text fontWeight={500} size="sm" style={styles.ratingAction}>
          Viết đánh giá
        </Text>
      </Card>

      <Card radius="xl" padding={24}>
        <Flex gap={16}>
          <Icon variant="light">
            <MaterialCommunityIcons name="map-marker" size={20} />
          </Icon>
          <Text style={styles.cardItemText}>{address}</Text>
        </Flex>
        <Separator marginVertical={16} />
        <Flex gap={16}>
          <Icon variant="light">
            <MaterialCommunityIcons name="clock" size={20} />
          </Icon>
          <View style={styles.cardItemText}>
            <Text>
              {opening_time} - {closing_time}
            </Text>
            <Text color={isOpen ? 'success' : 'error'} size="sm">
              {isOpen ? 'Đang mở cửa' : 'Đã đóng cửa'}
            </Text>
          </View>
        </Flex>
      </Card>
    </View>
  );
};

export default StadiumHeader;
