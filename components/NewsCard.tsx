import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { NewsArticle } from '@/types'
import { styles } from '@/constants/styles/news.styles'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import { formatDate } from '@/utils/date.utils'
import { Ionicons } from '@expo/vector-icons'
import { useThemedColors } from '@/hooks/use-theme'

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
            <View style={[styles.newsCardInner, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
                <View style={[styles.newsThumbnail]}>
                    <Image style={styles.featuredImage} source={item.image} />
                </View>

                <View style={styles.newsContent}>
                    {/* <View style={[styles.categoryBadge,{backgroundColor: '#2196F3'}]}>
            <Text style={[styles.categoryBadgeText]}>a</Text>
          </View> */}

                    <Text style={[styles.newsTitle, { color: colors.text }]} numberOfLines={2}>
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
                        <View style={styles.statItem}>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}