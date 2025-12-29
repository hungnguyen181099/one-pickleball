
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Radius } from '@/constants/theme';
import { useThemedColors } from '@/hooks/use-theme';
import Skeleton from './Skeleton';

const TournamentCardSkeleton = () => {
    const colors = useThemedColors();

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                },
            ]}
        >
            <View style={styles.imageContainer}>
                <Skeleton width="100%" height="100%" borderRadius={0} />
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    {/* Title */}
                    <Skeleton width="80%" height={24} borderRadius={4} />

                    {/* Date */}
                    <View style={styles.row}>
                        <Skeleton width={18} height={18} borderRadius={4} />
                        <Skeleton width={120} height={14} borderRadius={4} />
                    </View>

                    {/* Location */}
                    <View style={styles.row}>
                        <Skeleton width={18} height={18} borderRadius={4} />
                        <Skeleton width={150} height={14} borderRadius={4} />
                    </View>
                </View>

                {/* Separator - just space or line */}
                <View style={{ height: 1, width: '100%', backgroundColor: colors.border, marginVertical: 4, opacity: 0.5 }} />

                <View style={styles.footer}>
                    <View>
                        {/* Price Label */}
                        <Skeleton width={60} height={10} borderRadius={4} style={{ marginBottom: 4 }} />
                        {/* Price Value */}
                        <Skeleton width={90} height={16} borderRadius={4} />
                    </View>

                    {/* Button */}
                    <Skeleton width={100} height={36} borderRadius={Radius.full} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
    },
    imageContainer: {
        height: 160,
        width: '100%',
    },
    content: {
        padding: 16,
        gap: 12,
    },
    header: {
        gap: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 4,
    },
});

export default TournamentCardSkeleton;
