import { styles } from '@/constants/styles/home.styles';
import { useThemedColors } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

export const ActionCard = ({
  icon,
  label,
  onPress,
  color,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  color: string;
}) => {
  const colors = useThemedColors();

  return (
    <TouchableOpacity
      style={[
        styles.actionCard,
        {
          backgroundColor: `${color}15`,
          borderColor: color,
          borderWidth: 1.5,
        },
      ]}
      onPress={onPress}
    >
      <View style={[styles.actionIcon, { backgroundColor: color }]}>
        <Ionicons name={icon as any} size={24} color='#fff' />
      </View>
      <Text style={[styles.actionLabel, { color: colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );
};
