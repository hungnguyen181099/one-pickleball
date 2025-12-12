import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { Grid, GridItem } from '@/components/ui/Grid';

import { AppColors } from '@/constants/theme';

import { Ranking } from '../../types';

type TopRankingProps = {
  data: Ranking[];
};

const TopRankingItem = ({ avatar, rank, name, elo }: Ranking) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar src={avatar} style={styles.image} />
        <View style={styles.rank}>
          <Text style={styles.rankText}>{rank}</Text>
        </View>
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text>⭐ {elo}</Text>
    </View>
  );
};

const TopRankingItemCenter = ({ avatar, rank, name, elo }: Ranking) => {
  return (
    <View style={centerStyles.container}>
      <MaterialCommunityIcons name="crown-outline" style={centerStyles.crown} />
      <View style={centerStyles.avatar}>
        <Avatar src={avatar} style={styles.image} />
        <View style={centerStyles.rank}>
          <Text style={centerStyles.rankText}>{rank}</Text>
        </View>
      </View>
      <Text style={centerStyles.name}>{name}</Text>
      <Text>⭐ {elo}</Text>
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
    borderColor: `${AppColors.primary}20`,
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
  name: {
    fontSize: 18,
    fontWeight: 600,
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
