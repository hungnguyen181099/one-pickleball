import React from 'react';

import { ScrollView, View } from 'react-native';

import { Flex } from '@/components/ui/Flex';
import { Grid, GridItem } from '@/components/ui/Grid';
import Skeleton from '@/components/ui/Skeleton/Skeleton';

import { useThemedColors } from '@/hooks/use-theme';
import { useGetStyles } from '@/hooks/useGetStyles';
import { getStadiumScreenStyles } from '@/features/stadiums/pages/detail/components/StadiumScreen/StadiumScreen.styles';
import { getStadiumRibbonStyles } from '@/features/stadiums/pages/detail/components/StadiumRibbon/StadiumRibbon.styles';

const StadiumSkeleton = () => {
  const styles = useGetStyles(getStadiumScreenStyles);
  const ribbonStyles = useGetStyles(getStadiumRibbonStyles);
  const colors = useThemedColors();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image Skeleton */}
        <View style={{ aspectRatio: 4 / 3, maxHeight: 384, width: '100%' }}>
          <Skeleton width="100%" height="100%" borderRadius={0} />
        </View>

        <View style={styles.body}>
          {/* Ribbon Skeleton - mimicking the negative margin and curve */}
          <View style={ribbonStyles.container} />

          {/* Header Skeleton */}
          <Flex direction="column" alignItems="flex-start" gap={16} style={{ marginTop: 8 }}>
            {/* Open State */}
            <Skeleton width={100} height={20} borderRadius={4} />

            {/* Title */}
            <Skeleton width="70%" height={32} borderRadius={8} />

            {/* Courts Count */}
            <Flex>
              <Skeleton width={20} height={20} borderRadius={10} style={{ marginRight: 8 }} />
              <Skeleton width={150} height={16} borderRadius={4} />
            </Flex>

            {/* Action Buttons */}
            <Grid columns={2} gap={8}>
              <GridItem>
                <Skeleton width="100%" height={48} borderRadius={8} />
              </GridItem>
              <GridItem>
                <Skeleton width="100%" height={48} borderRadius={8} />
              </GridItem>
            </Grid>

            {/* Rating Card */}
            <View style={{ width: '100%', padding: 16, borderRadius: 12, backgroundColor: colors.card, gap: 12 }}>
              <Flex justifyContent="space-between">
                <View>
                  <Flex gap={4}>
                    <Skeleton width={40} height={24} borderRadius={4} />
                    <Skeleton width={24} height={24} borderRadius={12} />
                  </Flex>
                  <Skeleton width={100} height={14} borderRadius={4} style={{ marginTop: 4 }} />
                </View>
                <Skeleton width={80} height={14} borderRadius={4} />
              </Flex>
            </View>

            {/* Address/Time Card */}
            <View style={{ width: '100%', padding: 16, borderRadius: 12, backgroundColor: colors.card, gap: 16 }}>
              <Flex gap={16}>
                <Skeleton width={40} height={40} borderRadius={20} />
                <View style={{ flex: 1 }}>
                  <Skeleton width="90%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
                  <Skeleton width="60%" height={16} borderRadius={4} />
                </View>
              </Flex>
              <View style={{ height: 1, backgroundColor: colors.border }} />
              <Flex gap={16}>
                <Skeleton width={40} height={40} borderRadius={20} />
                <View style={{ flex: 1 }}>
                  <Skeleton width="80%" height={16} borderRadius={4} />
                </View>
              </Flex>
            </View>
          </Flex>

          {/* Amenities Skeleton */}
          <View style={{ marginTop: 24 }}>
            <Skeleton width={120} height={24} borderRadius={4} style={{ marginBottom: 16 }} />
            <Grid columns={4} gap={16}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <GridItem key={i}>
                  <Skeleton width="100%" style={{ aspectRatio: 1 }} borderRadius={12} />
                </GridItem>
              ))}
            </Grid>
          </View>

          {/* Courts Skeleton */}
          <View style={{ marginTop: 24 }}>
            <Skeleton width={120} height={24} borderRadius={4} style={{ marginBottom: 16 }} />
            {[1, 2].map((i) => (
              <View
                key={i}
                style={{
                  marginBottom: 12,
                  width: '100%',
                  height: 80,
                  borderRadius: 12,
                  backgroundColor: colors.card,
                  padding: 12,
                }}
              >
                <Flex gap={12}>
                  <Skeleton width={56} height={56} borderRadius={8} />
                  <View style={{ flex: 1 }}>
                    <Skeleton width="60%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
                    <Skeleton width="40%" height={14} borderRadius={4} />
                  </View>
                </Flex>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer Skeleton */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderTopWidth: 1,
          borderTopColor: colors.inputBorder,
          backgroundColor: colors.backgroundTertiary, // Assuming backgroundTertiary matches container
        }}
      >
        <Skeleton width="100%" height={56} borderRadius={30} />
      </View>
    </View>
  );
};

export default StadiumSkeleton;
