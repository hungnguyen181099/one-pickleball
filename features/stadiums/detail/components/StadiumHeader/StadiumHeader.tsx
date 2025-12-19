import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert, Linking, Pressable, View } from 'react-native';

import { Flex } from '@/components/ui/Flex';
import { Grid, GridItem } from '@/components/ui/Grid';
import { Text } from '@/components/ui/Text';

import { StadiumDetailResponse } from '@/features/stadiums/shared/types';

import { useGetStyles } from '@/hooks/useGetStyles';

import { getStadiumHeaderStyles } from './StadiumHeader.styles';

type StadiumHeaderProps = StadiumDetailResponse['data'];

const StadiumHeader = ({
  name,
  courts,
  phone,
  email,
  address,
  opening_hours,
  rating,
  rating_count,
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

  return (
    <View style={styles.container}>
      <Flex>
        <Flex style={styles.openState}>
          <View style={styles.openStateDot}></View>
          <Text size="sm" color="success" fontWeight={600}>
            Đang mở cửa
          </Text>
        </Flex>
      </Flex>

      <Text size="title">{name}</Text>

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
            <Text size="subtitle">{rating}</Text>
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
          <Text style={styles.cardItemText}>{opening_hours}</Text>
        </Flex>
      </View>
    </View>
  );
};

export default StadiumHeader;
