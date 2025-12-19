import { getStadiumListStyles } from '@/features/stadiums/list/components/StadiumsList/StadiumsList.styles';
import { useThemedColors } from '@/hooks/use-theme';
import { useGetStyles } from '@/hooks/useGetStyles';
import React from 'react';
import { View } from 'react-native';
import { Flex } from '../Flex';
import { Skeleton } from './index';

export default function StadiumCardSkeleton() {
    const styles = useGetStyles(getStadiumListStyles);
    const colors = useThemedColors();

    return (
        <View style={styles.card}>
            {/* Image Placeholder */}
            <View style={{ aspectRatio: 1 / 1, maxHeight: 512, width: '100%', position: 'relative' }}>
                <Skeleton width="100%" height="100%" borderRadius={0} />
                {/* Rating Badge */}
                <View style={{ position: 'absolute', top: 16, right: 16 }}>
                    <Skeleton width={80} height={32} borderRadius={16} />
                </View>
            </View>

            <View style={styles.body}>
                {/* Name */}
                <Skeleton width="70%" height={24} borderRadius={4} />

                {/* Address */}
                <Flex gap={8} alignItems="center">
                    <Skeleton width={16} height={16} borderRadius={8} />
                    <Skeleton width="90%" height={16} borderRadius={4} />
                </Flex>

                {/* Time */}
                <Flex gap={8} alignItems="center">
                    <Skeleton width={16} height={16} borderRadius={8} />
                    <Skeleton width="60%" height={16} borderRadius={4} />
                </Flex>

                {/* Amenities */}
                <View style={styles.amenity}>
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} width={80} height={28} borderRadius={8} />
                    ))}
                </View>

                {/* Separator */}
                <View style={[styles.cardSeparator, { opacity: 1, backgroundColor: 'transparent' }]}>
                    <Skeleton width="100%" height={1} borderRadius={0} />
                </View>

                {/* CTA */}
                <Skeleton width="100%" height={52} borderRadius={26} />
            </View>
        </View>
    );
}
