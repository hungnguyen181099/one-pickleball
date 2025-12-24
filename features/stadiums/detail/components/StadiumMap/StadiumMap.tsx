import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Linking, View } from 'react-native';

import { Button } from '@/components/ui/Button';

import { StadiumDetailResponse } from '@/features/stadiums/shared/types';

import { useGetStyles } from '@/hooks/useGetStyles';

import { getStadiumMapStyles } from './StadiumMap.styles';

type StadiumMapProps = {
  link: StadiumDetailResponse['data']['maps_link'];
};

const StadiumMap = ({ link }: StadiumMapProps) => {
  const styles = useGetStyles(getStadiumMapStyles);

  if (!link) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/map.png')} style={styles.map} />

      <Button
        variant="default"
        radius="full"
        startIcon={<MaterialCommunityIcons name="map" style={styles.buttonIcon} />}
        onPress={() => Linking.openURL(link)}
        styleOverrides={{ container: styles.button }}
      >
        Xem bản đồ
      </Button>
    </View>
  );
};

export default StadiumMap;
