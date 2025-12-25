import { Dimensions, StyleSheet } from 'react-native';

import { Radius } from '../theme';

const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  searchSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  featuredSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  featuredCard: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    borderRadius: Radius.md,
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  featuredBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 22,
  },
  categoriesWrapper: {
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
    paddingRight: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    gap: 6,
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  categoryChipActive: {
    backgroundColor: '#00D9B5',
    borderColor: '#00D9B5',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  newsCard: {
    marginBottom: 12,
  },
  newsCardInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f9f9f9',
    borderRadius: Radius.lg,
    overflow: 'hidden',
    padding: 16,
    gap: 16,
    borderWidth: 1,
  },
  newsThumbnail: {
    width: 96,
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  newsContent: {
    flex: 1,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 6,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  newsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
    lineHeight: 18,
  },
  newsDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
    lineHeight: 16,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  author: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  dot: {
    color: '#999',
  },
  time: {
    fontSize: 11,
    color: '#999',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likeBtn: {
    padding: 2,
  },
  statText: {
    fontSize: 11,
    color: '#999',
  },
  readTime: {
    fontSize: 11,
    color: '#999',
    marginLeft: 'auto',
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});
