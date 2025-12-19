/* eslint-disable react-native/no-unused-styles */
import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { Grid, GridItem } from '@/components/ui/Grid';

import { AppColors, Shadows, ThemeColors } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { leaderboardDistributionStatLabels } from '../../constants';
import { LeaderboardDistribution } from '../../types';

type RankingDistributionProps = {
  data: LeaderboardDistribution[];
};

const RankingDistribution = ({ data }: RankingDistributionProps) => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thống kê</Text>
      <Grid columns={1} gap={4}>
        {data.map((item) => (
          <GridItem key={item.rank}>
            <View style={styles.item}>
              <View style={styles.text}>
                <Text style={styles.muted}>{leaderboardDistributionStatLabels.rank}</Text>
                <Text>{item.rank}</Text>
              </View>
              <View style={styles.text}>
                <Text style={styles.muted}>{leaderboardDistributionStatLabels.playerCount}</Text>
                <Text>{item.playerCount}</Text>
              </View>
              <View style={styles.text}>
                <Text style={styles.muted}>{leaderboardDistributionStatLabels.maxPoint}</Text>
                <Text>{item.maxPoint}</Text>
              </View>
              <View style={styles.text}>
                <Text style={styles.muted}>{leaderboardDistributionStatLabels.minPoint}</Text>
                <Text>{item.minPoint}</Text>
              </View>
            </View>
          </GridItem>
        ))}
      </Grid>
    </View>
  );
};

const getStyles = ({ colors }: { colors: ThemeColors }) =>
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
    item: {
      flex: 1,
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
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 8,
    },
  });

export default RankingDistribution;
