import { HomeStatCardProps } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { styles } from '@/constants/styles/home.styles';

import { useThemedColors } from '@/hooks/use-theme';

export const StatCard = ({ item }: { item: HomeStatCardProps }) => {
  const colors = useThemedColors();

  return (
    <View style={[styles.statCard, { borderLeftColor: item.color, backgroundColor: colors.cardSecondary }]}>
      <View style={[styles.statIcon, { backgroundColor: `${item.color}20` }]}>
        <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
      </View>
      <View>
        <Text style={[styles.statNumber, { color: colors.text }]}>{item.number}</Text>
        <Text style={[styles.statLabel, { color: colors.textTertiary }]}>{item.label}</Text>
      </View>
    </View>
  );
};
