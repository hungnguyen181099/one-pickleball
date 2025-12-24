import React from 'react';

import { StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { Text } from '@/components/ui/Text';

import { AppColors, Radius, ThemeColors } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { LeaderboardItem } from '../../types';

const MyRanking = ({ avatar, point, name, tier }: LeaderboardItem) => {
  const styles = getStyles({ colors: useThemedColors() });

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        {/* Left */}
        <View style={styles.left}>
          <View style={styles.avatar}>
            <Avatar src={avatar} size={48} />
            <View>
              <Text size="h4">{name}</Text>
              <Text size="sm" color="primaryForeground">
                {tier}
              </Text>
            </View>
          </View>
        </View>

        {/* Right */}
        <View style={styles.right}>
          <Text size="sm" color="primary" style={styles.point}>
            ⭐ {point}
          </Text>
        </View>
      </View>
    </View>
  );
};

const getStyles = ({ colors }: { colors: ThemeColors }) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 24,
      left: 20,
      right: 20,
      borderRadius: 24,
      overflow: 'hidden',
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
    right: {
      borderRadius: Radius.full,
      overflow: 'hidden',
    },
    point: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.card,
    },
  });

export default MyRanking;
