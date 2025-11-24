import { AppColors, Radius, Shadows } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
    },
    backBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    searchBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Filter Bar
    filterBar: {
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    filterContent: {
        paddingHorizontal: 16,
        gap: 8,
    },
    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: Radius.full,
        borderWidth: 1,
        gap: 6,
    },
    filterChipText: {
        fontSize: 14,
        fontWeight: '500',
    },

    scrollContent: {
    },

    section: {
        paddingHorizontal: 16,
        marginTop: 24,
    },
    lastSection: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
    },
    resultsBadge: {
        backgroundColor: `${AppColors.primary}20`,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: Radius.full,
    },
    resultsBadgeText: {
        color: AppColors.primary,
        fontSize: 12,
        fontWeight: '600',
    },
    seeAll: {
        color: AppColors.primary,
        fontSize: 14,
        fontWeight: '600',
    },


    featuredCard: {
        marginTop: 12,
        ...Shadows.lg,
        borderRadius: Radius.lg,
        overflow: 'hidden',
    },
    featuredCardInner: {

    },
    featuredImageContainer: {
        width: '100%',
        height: 200,
        position: 'relative',
    },
    featuredImage: {
        width: '100%',
        height: '100%',
    },
    featuredGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
    },
    featuredBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: Radius.full,
    },
    featuredBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    favoriteBtn: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 40,
        height: 40,
        borderRadius: Radius.full,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    featuredContent: {
        padding: 16,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: Radius.full,
        marginBottom: 12,
    },
    statusBadgeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    featuredTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 8,
    },
    featuredDesc: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
    },
    featuredMeta: {
        gap: 8,
        marginBottom: 16,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    metaText: {
        fontSize: 14,
    },
    featuredStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: AppColors.gray200,
    },
    statItem: {
        flex: 1,
    },
    statLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '700',
    },
    prizeValue: {
        color: AppColors.primary,
    },
    registerBtn: {
        backgroundColor: AppColors.primary,
        paddingVertical: 14,
        borderRadius: Radius.md,
        alignItems: 'center',
    },
    registerBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    tournamentsList: {
        gap: 12,
        marginBottom: 12
    },

    compactCardInner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 12,
        ...Shadows.sm,
        borderRadius: Radius.md,
        overflow: 'hidden',
    },
    compactImageContainer: {
        width: 80,
        height: 80,
        borderRadius: Radius.sm,
        overflow: 'hidden',
        position: 'relative',
    },
    compactImage: {
        width: '100%',
        height: '100%',
    },
    compactStatus: {
        position: 'absolute',
        top: 6,
        left: 6,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: Radius.sm,
    },
    compactStatusText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '600',
    },
    compactContent: {
        flex: 1,
        gap: 4,
    },
    compactTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
    },
    compactMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    compactMetaText: {
        fontSize: 13,
    },
    compactPrize: {
        marginTop: 4,
    },
    compactPrizeText: {
        color: AppColors.primary,
        fontSize: 14,
        fontWeight: '700',
    },

    myTournamentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: Radius.md,
        gap: 12,
        ...Shadows.sm,
    },
    myTournamentIcon: {
        width: 48,
        height: 48,
        borderRadius: Radius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    myTournamentInfo: {
        flex: 1,
    },
    myTournamentTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
    },
    myTournamentStatus: {
        fontSize: 13,
    },
    myTournamentDate: {
        fontSize: 13,
    },

    emptyText: {
        fontSize: 14,
        textAlign: 'center',
        margin: 16,
        color: AppColors.gray400,
    },
});
