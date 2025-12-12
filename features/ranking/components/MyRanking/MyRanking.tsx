/* eslint-disable react-native/no-unused-styles */
import React from 'react';

import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors, Radius, Shadows, ThemeColor } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { Ranking } from '../../types';

const myRanking: Ranking = {
  avatar: 'http://api.dicebear.com/9.x/lorelei/svg?seed=Alpha',
  elo: 2450,
  name: 'Alpha',
  rank: 1,
  tier: 'Legend',
  winRate: 72.4,
};

const MyRanking = () => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        {/* Left */}
        <View style={styles.left}>
          <Text style={styles.rank}>{myRanking.rank}</Text>
          <View style={styles.avatar}>
            <Image source={myRanking.avatar} style={styles.image} />
            <View>
              <Text style={styles.name}>{myRanking.name}</Text>
              <Text style={styles.tier}>{myRanking.tier}</Text>
            </View>
          </View>
        </View>

        {/* Right */}
        <View style={styles.right}>
          <Text style={styles.elo}>⭐ {myRanking.elo}</Text>
        </View>
      </View>
    </View>
  );
};

const getStyles = ({ colors }: { colors: ThemeColor }) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 24,
      left: 20,
      right: 20,
      borderRadius: 24,
      overflow: 'hidden',
      ...Shadows['xs'],
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: AppColors.primary,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    rank: {
      fontWeight: 500,
    },
    avatar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    image: {
      width: 48,
      height: 48,
      objectFit: 'cover',
    },
    name: {
      fontSize: 16,
      fontWeight: 500,
    },
    tier: {
      color: colors.textSecondary,
    },
    right: {
      borderRadius: Radius.full,
      overflow: 'hidden',
      backgroundColor: colors.card,
      ...Shadows['xs'],
    },
    elo: {
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
  });

export default MyRanking;
