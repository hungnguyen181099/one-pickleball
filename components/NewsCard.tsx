import React from 'react';

import { NewsArticle } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

import { styles } from '@/constants/styles/news.styles';

import { useThemedColors } from '@/hooks/use-theme';

import { formatDate } from '@/utils/date.utils';

import { Badge } from './ui/Badge';
import { Text } from './ui/Text';

export default function NewsCard(item: NewsArticle) {
  const colors = useThemedColors();
  return (
    <TouchableOpacity
      style={styles.newsCard}
      onPress={() =>
        router.push({
          pathname: '/(details)/newDetail/[id]',
          params: { id: item.id },
        })
      }
    >
      <View style={[styles.newsCardInner, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.newsThumbnail]}>
          <Image style={styles.featuredImage} source={item.image} />
        </View>

        <View style={styles.newsContent}>
          {item.category_id ? (
            <Badge color="primary" size="sm" radius="sm">
              {item.category?.name}
            </Badge>
          ) : null}

          <Text size="h5" numberOfLines={2}>
            {item.title}
          </Text>

          <View style={styles.metaInfo}>
            <Text style={[styles.author, { color: colors.textSecondary }]}>{item.author}</Text>
            <Text style={[styles.dot, { color: colors.textTertiary }]}>•</Text>
            <Text style={[styles.time, { color: colors.textTertiary }]}>{formatDate(item.created_at)}</Text>
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Ionicons name="eye" size={14} color={colors.textTertiary} />
              <Text style={[styles.statText, { color: colors.textTertiary }]}>{item.views ?? 0}</Text>
            </View>
            <View style={styles.statItem}></View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
