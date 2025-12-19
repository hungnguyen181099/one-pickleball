import { Platform } from 'react-native';

export const buildStadiumMapUrl = (lat: string, lng: string) => {
  return Platform.OS === 'ios'
    ? `http://maps.apple.com/?ll=${lat},${lng}`
    : `https://www.google.com/maps?q=${lat},${lng}`;
};
