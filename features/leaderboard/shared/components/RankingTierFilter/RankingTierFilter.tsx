import React, { useState } from 'react';

import { FlatList, StyleSheet } from 'react-native';

import { Chip } from '@/components/ui/Chip';

type RankingTierFilterProps = {
  data: {
    label: string;
    value: string;
  }[];
  children: (tier: string) => React.ReactNode;
};

const RankingTierFilter = ({ data, children }: RankingTierFilterProps) => {
  const [tier, setTier] = useState<string>('');

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const isActive = item.value === tier;

          return (
            <Chip
              size="sm"
              variant="light"
              checked={isActive}
              onPress={() => setTier(item.value)}
              styleOverrides={{
                container: styles.chip,
              }}
            >
              {item.label}
            </Chip>
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
  chip: {
    minWidth: 100,
  },
  contentContainer: {
    gap: 16,
  },
});

export default RankingTierFilter;
