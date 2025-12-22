import { StyleSheet } from 'react-native';

import { AppColors, Radius, Shadows } from '@/constants/theme';

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
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBar: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  scrollContent: {
    padding: 16,
    gap: 24
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
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
  seeAll: {
    color: AppColors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  tournamentsList: {
    gap: 8,
    marginBottom: 8,
  },
  compactCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: Radius.md,
    overflow: 'hidden',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
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
    flex: 1,
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
    padding: 16,
    borderRadius: Radius.lg,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: AppColors.gray100,
    ...Shadows.sm,
  },
  myTournamentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  myTournamentTitle: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  myTournamentStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  myTournamentStatusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  myTournamentDetails: {
    gap: 6,
  },
  myTournamentDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  myTournamentDetailText: {
    fontSize: 13,
    flex: 1,
  },
  myTournamentFooter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: AppColors.gray100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myTournamentCategory: {
    fontSize: 12,
    fontWeight: '500',
  },
  myTournamentDate: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    margin: 16,
    color: AppColors.gray400,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.full,
    borderWidth: 1,
    minWidth: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  IsCategoryChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
  },
});
