import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  filterBar: {
    paddingLeft: 16,
    marginBottom: 12,
    height: 50,
  },
  filterContent: {
    gap: 8,
    paddingRight: 20,
  },
  filterChip: {
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
  filterChipActive: {
    backgroundColor: '#00D9B5',
    borderColor: '#00D9B5',
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  filterLabelActive: {
    color: '#fff',
  },
  viewToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  toggleBtns: {
    flexDirection: 'row',
    gap: 4,
  },
  toggleBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: '#f0f0f0',
  },
  resultCount: {
    fontSize: 13,
    color: '#666',
  },
  resultCountBold: {
    fontWeight: '700',
    color: '#000',
  },
  courtsList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  courtCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  courtCardPremium: {
    borderWidth: 2,
    borderColor: '#00D9B5',
  },
  premiumBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#00D9B5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 10,
  },
  premiumBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  courtImage: {
    width: '100%',
    height: 160,
  },
  favoriteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  courtContent: {
    padding: 12,
  },
  courtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  courtInfo: {
    flex: 1,
  },
  courtName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingScore: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  reviewCount: {
    fontSize: 12,
    color: '#999',
  },
  price: {
    alignItems: 'flex-end',
  },
  priceAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00D9B5',
  },
  priceUnit: {
    fontSize: 11,
    color: '#999',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
  },
  distance: {
    fontSize: 12,
    color: '#999',
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  featureTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featureText: {
    fontSize: 11,
    color: '#666',
  },
  featureMore: {
    fontSize: 11,
    fontWeight: '600',
    color: '#00D9B5',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  bookBtn: {
    backgroundColor: '#00D9B5',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookBtnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#00D9B5',
  },
  bookBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  bookBtnTextOutline: {
    color: '#00D9B5',
  },
});
