import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Linking, Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';

import { StadiumDetailResponse } from '@/features/stadiums/shared/types';

import { useGetStyles } from '@/hooks/useGetStyles';

import { buildStadiumMapUrl } from '../../utils/buildStadiumMapUrl';
import { extractLatLngStringFromGoogleMapEmbed } from '../../utils/extractLatLngStringFromGoogleMapEmbed';
import { getStadiumMapStyles } from './StadiumMap.styles';

type StadiumMapProps = StadiumDetailResponse['data'];

const StadiumMap = ({ latitude, longitude, maps_address }: StadiumMapProps) => {
  const styles = useGetStyles(getStadiumMapStyles);

  const extractedAddress = extractLatLngStringFromGoogleMapEmbed(maps_address);

  const handleOpenMap = () => {
    const finalLat = latitude ?? extractedAddress?.lat;
    const finalLng = longitude ?? extractedAddress?.lng;

    if (!finalLat || !finalLng) return;

    const url = buildStadiumMapUrl(finalLat, finalLng);
    Linking.openURL(url);
  };

  if (!extractedAddress && (!latitude || !longitude)) {
    return;
  }

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/map.png')} style={styles.map} />

      <Pressable onPress={handleOpenMap} style={styles.button}>
        <MaterialCommunityIcons name="map" style={styles.buttonIcon} />
        <Text fontWeight={500}>Xem bản đồ</Text>
      </Pressable>
    </View>
  );
};

export default StadiumMap;
