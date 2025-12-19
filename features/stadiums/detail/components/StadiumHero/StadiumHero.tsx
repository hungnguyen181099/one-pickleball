import React from 'react';

import { Image } from 'expo-image';
import { View } from 'react-native';

import { stadiumHeroStyles } from './StadiumHero.styles';

type StadiumHeroProps = {
  image: string | null;
};

const StadiumHero = ({ image }: StadiumHeroProps) => {
  return (
    <View>
      <Image source={image} contentFit="cover" style={stadiumHeroStyles.image} />
    </View>
  );
};

export default StadiumHero;
