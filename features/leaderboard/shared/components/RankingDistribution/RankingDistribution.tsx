import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Flex } from '@/components/ui/Flex';
import { Grid, GridItem } from '@/components/ui/Grid';
import { Icon } from '@/components/ui/Icon';
import { Separator } from '@/components/ui/Separator';
import { Text } from '@/components/ui/Text';

import { Radius, ThemeColors } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { LeaderboardDistribution } from '../../types';

type RankingDistributionProps = {
  data: LeaderboardDistribution[];
};

const RankingDistribution = ({ data }: RankingDistributionProps) => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <View style={styles.container}>
      <Text size="h1" color="primary" style={styles.title}>
        Thống kê
      </Text>
      <Grid columns={1} gap={8}>
        {data.map((item, index) => (
          <GridItem key={item.rank}>
            <View style={styles.item}>
              {/* Header */}
              <Flex justifyContent="space-between">
                <Flex>
                  <Icon color="secondary">
                    <MaterialIcons name="sports-tennis" size={20} />
                  </Icon>
                  <Text size="h3">{item.rank}</Text>
                </Flex>
                <Badge color="secondary">
                  <Text size="sm" color="secondary" fontWeight={500}>
                    Cấp {index + 1}
                  </Text>
                </Badge>
              </Flex>

              {/* Separator */}
              <Separator marginVertical={16} />

              {/* Info */}
              <Flex style={styles.infoContainer}>
                <Flex direction="column" style={styles.info}>
                  <Text color="secondary" size="h6" style={styles.infoLabel}>
                    Người chơi
                  </Text>
                  <Text size="h2">{item.playerCount}</Text>
                </Flex>

                <Separator orientation="vertical" />

                <Flex direction="column" style={styles.info}>
                  <Text color="secondary" size="h6" style={styles.infoLabel}>
                    Thấp nhất
                  </Text>
                  <Text size="h2">{item.minPoint}</Text>
                </Flex>

                <Separator orientation="vertical" />

                <Flex direction="column" style={styles.info}>
                  <Text color="primary" size="h6" style={styles.infoLabel}>
                    Cao nhất
                  </Text>
                  <Text size="h2" color="primary">
                    {item.maxPoint}
                  </Text>
                </Flex>
              </Flex>
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
      marginBottom: 16,
      textAlign: 'center',
    },
    item: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: Radius.lg,
      padding: 24,
      backgroundColor: colors.card,
    },
    icon: {
      width: 48,
      height: 48,
      paddingVertical: 0,
      paddingHorizontal: 0,
    },
    infoContainer: {
      flex: 1,
    },
    info: {
      flex: 1,
    },
    infoLabel: {
      textTransform: 'uppercase',
    },
  });

export default RankingDistribution;
