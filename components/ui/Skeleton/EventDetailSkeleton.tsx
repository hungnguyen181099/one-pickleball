import { Grid, GridItem } from '@/components/ui/Grid';
import { Skeleton } from '@/components/ui/Skeleton';
import { styles } from '@/constants/styles/eventdeatil.styles';
import { useThemedColors } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

const EventDetailSkeleton = () => {
    const colors = useThemedColors();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Skeleton */}
                <View style={styles.headerContainer}>
                    <Skeleton width="100%" height="100%" borderRadius={0} />
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8} style={styles.backBtn}>
                        <Ionicons name="chevron-back" size={28} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Status & Title Skeleton */}
                <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
                    <View style={styles.statusBadge}>
                        <Skeleton width={8} height={8} borderRadius={4} style={{ marginRight: 8 }} />
                        <Skeleton width={100} height={14} borderRadius={4} />
                    </View>
                    <Skeleton width="90%" height={32} borderRadius={8} style={{ marginBottom: 8 }} />
                    <Skeleton width="60%" height={32} borderRadius={8} />
                </View>

                {/* Info Cards Grid Skeleton */}
                <Grid columns={2} gap={8} style={styles.infoCardsGrid}>
                    {[1, 2, 3, 4].map((index) => (
                        <GridItem key={index}>
                            <View
                                style={[styles.infoCard, { backgroundColor: colors.backgroundTertiary, borderColor: colors.border }]}
                            >
                                <Skeleton width={24} height={24} borderRadius={12} style={{ marginBottom: 8 }} />
                                <Skeleton width={60} height={12} borderRadius={4} style={{ marginBottom: 6 }} />
                                <Skeleton width={80} height={14} borderRadius={4} />
                            </View>
                        </GridItem>
                    ))}
                </Grid>

                {/* Tabs Skeleton */}
                <View style={[styles.tabsContainer, { backgroundColor: colors.card, borderBottomColor: colors.border, marginTop: 24, paddingVertical: 10 }]}>
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} width={70} height={30} borderRadius={4} />
                    ))}
                </View>

                {/* Content Section Skeleton */}
                <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
                    <Skeleton width={120} height={20} borderRadius={4} style={{ marginBottom: 14 }} />
                    <Skeleton width="100%" height={14} borderRadius={4} style={{ marginBottom: 8 }} />
                    <Skeleton width="100%" height={14} borderRadius={4} style={{ marginBottom: 8 }} />
                    <Skeleton width="95%" height={14} borderRadius={4} style={{ marginBottom: 8 }} />
                    <Skeleton width="90%" height={14} borderRadius={4} style={{ marginBottom: 12 }} />
                </View>

                {/* Content Section Skeleton 2 */}
                <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
                    <Skeleton width={140} height={20} borderRadius={4} style={{ marginBottom: 14 }} />
                    <Skeleton width="100%" height={60} borderRadius={8} style={{ marginBottom: 10 }} />
                    <Skeleton width="100%" height={60} borderRadius={8} style={{ marginBottom: 10 }} />
                </View>

            </ScrollView>

            {/* Footer Skeleton */}
            <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
                <View style={styles.footerInfo}>
                    <View>
                        <Skeleton width={30} height={12} borderRadius={4} style={{ marginBottom: 4 }} />
                        <Skeleton width={100} height={24} borderRadius={4} />
                    </View>
                    <View style={styles.deadlineInfo}>
                        <Skeleton width={18} height={18} borderRadius={9} style={{ marginRight: 8 }} />
                        <Skeleton width={150} height={12} borderRadius={4} />
                    </View>
                </View>
                <Skeleton width="100%" height={50} borderRadius={8} />
            </View>
        </View>
    );
};

export default EventDetailSkeleton;
