import React from 'react';

import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const RankingHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Pressable onPress={() => router.back()}>
          <FontAwesome6 name="arrow-left" size={20} style={styles.back} />
        </Pressable>
        <Text style={styles.name}>Bảng xếp hạng</Text>
      </View>
      {/* <FontAwesome6 name="ranking-star" size={24} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  name: {
    fontWeight: 500,
    fontSize: 20,
  },
  back: {
    transform: [{ translateY: 1 }],
  },
});

export default RankingHeader;
