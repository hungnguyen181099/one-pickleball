import { HomeEventCard } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from '@/constants/styles/home.styles';

import { useThemedColors } from '@/hooks/use-theme';

export const EventCardComponent = ({ item }: { item: HomeEventCard }) => {
  const colors = useThemedColors();

  return (
    <TouchableOpacity
      style={[styles.eventCard, { backgroundColor: colors.cardSecondary }]}
      activeOpacity={0.8}
      onPress={() => {
        router.push({
          pathname: '/(details)/eventDetail/[id]',
          params: { id: item.id },
        });
      }}
    >
      {item.badge && (
        <View style={styles.eventBadge}>
          <Text style={styles.eventBadgeText}>{item.badge}</Text>
        </View>
      )}
      <Image source={{ uri: item.image }} style={[styles.eventImage, { backgroundColor: item.image as any }]} />
      <View style={styles.eventContent}>
        <View style={styles.eventDate}>
          <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
          <Text style={[styles.eventDateText, { color: colors.textSecondary }]}>{item.date}</Text>
        </View>
        <Text style={[styles.eventTitle, { color: colors.text }]}>{item.title}</Text>
        <View style={styles.eventMeta}>
          <View style={styles.eventLocation}>
            <Ionicons name="location-outline" size={12} color={colors.textSecondary} />
            <Text style={[styles.eventLocationText, { color: colors.textSecondary }]}>{item.location}</Text>
          </View>
          <Text style={styles.eventMetaText}>{item.meta}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
