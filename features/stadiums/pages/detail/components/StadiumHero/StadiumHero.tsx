import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import { router } from 'expo-router';
import { View } from 'react-native';

import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';

import { stadiumHeroStyles } from './StadiumHero.styles';

type StadiumHeroProps = {
  image: string | null;
};

const StadiumHero = ({ image }: StadiumHeroProps) => {
  return (
    <View>
      <ImageBackground source={image} contentFit="cover" style={stadiumHeroStyles.image}>
        <Flex justifyContent="space-between" style={stadiumHeroStyles.action}>
          <Icon styleOverrides={{ container: stadiumHeroStyles.iconContainer }} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} />
          </Icon>

          <Flex>
            <Icon styleOverrides={{ container: stadiumHeroStyles.iconContainer }}>
              <MaterialIcons name="ios-share" size={24} />
            </Icon>
            <Icon styleOverrides={{ container: stadiumHeroStyles.iconContainer }}>
              <MaterialIcons name="favorite" size={24} />
            </Icon>
          </Flex>
        </Flex>
      </ImageBackground>
    </View>
  );
};

export default StadiumHero;
