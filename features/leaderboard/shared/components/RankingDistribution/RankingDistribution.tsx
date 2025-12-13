/* eslint-disable react-native/no-unused-styles */
import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { AppColors, Shadows, ThemeColor } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { LeaderboardDistribution } from '../../types';

type RankingDistributionProps = {
  data: LeaderboardDistribution[];
};

const RankingDistribution = ({ data }: RankingDistributionProps) => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thống kê</Text>
      <View style={styles.content}>
        {data.map((item) => (
          <View key={item.rank} style={styles.item}>
            {/* Left */}
            <View style={styles.half}>
              <View style={styles.text}>
                <Text style={styles.muted}>Hạng:</Text>
                <Text>{item.rank}</Text>
              </View>
              <View style={styles.text}>
                <Text style={styles.muted}>Người chơi:</Text>
                <Text>{item.playerCount}</Text>
              </View>
            </View>

            {/* Right */}
            <View style={styles.half}>
              <View style={styles.text}>
                <Text style={styles.muted}>Điểm thấp:</Text>
                <Text>{item.minPoint}</Text>
              </View>
              <View style={styles.text}>
                <Text style={styles.muted}>Điểm cao:</Text>
                <Text>{item.maxPoint}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const getStyles = ({ colors }: { colors: ThemeColor }) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 16,
      color: AppColors.primary,
      textAlign: 'center',
    },
    content: {
      padding: 8,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 32,
      ...Shadows['xs'],
      backgroundColor: colors.card,
      gap: 8,
    },
    item: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 24,
      padding: 16,
      ...Shadows['2xs'],
      backgroundColor: colors.card,
    },
    muted: {
      color: colors.textSecondary,
    },
    text: {
      flexDirection: 'row',
      gap: 8,
    },
    half: {
      width: '50%',
    },
  });

export default RankingDistribution;
