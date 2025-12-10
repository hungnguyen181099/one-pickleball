import { UserStatCardProps } from '@/types';
import { Text, View } from 'react-native';

import { styles } from '@/constants/styles/user.styles';

import { useThemedColors } from '@/hooks/use-theme';

export const StatCard = ({ item }: { item: UserStatCardProps }) => {
  const colors = useThemedColors();

  return (
    <View style={[styles.statCard, { backgroundColor: colors.cardSecondary }]}>
      <Text style={styles.statNumber}>{item.number}</Text>
      <Text style={[styles.statLabel, { color: colors.textTertiary }]}>{item.label}</Text>
    </View>
  );
};
