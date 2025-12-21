import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert, Linking, Pressable, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Flex } from '@/components/ui/Flex';
import { Grid, GridItem } from '@/components/ui/Grid';
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
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      Alert.alert('Lỗi', 'Tính năng gọi không hỗ trợ trên thiết bị này');
      return;
    }
    Linking.openURL(url);
  };

  const handleEmail = async () => {
    const url = `mailto:${email}`;
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      Alert.alert('Lỗi', 'Tính năng email không hỗ trợ trên thiết bị này');
      return;
    }
    Linking.openURL(url);
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
        <Text color="secondary" size="sm">
          {courts.length} sân tiêu chuẩn
        </Text>
      </Flex>

      <Grid columns={2} gap={8}>
        <GridItem>
          <Pressable onPress={handleCall}>
            <Flex justifyContent="center" style={styles.contact}>
              <MaterialCommunityIcons name="phone" style={styles.contactIcon} />
              <Text fontWeight={500}>Gọi điện</Text>
            </Flex>
          </Pressable>
        </GridItem>
        <GridItem>
          <Pressable onPress={handleEmail}>
            <Flex justifyContent="center" style={styles.contact}>
              <MaterialCommunityIcons name="message-text" style={styles.contactIcon} />
              <Text fontWeight={500}>Nhắn tin</Text>
            </Flex>
          </Pressable>
        </GridItem>
      </Grid>

      <Flex justifyContent="space-between" style={styles.card}>
        <Flex direction="column" alignItems="flex-start" gap={4}>
          <Flex gap={4}>
            <Text size="h2">{rating}</Text>
            <MaterialCommunityIcons name="star" style={styles.ratingIcon} />
          </Flex>
          <Text color="secondary" size="sm">
            {rating_count} lượt đánh giá
          </Text>
        </Flex>
        <Text fontWeight={500} size="sm" style={styles.ratingAction}>
          Viết đánh giá
        </Text>
      </Flex>

      <View style={styles.card}>
        <Flex gap={16}>
          <Flex justifyContent="center" style={styles.cardIcon}>
            <MaterialCommunityIcons name="map-marker" style={styles.cardItemIcon} />
          </Flex>
          <Text style={styles.cardItemText}>{address}</Text>
        </Flex>
        <View style={styles.cardDivider}></View>
        <Flex gap={16}>
          <Flex justifyContent="center" style={styles.cardIcon}>
            <MaterialCommunityIcons name="clock" style={styles.cardItemIcon} />
          </Flex>
          <View style={styles.cardItemText}>
            <Text>
              {opening_time} - {closing_time}
            </Text>
            <Text color={isOpen ? 'success' : 'error'} size="sm">
              {isOpen ? 'Đang mở cửa' : 'Đã đóng cửa'}
            </Text>
          </View>
        </Flex>
      </View>
    </View>
  );
};

export default StadiumHeader;
