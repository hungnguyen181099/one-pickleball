import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Linking, Platform, Pressable, View } from 'react-native';

import { Flex } from '@/components/ui/Flex';
import { Text } from '@/components/ui/Text';

import { useGetStyles } from '@/hooks/useGetStyles';

import { getStadiumMapStyles } from './StadiumMap.styles';

type StadiumMapProps = {
  lat: string | null;
  lng: string | null;
};

const StadiumMap = ({ lat, lng }: StadiumMapProps) => {
  const styles = useGetStyles(getStadiumMapStyles);

  const handleOpenMap = () => {
    const url =
      Platform.OS === 'ios' ? `http://maps.apple.com/?ll=${lat},${lng}` : `https://www.google.com/maps?q=${lat},${lng}`;

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Flex justifyContent="center" style={styles.map}>
        <Pressable onPress={handleOpenMap}>
          <Flex style={styles.button}>
            <MaterialCommunityIcons name="map" style={styles.buttonIcon} />
            <Text fontWeight={500}>Xem bản đồ</Text>
          </Flex>
        </Pressable>
      </Flex>
    </View>
  );
};

export default StadiumMap;
