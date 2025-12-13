import React, { useState } from 'react';

import { FlatList, Pressable, StyleSheet, Text } from 'react-native';

import { Radius } from '@/constants/theme';

import { LeaderboardFilter, OCRFilterTier } from '@/features/leaderboard/shared/types';

import { useThemedColors } from '@/hooks/use-theme';

type RankingTierFilterProps = {
  data: LeaderboardFilter[];
  children: (tier: OCRFilterTier) => React.ReactNode;
};

const RankingTierFilter = ({ data, children }: RankingTierFilterProps) => {
  const [tier, setTier] = useState<OCRFilterTier>('');
  const colors = useThemedColors();

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const isActive = item.value === tier;
          return (
            <Pressable
              onPress={() => setTier(item.value)}
              style={[
                styles.item,
                {
                  backgroundColor: isActive ? colors.tint : colors.backgroundTertiary,
                  borderColor: isActive ? colors.tint : colors.border,
                },
              ]}
            >
              <Text>{item.label}</Text>
            </Pressable>
          );
        }}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.value}
        horizontal
        style={styles.container}
      />

      {/* Render props */}
      {children(tier)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    marginTop: 16,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.full,
    borderWidth: 1,
    minWidth: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  contentContainer: {
    gap: 16,
  },
});

export default RankingTierFilter;
