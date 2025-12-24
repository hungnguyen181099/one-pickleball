import React from 'react';

import { StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Grid, GridItem } from '@/components/ui/Grid';
import { Text } from '@/components/ui/Text';

import { ThemeColors } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { LeaderboardItem } from '../../types';

type OtherRankingProps = {
  data: LeaderboardItem[];
};

const OtherRankingItem = ({ avatar, rank, name, tier, point }: LeaderboardItem) => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <Card padding={24} radius="lg" style={styles.item}>
      {/* Left */}
      <View style={styles.left}>
        <Text style={styles.rank}>{rank}</Text>
        <View style={styles.avatar}>
          <Avatar src={avatar} size={48} />
          <View style={styles.info}>
            <Text ellipsizeMode="tail" numberOfLines={2} size="h4">
              {name}
            </Text>
            <Text size="sm" color="secondary">
              {tier}
            </Text>
          </View>
        </View>
      </View>

      {/* Right */}
      <Badge
        variant="light"
        styleOverrides={{
          container: styles.point,
        }}
      >
        ⭐ {point}
      </Badge>
    </Card>
  );
};

const OtherRanking = ({ data }: OtherRankingProps) => {
  return (
    <Grid columns={1} gap={8}>
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
    item: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
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
    point: {
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
  });

export default OtherRanking;
