import { styles as newsStyles } from '@/constants/styles/news.styles';
import { useThemedColors } from '@/hooks/use-theme';
import React from 'react';
import { View } from 'react-native';
import { Skeleton } from './Skeleton';

export default function CardSkeleton() {
    const colors = useThemedColors();

    return (
        <View style={[newsStyles.newsCard, { marginBottom: 16 }]}>
            <View style={[newsStyles.newsCardInner, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
                {/* Thumbnail Skeleton */}
                <View style={newsStyles.newsThumbnail}>
                    <Skeleton width="100%" height="100%" borderRadius={12} />
                </View>

                {/* Content Skeleton */}
                <View style={newsStyles.newsContent}>
                    {/* Title Skeleton */}
                    <Skeleton width="100%" height={20} borderRadius={4} style={{ marginBottom: 4 }} />
                    <Skeleton width="80%" height={20} borderRadius={4} style={{ marginBottom: 8 }} />

                    {/* Meta Info Skeleton */}
                    <View style={newsStyles.metaInfo}>
                        <Skeleton width={80} height={14} borderRadius={4} style={{ marginRight: 8 }} />
                        <Skeleton width={60} height={14} borderRadius={4} />
                    </View>

                    {/* Stats Skeleton */}
                    <View style={[newsStyles.stats, { marginTop: 8 }]}>
                        <View style={newsStyles.statItem}>
                            <Skeleton width={40} height={14} borderRadius={4} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
