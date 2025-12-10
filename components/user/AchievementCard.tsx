import { UserAchievement } from '@/types';
import { Text, View } from 'react-native';

import { styles } from '@/constants/styles/user.styles';

import { useThemedColors } from '@/hooks/use-theme';

export const AchievementCard = ({ item }: { item: UserAchievement }) => {
  const colors = useThemedColors();

  return (
    <View
      style={[
        styles.achievementCard,
        item.locked && styles.achievementLocked,
        { backgroundColor: colors.cardSecondary },
      ]}
    >
      <Text style={styles.achievementEmoji}>{item.emoji}</Text>
      <Text style={[styles.achievementName, { color: colors.text }]}>{item.name}</Text>
    </View>
  );
};
