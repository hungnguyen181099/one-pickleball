import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 0,
    },
    clearBtn: {
        padding: 4,
        marginLeft: 8,
    },
    filterContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    filterScroll: {
        flexDirection: 'row',
        gap: 8,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
    filterChipActive: {
        backgroundColor: '#00D9B520',
        borderColor: '#00D9B5',
    },
    filterChipText: {
        fontSize: 14,
        fontWeight: '500',
    },
    filterChipTextActive: {
        color: '#00D9B5',
    },
    resultsContainer: {
        paddingHorizontal: 20,
    },
    resultsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    resultsCount: {
        fontSize: 14,
    },
    sortBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    sortText: {
        fontSize: 14,
    },
    resultItem: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
    },
    resultImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    resultContent: {
        flex: 1,
    },
    resultType: {
        fontSize: 11,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    resultDescription: {
        fontSize: 13,
        lineHeight: 18,
        marginBottom: 6,
    },
    resultMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: 12,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    emptyMessage: {
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    recentSearches: {
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    recentTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    recentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    recentText: {
        fontSize: 15,
        marginLeft: 12,
    },
});
