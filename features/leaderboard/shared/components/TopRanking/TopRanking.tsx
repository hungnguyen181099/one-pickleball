import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { Grid, GridItem } from '@/components/ui/Grid';
import { Text } from '@/components/ui/Text';

import { AppColors } from '@/constants/theme';

import { LeaderboardItem } from '../../types';

type TopRankingProps = {
  data: LeaderboardItem[];
};

const TopRankingItem = ({ avatar, rank, name, point, tier }: LeaderboardItem) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar src={avatar} size={80} style={styles.image} />
        <View style={styles.rank}>
          <Text style={styles.rankText}>{rank}</Text>
        </View>
      </View>
      <Text ellipsizeMode="tail" numberOfLines={1} size="lg" fontWeight={500}>
        {name}
      </Text>
      <Text size="sm" color="secondary">
        {tier}
      </Text>
      <Text>⭐ {point}</Text>
    </View>
  );
};

const TopRankingItemCenter = ({ avatar, rank, name, point, tier }: LeaderboardItem) => {
  return (
    <View style={centerStyles.container}>
      <MaterialCommunityIcons name="crown-outline" style={centerStyles.crown} />
      <View style={centerStyles.avatar}>
        <Avatar src={avatar} size={96} style={centerStyles.image} />
        <View style={centerStyles.rank}>
          <Text style={centerStyles.rankText}>{rank}</Text>
        </View>
      </View>
      <Text ellipsizeMode="tail" numberOfLines={1} size="lg" fontWeight={500}>
        {name}
      </Text>
      <Text size="sm" color="secondary">
        {tier}
      </Text>
      <Text>⭐ {point}</Text>
    </View>
  );
};

const TopRanking = ({ data }: TopRankingProps) => {
  return (
    <Grid columns={3}>
      {data.map((ranking) => (
        <GridItem key={ranking.rank}>
          {ranking.rank === 1 ? <TopRankingItemCenter {...ranking} /> : <TopRankingItem {...ranking} />}
        </GridItem>
      ))}
    </Grid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: 9999,
    borderWidth: 4,
    padding: 4,
    width: 80,
    height: 80,
    marginBottom: 12,
    borderColor: AppColors.primaryAlpha20,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  rank: {
    position: 'absolute',
    bottom: -12,
    left: 40,
    transform: [{ translateX: '-50%' }],
    backgroundColor: AppColors.primary,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
  rankText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
});

const centerStyles = StyleSheet.create({
  ...styles,
  container: {
    ...styles.container,
    transform: [{ translateY: '-30%' }],
  },
  avatar: {
    ...styles.avatar,
    width: 96,
    height: 96,
    marginBottom: 16,
  },
  rank: {
    ...styles.rank,
    bottom: -16,
    left: 48,
    width: 30,
    height: 30,
  },
  rankText: {
    ...styles.rankText,
    fontSize: 12,
  },
  crown: {
    color: 'gold',
    marginBottom: 8,
    fontSize: 32,
  },
});

export default TopRanking;
