/* eslint-disable react-native/no-unused-styles */
import React from 'react';

import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Grid, GridItem } from '@/components/ui/Grid';

import { AppColors, Radius, Shadows, ThemeColor } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { Ranking } from '../../types';

type OtherRankingProps = {
  data: Ranking[];
};

const OtherRankingItem = ({ avatar, rank, name, tier, elo }: Ranking) => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <View style={styles.item}>
      {/* Left */}
      <View style={styles.left}>
        <Text style={styles.rank}>{rank}</Text>
        <View style={styles.avatar}>
          <Image source={avatar} style={styles.image} />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.tier}>{tier}</Text>
          </View>
        </View>
      </View>

      {/* Right */}
      <View style={styles.right}>
        <Text style={styles.elo}>⭐ {elo}</Text>
      </View>
    </View>
  );
};

const OtherRanking = ({ data }: OtherRankingProps) => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <Grid columns={1} gap={4} style={styles.container}>
      {data.map((ranking) => (
        <GridItem key={ranking.rank}>
          <OtherRankingItem {...ranking} />
        </GridItem>
      ))}
    </Grid>
  );
};

const getStyles = ({ colors }: { colors: ThemeColor }) =>
  StyleSheet.create({
    container: {
      padding: 8,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 32,
      ...Shadows['xs'],
      backgroundColor: colors.card,
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
      backgroundColor: `${AppColors.primary}20`,
    },
  });

export default OtherRanking;
