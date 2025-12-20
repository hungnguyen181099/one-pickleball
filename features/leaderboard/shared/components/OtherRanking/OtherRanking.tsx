/* eslint-disable react-native/no-unused-styles */
import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { Grid, GridItem } from '@/components/ui/Grid';

import { AppColors, Radius, Shadows, ThemeColors } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { LeaderboardItem } from '../../types';

type OtherRankingProps = {
  data: LeaderboardItem[];
};

const OtherRankingItem = ({ avatar, rank, name, tier, point }: LeaderboardItem) => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <View style={styles.item}>
      {/* Left */}
      <View style={styles.left}>
        <Text style={styles.rank}>{rank}</Text>
        <View style={styles.avatar}>
          <Avatar src={avatar} size={48} />
          <View style={styles.info}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.name}>
              {name}
            </Text>
            <Text style={styles.tier}>{tier}</Text>
          </View>
        </View>
      </View>

      {/* Right */}
      <View style={styles.right}>
        <Text style={styles.elo}>⭐ {point}</Text>
      </View>
    </View>
  );
};

const OtherRanking = ({ data }: OtherRankingProps) => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <Grid columns={1} gap={8} style={styles.container}>
      {data.map((ranking) => (
        <GridItem key={ranking.rank}>
          <OtherRankingItem {...ranking} />
        </GridItem>
      ))}
    </Grid>
  );
};

const getStyles = ({ colors }: { colors: ThemeColors }) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.card,
    },
    item: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 24,
      padding: 16,
      ...Shadows['2xs'],
      backgroundColor: colors.card,
      gap: 16,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      flex: 1,
    },
    info: {
      flex: 1,
    },
    rank: {
      fontWeight: 500,
    },
    avatar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: 500,
    },
    tier: {
      color: colors.textSecondary,
    },
    right: {
      borderWidth: 1,
      borderColor: AppColors.primary,
      borderRadius: Radius.full,
      overflow: 'hidden',
      ...Shadows['2xs'],
      backgroundColor: colors.card,
    },
    elo: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: AppColors.primaryAlpha20,
    },
  });

export default OtherRanking;
