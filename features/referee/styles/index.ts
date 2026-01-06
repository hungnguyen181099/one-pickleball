import { Dimensions, StyleSheet } from 'react-native';

import { COLORS, RADIUS } from '../constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  bgPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  appContainer: {
    flex: 1,
  },

  // Header styles
  header: {
    alignItems: 'center',
    gap: 20,
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 33, 64, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
  },
  btnBack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: RADIUS.md,
  },
  btnBackText: {
    color: COLORS.textWhite,
    fontSize: 14,
    fontWeight: '600',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIconText: {
    fontSize: 18,
    color: COLORS.textWhite,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryLight,
  },
  headerCenter: {
    alignItems: 'center',
    gap: 8,
  },
  matchTimerBox: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    backgroundColor: COLORS.primaryDark,
    borderRadius: RADIUS.lg,
  },
  timerLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '600',
  },
  timerValue: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.textWhite,
    letterSpacing: 3,
    fontFamily: 'monospace',
  },
  matchInfo: {
    alignItems: 'center',
    gap: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.bgCard,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.warning,
  },
  statusDotLive: {
    backgroundColor: COLORS.danger,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  gameBadge: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  gameBadgeStrong: {
    color: COLORS.accent,
    fontWeight: '800',
  },
  gameScoreDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  gameScoreItem: {
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: '700',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  gameScoreItemLeft: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    color: COLORS.teamBlue,
  },
  gameScoreItemRight: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    color: COLORS.teamRed,
  },
  gameScoreSeparator: {
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  gameModeSwitch: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  modeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.sm,
  },
  modeBtnActive: {
    backgroundColor: COLORS.primary,
  },
  modeBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  modeBtnTextActive: {
    color: COLORS.textWhite,
  },
  refereeInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(0, 139, 185, 0.1)',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  refereeAvatarSm: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.primary,
  },
  refereeAvatarText: {
    fontSize: 14,
    color: COLORS.textWhite,
  },
  refereeDetails: {
    flexDirection: 'column',
  },
  refereeNameSm: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  refereeRole: {
    fontSize: 10,
    color: COLORS.textMuted,
  },

  // Main content styles
  mainContent: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  landscapeMain: {
    flexDirection: 'row',
    gap: 12,
  },
  landscapeLeftColumn: {
    flex: 1.3,
  },
  landscapeRightColumn: {
    flex: 1,
    gap: 8,
  },
  // New 3-column landscape layout styles
  landscapeContainer: {
    flex: 1,
    padding: 8,
  },
  landscapeGridMain: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  landscapeTeamColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  landscapeCenterColumn: {
    flex: 0.9,
    padding: 4,
  },
  landscapeCenterScoreCall: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  landscapeCenterScoreLabel: {
    fontSize: 9,
    color: COLORS.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  landscapeCenterScoreValue: {
    fontFamily: 'monospace',
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.accent,
    letterSpacing: 2,
  },
  landscapeVsCenterCompact: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  landscapeVsBadgeSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  landscapeVsBadgeTextSmall: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.textWhite,
  },
  landscapeSwitchBtnCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: RADIUS.sm,
  },
  landscapeSwitchBtnTextCompact: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  landscapeTeamCard: {
    flex: 1,
  },
  landscapeTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 8,
  },
  landscapeCenterGrid: {
    flex: 1,
  },
  landscapeHeader: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    position: 'relative',
  },
  landscapeHeaderCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    pointerEvents: 'none',
  },
  landscapeHeaderRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 8,
    zIndex: 1,
  },
  landscapeGameModeSwitch: {
    padding: 2,
    marginRight: 8,
  },
  landscapeRefereeAvatar: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  landscapeRefereeInfoHeader: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    gap: 6,
    height: 32,
  },
  rotateBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginLeft: 8,
  },
  landscapeRefereeNameSm: {
    fontSize: 11,
  },
  landscapeRefereeRole: {
    fontSize: 9,
  },
  landscapeMatchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  landscapeScoreBoard: {
    marginBottom: 0,
    gap: 6,
  },
  landscapeCourtIconLg: {
    width: 24,
    height: 24,
  },
  landscapeCourtNumber: {
    fontSize: 12,
  },
  landscapeVsCenter: {
    marginVertical: 4,
    height: 40,
  },
  landscapeVsBadge: {
    width: 24,
    height: 24,
  },
  landscapeTeamScore: {
    fontSize: 32,
    lineHeight: 36,
  },
  landscapeControlPanel: {
    marginTop: 0,
    gap: 6,
  },
  landscapeHistoryList: {
    maxHeight: 100,
  },
  landscapeHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    zIndex: 1,
  },
  landscapeMatchTimerBox: {
    paddingVertical: 1,
    paddingHorizontal: 6,
  },
  landscapeTimerValue: {
    fontSize: 18,
  },
  landscapeStatusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  landscapeStatusText: {
    fontSize: 11,
  },
  landscapeGameBadge: {
    fontSize: 11,
  },
  landscapeScoreCallBar: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginBottom: 2,
  },
  landscapeScoreCallValue: {
    fontSize: 18,
    letterSpacing: 2,
  },
  landscapeCourtInfoBar: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginBottom: 4,
    height: 32,
  },
  landscapeTeamHeader: {
    marginBottom: 4,
    marginTop: 0,
    gap: 6,
  },
  landscapeTeamAvatar: {
    width: 24,
    height: 24,
  },
  landscapeTeamName: {
    fontSize: 13,
  },
  landscapeTeamScoreSection: {
    paddingVertical: 2,
    marginBottom: 4,
  },
  landscapeScoreLabel: {
    fontSize: 9,
    marginTop: 0,
  },
  landscapePlayersSection: {
    marginBottom: 4,
  },
  landscapePlayerCard: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    gap: 6,
  },
  landscapePlayerName: {
    fontSize: 11,
  },
  landscapePlayerPosition: {
    fontSize: 9,
  },
  landscapeScoreControls: {
    gap: 4,
  },
  landscapeBtnScore: {
    height: 32,
  },
  landscapeBtnScoreText: {
    fontSize: 11,
  },
  landscapeControlCardHeader: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  landscapeControlCardBody: {
    padding: 8,
  },
  landscapeBtnGame: {
    paddingVertical: 8,
    minHeight: 48,
  },
  landscapeBtnQuick: {
    paddingVertical: 8,
  },
  landscapeHistoryItem: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 4,
  },

  // Completed results styles
  completedResults: {
    marginTop: 20,
    padding: 20,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.success,
    alignItems: 'center',
  },
  completedTitle: {
    color: COLORS.success,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  completedTournament: {
    marginBottom: 16,
    alignItems: 'center',
  },
  tournamentName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  tournamentRound: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  tournamentRoundAccent: {
    color: COLORS.accent,
    fontWeight: '600',
  },
  winnerText: {
    fontSize: 20,
    color: COLORS.textWhite,
    marginBottom: 8,
  },
  winnerName: {
    fontWeight: '700',
    color: COLORS.accent,
  },
  scoreText: {
    fontSize: 16,
    color: COLORS.textLight,
  },

  // Score call bar
  scoreCallBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginBottom: 16,
  },
  scoreCallLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  scoreCallValue: {
    fontFamily: 'monospace',
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.accent,
    letterSpacing: 4,
  },

  // Court info bar
  courtInfoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginBottom: 20,
  },
  courtDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  courtIconLg: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courtIconText: {
    fontSize: 20,
    color: COLORS.textWhite,
  },
  courtText: {
    flexDirection: 'column',
  },
  courtLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  courtNumber: {
    fontFamily: 'monospace',
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.primaryLight,
  },
  courtDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.borderColor,
  },
  tournamentInfo: {
    flexDirection: 'column',
    gap: 2,
  },

  // Scoreboard main
  scoreboardMain: {
    gap: 16,
    marginBottom: 20,
  },

  // Team card
  teamCard: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.xl,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.borderLight,
    overflow: 'hidden',
  },
  teamCardServing: {
    borderColor: COLORS.primary,
  },
  teamCardTopBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  teamCardTopBorderBlue: {
    backgroundColor: COLORS.teamBlue,
  },
  teamCardTopBorderRed: {
    backgroundColor: COLORS.teamRed,
  },
  servingIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
  },
  servingIndicatorText: {
    color: COLORS.textWhite,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    marginTop: 8,
  },
  teamAvatar: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamAvatarBlue: {
    backgroundColor: COLORS.teamBlue,
  },
  teamAvatarRed: {
    backgroundColor: COLORS.teamRed,
  },
  teamAvatarText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textWhite,
  },
  teamScoreSection: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  teamScore: {
    fontFamily: 'monospace',
    fontSize: 72,
    fontWeight: '700',
    lineHeight: 80,
  },
  teamScoreBlue: {
    color: COLORS.teamBlue,
  },
  teamScoreRed: {
    color: COLORS.teamRed,
  },
  scoreLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 6,
  },
  serverNumberDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
  },
  serverLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  serverValue: {
    fontFamily: 'monospace',
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  playersSection: {
    marginBottom: 20,
  },
  playersTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  playersTitleText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 14,
  },
  playersGrid: {
    gap: 8,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: COLORS.bgDark,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  playerCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(0, 139, 185, 0.1)',
  },
  playerStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.textMuted,
  },
  playerStatusActive: {
    backgroundColor: COLORS.secondary,
  },
  playerDetails: {
    flex: 1,
  },
  playerName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  playerNameActive: {
    color: COLORS.textWhite,
  },
  playerPosition: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  playerTag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 139, 185, 0.2)',
    borderRadius: 16,
  },
  playerTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primaryLight,
  },
  scoreControls: {
    flexDirection: 'row',
    gap: 10,
  },
  btnScore: {
    flex: 1,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  btnScoreAdd: {
    backgroundColor: COLORS.success,
  },
  btnScoreSubtract: {
    backgroundColor: COLORS.bgDarker,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  btnScoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  btnScoreTextMuted: {
    color: COLORS.textMuted,
  },
  btnScoreDisabled: {
    opacity: 0.5,
  },

  // VS Center
  vsCenter: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  vsContainer: {},
  vsLine: {
    width: 120,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    opacity: 0.5,
  },
  vsBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  vsBadgeText: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.textWhite,
  },
  vsSwitchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: RADIUS.md,
    marginTop: 8,
  },
  vsSwitchBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
  },

  // Control panel
  controlPanel: {
    gap: 16,
    marginTop: 16,
  },
  controlCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    overflow: 'hidden',
  },
  controlCardHeader: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textWhite,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlCardTitleText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  controlCardBody: {
    padding: 16,
  },
  gameControlsGrid: {
  },
  btnGame: {
    minWidth: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: RADIUS.md,
  },
  btnGameFull: {
    minWidth: '100%',
  },
  btnGameCoin: {
    backgroundColor: COLORS.accent,
  },
  btnGamePause: {
    backgroundColor: '#6366f1',
  },
  btnGameStart: {
    backgroundColor: COLORS.primary,
  },
  btnGameEnd: {
    backgroundColor: COLORS.danger,
  },
  btnGameDisabled: {
    opacity: 0.5,
  },
  btnGameText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  btnGameTextDark: {
    color: COLORS.bgDark,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  btnQuick: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    backgroundColor: COLORS.bgDark,
  },
  btnQuickText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textLight,
  },

  // History
  historyList: {
    maxHeight: 240,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: RADIUS.sm,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  historyTime: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.textMuted,
    minWidth: 44,
  },
  historyEvent: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textLight,
  },
  historyScore: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 139, 185, 0.15)',
    borderRadius: 16,
  },
  historyClear: {
    fontSize: 11,
    color: COLORS.primaryLight,
    fontWeight: '600',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(6, 13, 24, 0.95)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    overflow: 'hidden',
  },
  modalHeader: {
    paddingVertical: 28,
    paddingHorizontal: 28,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 139, 185, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  modalIcon: {
    fontSize: 48,
    marginBottom: 14,
    color: COLORS.textWhite,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textWhite,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  modalBody: {
    paddingVertical: 24,
    paddingHorizontal: 28,
  },
  modalFooter: {
    paddingVertical: 18,
    paddingHorizontal: 28,
    flexDirection: 'row',
    gap: 14,
  },
  btnModal: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnModalSecondary: {
    backgroundColor: COLORS.bgDark,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  btnModalPrimary: {
    backgroundColor: COLORS.primary,
  },
  btnModalText: {
    fontSize: 14,
    fontWeight: '700',
  },
  btnModalTextSecondary: {
    color: COLORS.textMuted,
  },
  btnModalTextPrimary: {
    color: COLORS.textWhite,
  },
  btnModalDisabled: {
    opacity: 0.5,
  },

  // Coin flip
  coinContainer: {
    alignItems: 'center',
    gap: 24,
  },
  coin3d: {
    width: 140,
    height: 140,
  },
  coinInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinSide: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  coinFront: {
    backgroundColor: COLORS.teamBlue,
  },
  coinBack: {
    backgroundColor: COLORS.teamRed,
  },
  coinText: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  coinResultText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textWhite,
    textAlign: 'center',
  },
  coinHint: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
  },

  // Team options
  teamOptions: {
    gap: 12,
  },
  teamOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: COLORS.bgDark,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.borderLight,
  },
  teamOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(0, 139, 185, 0.1)',
  },
  teamOptionDisabled: {
    opacity: 0.5,
  },
  teamOptionIndicator: {
    width: 6,
    height: 44,
    borderRadius: 3,
  },
  teamOptionIndicatorBlue: {
    backgroundColor: COLORS.teamBlue,
  },
  teamOptionIndicatorRed: {
    backgroundColor: COLORS.teamRed,
  },
  teamOptionContent: {
    flex: 1,
  },
  teamOptionName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textWhite,
    marginBottom: 2,
  },
  teamOptionPlayers: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  teamOptionRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamOptionRadioSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  teamOptionRadioCheck: {
    color: COLORS.textWhite,
    fontSize: 12,
    fontWeight: '700',
  },

  // Serve selection
  serveSection: {
    marginBottom: 20,
  },
  serveLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  playerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: COLORS.bgDark,
    borderRadius: RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.borderLight,
    marginBottom: 8,
  },
  playerOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(0, 139, 185, 0.1)',
  },
  playerOptionRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.borderColor,
  },
  playerOptionRadioSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  playerOptionName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textLight,
  },

  // Timeout countdown
  timeoutCountdownOverlay: {
    backgroundColor: 'rgba(6, 13, 24, 0.98)',
  },
  timeoutCountdownValue: {
    fontFamily: 'monospace',
    fontSize: 72,
    fontWeight: '700',
    color: COLORS.accent,
    marginVertical: 16,
  },
  timeoutRemainingText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },

  // Toast
  toast: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    left: 32,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toastIcon: {
    fontSize: 20,
    color: COLORS.textWhite,
  },
  toastText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textWhite,
    flex: 1,
  },
});
