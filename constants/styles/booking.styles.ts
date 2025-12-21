import { Dimensions, StyleSheet } from 'react-native';

import { AppColors, Radius, Shadows } from '@/constants/theme';

const { width } = Dimensions.get('window');
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
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Progress Steps
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  progressStep: {
    alignItems: 'center',
    gap: 8,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  stepNumberActive: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  stepNumberCompleted: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  stepNumberInactive: {
    backgroundColor: 'transparent',
    borderColor: AppColors.gray300,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '600',
  },
  stepLabel: {
    fontSize: 12,
  },
  progressLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 8,
    alignItems: 'center',
    marginTop: -20,
  },
  progressLineActive: {
    backgroundColor: AppColors.primary,
  },
  progressLineInactive: {
    backgroundColor: AppColors.gray300,
  },

  scrollContent: {
    paddingBottom: 180,
  },

  // Court Summary
  courtSummary: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
  },
  courtSummaryImage: {
    width: 80,
    height: 80,
    borderRadius: Radius.md,
  },
  courtSummaryInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  courtSummaryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  courtSummaryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  courtSummaryMetaText: {
    fontSize: 14,
  },

  // Section
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },

  dateSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  dateCards: {
    borderWidth: 1,
    borderRadius: Radius.md,
    borderColor: AppColors.gray300,
  },
  dateCard: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: Radius.md,
    borderTopRightRadius: Radius.md,
    gap: 4,
    minWidth: 70,
    position: 'relative',
  },

  dateCardActive: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.gray300,
  },
  dateCardInactive: {
    borderColor: AppColors.gray300,
  },
  dateDay: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    padding: 8,
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: '700',
  },
  dateMonth: {
    fontSize: 12,
  },
  dateBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: AppColors.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
    marginTop: 8,
  },
  dateBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
  },

  timePeriod: {
    marginBottom: 20,
  },
  timePeriodTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  timeSlots: {
    gap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeSlot: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: Radius.md,
    borderWidth: 1,
    width: (width - 16 * 2 - 8 * (3 - 1)) / 3,
    position: 'relative',
    marginBottom: 8,
  },
  timeSlotActive: {
    backgroundColor: AppColors.primary,
    borderWidth: 1,
    borderColor: AppColors.primaryDark,
  },
  timeSlotInactive: {
    borderColor: AppColors.gray300,
  },
  timeSlotUnavailable: {
    backgroundColor: AppColors.gray100,
    borderColor: AppColors.gray200,
    opacity: 0.5,
  },
  timeSlotPopular: {
    borderColor: AppColors.warning,
    borderWidth: 2,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  timePrice: {
    fontSize: 12,
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: AppColors.warning,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  popularBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },

  // Duration Selector
  durationSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  durationBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  durationBtnActive: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  durationBtnInactive: {
    borderColor: AppColors.gray300,
  },
  durationBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Court Selector
  courtSelector: {
    gap: 12,
  },
  courtOption: {
    borderRadius: Radius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  courtOptionActive: {
    borderColor: AppColors.primary,
    borderWidth: 1.5,
  },
  courtOptionInactive: {
    borderColor: AppColors.gray300,
  },
  courtOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  courtOptionInfo: {
    flex: 1,
    gap: 4,
  },
  courtOptionName: {
    fontSize: 16,
    fontWeight: '600',
  },
  courtOptionDesc: {
    fontSize: 13,
  },
  courtOptionStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  courtOptionStatusAvailable: {
    backgroundColor: `${AppColors.success}20`,
  },
  courtOptionStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: AppColors.success,
  },

  // Notes
  notesInput: {
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
  },

  // Sticky Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    ...Shadows.lg,
  },
  bookingSummary: {
    gap: 8,
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceHighlight: {
    fontSize: 18,
    fontWeight: '700',
    color: AppColors.primary,
  },
  continueBtn: {
    backgroundColor: AppColors.primary,
    paddingVertical: 14,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
