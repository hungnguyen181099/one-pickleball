import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ScreenHeaderProps = {
  title?: string;
  showBack?: boolean;
};

const ScreenHeader = ({ title = '', showBack = true }: ScreenHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack && (
          <Pressable
            onPress={() => {
              console.log('Back');
              router.back();
            }}
          >
            <MaterialCommunityIcons name="arrow-left" style={styles.back} />
          </Pressable>
        )}
        <Text style={styles.name}>{title}</Text>
      </View>
      {/* <FontAwesome6 name="ranking-star" size={24} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 500,
    fontSize: 18,
  },
  back: {
    transform: [{ translateY: 1 }],
    fontSize: 20,
    width: 32,
  },
});

export default ScreenHeader;
