/* eslint-disable react-native/no-unused-styles */
import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';

import { AppColors, Radius, Shadows, ThemeColor } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { LeaderboardItem } from '../../types';

const MyRanking = ({ avatar, point, name, tier }: LeaderboardItem) => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        {/* Left */}
        <View style={styles.left}>
          {/* <Text style={styles.rank}>{rank}</Text> */}
          <View style={styles.avatar}>
            <Avatar src={avatar} size={48} />
            <View>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.tier}>{tier}</Text>
            </View>
          </View>
        </View>

        {/* Right */}
        <View style={styles.right}>
          <Text style={styles.point}>⭐ {point}</Text>
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
    point: {
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
  });

export default MyRanking;
