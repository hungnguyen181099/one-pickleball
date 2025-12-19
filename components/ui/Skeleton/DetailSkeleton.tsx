import { View, Text } from 'react-native'
import React from 'react'
import { useThemedColors } from '@/hooks/use-theme';
import { Skeleton } from '@/components/ui/Skeleton';
import { styles } from '@/constants/styles/newdetail.styles';

export default function DetailSkeleton() {
    const colors = useThemedColors();
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={{ height: 300, width: '100%', position: 'relative' }}>
                <Skeleton width="100%" height="100%" borderRadius={0} />
                <View style={{ position: 'absolute', top: 50, left: 16 }}>
                    <Skeleton width={40} height={40} borderRadius={20} />
                </View>
            </View>

            <View style={[styles.contentSection, { backgroundColor: colors.card, marginTop: -20, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 16 }]}>
                <Skeleton width={80} height={24} borderRadius={12} style={{ marginBottom: 12 }} />

                <Skeleton width="100%" height={28} borderRadius={4} style={{ marginBottom: 8 }} />
                <Skeleton width="80%" height={28} borderRadius={4} style={{ marginBottom: 24 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                    <Skeleton width={40} height={40} borderRadius={20} style={{ marginRight: 12 }} />
                    <View>
                        <Skeleton width={120} height={16} borderRadius={4} style={{ marginBottom: 4 }} />
                        <Skeleton width={80} height={14} borderRadius={4} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
                    <Skeleton width={60} height={20} borderRadius={4} />
                    <Skeleton width={60} height={20} borderRadius={4} />
                    <Skeleton width={60} height={20} borderRadius={4} />
                </View>

                <Skeleton width="100%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
                <Skeleton width="100%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
                <Skeleton width="100%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
                <Skeleton width="90%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
                <Skeleton width="95%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
            </View>
        </View>
    )
}