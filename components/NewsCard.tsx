import React from 'react';

import { NewsArticle } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

import { styles } from '@/constants/styles/news.styles';

import { useThemedColors } from '@/hooks/use-theme';

import { formatDate } from '@/utils/date.utils';

import { Badge } from './ui/Badge';
import { Flex } from './ui/Flex';
import { Icon } from './ui/Icon';
import { Space } from './ui/Space';
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
        <View style={styles.newsThumbnail}>
          <Image style={styles.featuredImage} source={item.image} />
        </View>

        <View style={styles.newsContent}>
          {item.category_id && (
            <Badge color="primary" size="sm" radius="sm">
              {item.category?.name}
            </Badge>
          )}

          <Text size="h4" textTransform="uppercase" numberOfLines={2}>
            {item.title}
          </Text>

          <Space size="sm" />

          <Flex>
            <Icon variant="fit" color="muted" translateY={1}>
              <MaterialIcons name="access-time-filled" size={18} />
            </Icon>
            <Text color="muted">{formatDate(item.created_at)}</Text>
          </Flex>

          <Flex>
            <Icon variant="fit" color="muted" translateY={1}>
              <MaterialIcons name="people" size={18} />
            </Icon>
            <Text color="muted">{item.author}</Text>
          </Flex>

          {/* <Flex>
            <Icon variant="fit" color="muted" translateY={1}>
              <MaterialIcons name="visibility" size={18} />
            </Icon>
            <Text color="muted">{item.views ?? 0}</Text>
          </Flex> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}
