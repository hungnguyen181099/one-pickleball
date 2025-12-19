import React, { useRef, useState } from 'react';

import { NewsComment, RelatedNewsItem } from '@/types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '@/constants/styles/newdetail.styles';

import { createHtmlContent } from '@/components/createHtmlContent';
import NewsCard from '@/components/NewsCard';
import { Skeleton } from '@/components/ui/Skeleton/Skeleton';
import { useThemedColors } from '@/hooks/use-theme';
import newService from '@/services/api/new.service';
import { formatDate } from '@/utils/date.utils';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { WebView } from 'react-native-webview';
import { DetailSkeleton } from '@/components/ui/Skeleton';

export default function NewsDetailScreen() {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const colors = useThemedColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const webViewRef = useRef<WebView>(null);
  const [webViewHeight, setWebViewHeight] = useState(0);

  const { status, data, isPending } = useQuery({
    queryKey: ['getNewById', id],
    queryFn: () => newService.getNewById(id),
  });

  const { data: news, } = useQuery({
    queryKey: ['getNews',],
    queryFn: () => newService.getNews({
      page: 2,
      per_page: 3
    })
  })

  if (status === 'pending') return <DetailSkeleton />

  if (status === 'error') return;

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'height' && data.height) {
        setWebViewHeight(data.height);
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  const CommentItem = ({ item }: { item: NewsComment }) => (
    <View style={styles.commentItem}>
      <View style={[styles.commentAvatar, { backgroundColor: item.userColor }]}>
        <Text style={styles.commentAvatarText}>{item.userInitials}</Text>
      </View>
      <View style={[styles.commentContent, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}>
        <View style={styles.commentHeader}>
          <View>
            <Text style={[styles.commentUserName, { color: colors.text }]}>{item.userName}</Text>
            <Text style={[styles.commentTime, { color: colors.textTertiary }]}>{item.time}</Text>
          </View>
          <TouchableOpacity style={styles.moreBtn}>
            <Ionicons name="ellipsis-horizontal" size={16} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.commentText, { color: colors.textSecondary }]}>{item.text}</Text>
        <View style={styles.commentActions}>
          <TouchableOpacity style={styles.commentAction}>
            <Ionicons name="thumbs-up-outline" size={14} color={colors.textTertiary} />
            <Text style={[styles.commentActionText, { color: colors.textTertiary }]}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commentAction}>
            <Text style={[styles.commentActionText, { color: colors.textTertiary }]}>Trả lời</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const RelatedNewsItem = ({ item }: { item: RelatedNewsItem }) => (
    <TouchableOpacity
      style={[styles.relatedNewsItem, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}
    >
      <View style={[styles.relatedNewsThumbnail, { backgroundColor: item.image as any }]} />
      <View style={styles.relatedNewsContent}>
        <View style={[styles.relatedNewsCategory, { backgroundColor: `${item.categoryColor}20` }]}>
          <Text style={[styles.relatedNewsCategoryText, { color: item.categoryColor }]}>{item.category}</Text>
        </View>
        <Text style={[styles.relatedNewsTitle, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.relatedNewsTime, { color: colors.textTertiary }]}>{item.time}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          ListHeaderComponent={
            <>
              <View style={styles.gallerySection}>
                <Image style={styles.featuredImage} source={data.image} />
                <View style={styles.galleryOverlay}>
                  <TouchableOpacity style={styles.backBtnLight} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBtnLight} onPress={() => setIsLiked(!isLiked)}>
                    <Ionicons
                      name={isLiked ? 'heart' : 'heart-outline'}
                      size={24}
                      color={isLiked ? '#FF4444' : '#fff'}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
                <View style={[styles.categoryBadge, { backgroundColor: '#FF980020' }]}>
                  <Text style={[styles.categoryBadgeText, { color: '#FF9800' }]}>Kỹ thuật</Text>
                </View>

                <Text style={[styles.title, { color: colors.text }]}>
                  {data?.title}
                </Text>

                <View style={styles.metaInfo}>
                  <View style={styles.metaItem}>
                    <View style={[styles.authorAvatar, { backgroundColor: '#00D9B5' }]}>
                      <Text style={styles.authorAvatarText}>TT</Text>
                    </View>
                    <View>
                      <Text style={[styles.authorName, { color: colors.text }]}>{data?.author}</Text>
                      <Text style={[styles.publishTime, { color: colors.textTertiary }]}>{formatDate(data?.created_at || '')}</Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="person-add-outline" size={24} color="#00D9B5" />
                  </TouchableOpacity>
                </View>

                <View style={styles.stats}>
                  <View style={styles.statItem}>
                    <Ionicons name="eye" size={16} color={colors.textTertiary} />
                    <Text style={[styles.statText, { color: colors.textTertiary }]}>{data?.views}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <MaterialCommunityIcons name="comment-outline" size={16} color={colors.textTertiary} />
                    <Text style={[styles.statText, { color: colors.textTertiary }]}>24</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="share-social-outline" size={16} color={colors.textTertiary} />
                    <Text style={[styles.statText, { color: colors.textTertiary }]}>18</Text>
                  </View>
                </View>
              </View>

              <WebView
                ref={webViewRef}
                source={{ html: createHtmlContent(data?.content || '', colors) }}
                style={{
                  height: webViewHeight || 500,
                  backgroundColor: colors.card,
                  flex: 1,
                }}
                onMessage={handleMessage}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                renderLoading={() => (
                  <View style={{ padding: 20, alignItems: 'center' }}>
                    <ActivityIndicator size="small" color="#00D9B5" />
                    <Text style={{ marginTop: 8, color: colors.textTertiary }}>Đang tải nội dung...</Text>
                  </View>
                )}

              />

              <View style={[styles.engagementSection, { backgroundColor: colors.card }]}>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <View style={styles.engagementStats}>
                  <TouchableOpacity style={styles.engagementItem} onPress={handleLike}>
                    <Ionicons
                      name={isLiked ? 'heart' : 'heart-outline'}
                      size={24}
                      color={isLiked ? '#FF4444' : colors.textTertiary}
                    />
                    <Text
                      style={[
                        styles.engagementText,
                        isLiked && { color: '#FF4444' },
                        !isLiked && { color: colors.textTertiary },
                      ]}
                    >
                      {likes}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.engagementItem}>
                    <MaterialCommunityIcons name="comment-outline" size={24} color={colors.textTertiary} />
                    <Text style={[styles.engagementText, { color: colors.textTertiary }]}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.engagementItem}>
                    <Ionicons name="share-social-outline" size={24} color={colors.textTertiary} />
                    <Text style={[styles.engagementText, { color: colors.textTertiary }]}>0</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              </View>

              {/* <View style={[styles.commentsSection, { backgroundColor: colors.card }]}>
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionTitle, { color: colors.text, backgroundColor: colors.card }]}>
                    Bình luận (24)
                  </Text>
                  <TouchableOpacity>
                    <Ionicons name="filter" size={20} color="#00D9B5" />
                  </TouchableOpacity>
                </View>

                {comments.map((comment) => (
                  <CommentItem key={comment.id} item={comment} />
                ))}

                <TouchableOpacity style={styles.viewAllComments}>
                  <Text style={styles.viewAllCommentsText}>Xem tất cả bình luận</Text>
                </TouchableOpacity>
              </View> */}

              <View style={[styles.relatedSection, { backgroundColor: colors.card }]}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Tin tức liên quan</Text>

              </View>
            </>
          }
          data={news?.data}
          renderItem={({ item }) => <NewsCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
