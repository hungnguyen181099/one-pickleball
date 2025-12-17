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
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '@/constants/styles/newdetail.styles';

import { useThemedColors } from '@/hooks/use-theme';
import newService from '@/services/api/new.service';
import { formatDate } from '@/utils/date.utils';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { WebView } from 'react-native-webview';

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

  const createHtmlContent = (htmlContent: string) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-size: 16px;
              line-height: 1.8;
              color: #333;
              padding: 16px;
              background-color: ${colors.card};
              word-wrap: break-word;
              overflow-wrap: break-word;
            }
            
            div {
              margin-bottom: 16px;
            }
            
            h1, h2, h3, h4, h5, h6 {
              margin-bottom: 12px;
              margin-top: 20px;
              font-weight: bold;
              color: ${colors.text};
              line-height: 1.4;
            }
            
            h1 { font-size: 24px; }
            h2 { font-size: 22px; }
            h3 { font-size: 20px; }
            h4 { font-size: 18px; }
            
            p {
              margin-bottom: 16px;
              line-height: 1.8;
            }
            
            strong, b {
              font-weight: bold;
              color: ${colors.text};
            }
            
            ul, ol {
              margin-left: 20px;
              margin-bottom: 16px;
            }
            
            li {
              margin-bottom: 8px;
              line-height: 1.6;
            }
            
            a {
              color: #00D9B5;
              text-decoration: none;
            }
            
            img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              margin: 16px 0;
            }
            
            blockquote {
              border-left: 4px solid #00D9B5;
              padding-left: 16px;
              margin: 16px 0;
              font-style: italic;
              color: #666;
            }
            
            /* Cho phép select text */
            body {
              -webkit-user-select: text;
              user-select: text;
            }
            
            /* Remove các class không cần thiết từ Facebook */
            .xdj266r, .x14z9mp, .xat24cr, .x1lziwak, .x1vvkbs, .x126k92a, .xtlvy1s {
              /* Reset các style này */
            }
          </style>
          
          <script>
            // Gửi height của content về React Native
            function sendHeight() {
              const height = document.body.scrollHeight;
              
              window.ReactNativeWebView.postMessage(JSON.stringify({ 
                type: 'height', 
                height: height + 24 // Thêm padding để tránh bị cắt content
              }));
            }
            
            // Gọi khi document load xong
            window.addEventListener('load', function() {
              sendHeight();
              // Gọi lại sau một thời gian ngắn để chắc chắn
              setTimeout(sendHeight, 100);
              setTimeout(sendHeight, 300);
              setTimeout(sendHeight, 500);
            });
            
            // Theo dõi thay đổi kích thước
            if (window.ResizeObserver) {
              const resizeObserver = new ResizeObserver(sendHeight);
              resizeObserver.observe(document.body);
            }
          </script>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;
  };

  const [comments, setComments] = useState<NewsComment[]>([
    {
      id: '1',
      userName: 'Trần Minh Tuấn',
      userInitials: 'TT',
      userColor: '#00D9B5',
      time: '2 giờ trước',
      text: 'Bài viết rất hữu ích! Mình sẽ áp dụng những tips này vào luyện tập của mình.',
      likes: 24,
      isLiked: false,
    },
    {
      id: '2',
      userName: 'Lê Thanh Hùng',
      userInitials: 'LH',
      userColor: '#2196F3',
      time: '1 giờ trước',
      text: 'Đầu gậy rất quan trọng! Mình đã cải thiện kỹ thuật serve sau khi chỉnh lại cách cầm.',
      likes: 18,
      isLiked: false,
    },
  ]);

  const relatedNews: RelatedNewsItem[] = [
    {
      id: '1',
      category: 'Kỹ thuật',
      categoryColor: '#FF9800',
      title: 'Phân tích chiến thuật: Doubles vs Singles',
      image: '#E8F5E9',
      time: '4 ngày trước',
    },
    {
      id: '2',
      category: 'Lối sống',
      categoryColor: '#9C27B0',
      title: 'Pickleball: Tuyệt vời cho sức khỏe và xã hội',
      image: '#FCE4EC',
      time: '3 ngày trước',
    },
    {
      id: '3',
      category: 'Cộng đồng',
      categoryColor: '#2196F3',
      title: 'Chuyện của các tay vợt huyền thoại Pickleball Việt Nam',
      image: '#E3F2FD',
      time: '5 giờ trước',
    },
  ];

  if (status === 'pending') return <Text>Loading...</Text>;

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
                <Image style={styles.featuredImage} source={data.image } />
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
                source={{ html: createHtmlContent(data?.content || '') }}
                style={{
                  height: webViewHeight || 500,
                  backgroundColor: colors.card,
                  flex: 1
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
                    <Text style={[styles.engagementText, { color: colors.textTertiary }]}>24</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.engagementItem}>
                    <Ionicons name="share-social-outline" size={24} color={colors.textTertiary} />
                    <Text style={[styles.engagementText, { color: colors.textTertiary }]}>18</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              </View>

              <View style={[styles.commentsSection, { backgroundColor: colors.card }]}>
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
              </View>

              <View style={[styles.relatedSection, { backgroundColor: colors.card }]}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Tin tức liên quan</Text>
                {relatedNews.map((news) => (
                  <RelatedNewsItem key={news.id} item={news} />
                ))}
              </View>
            </>
          }
          data={[]}
          renderItem={() => null}
          contentContainerStyle={styles.flatListContent}
        />

        <View style={[styles.commentInputFooter, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <View style={[styles.commentInputAvatar, { backgroundColor: '#667eea' }]}>
            <Text style={styles.commentInputAvatarText}>ML</Text>
          </View>
          {/* <TouchableOpacity style={[styles.commentInput, { backgroundColor: colors.input }]}>
                    <Text style={[styles.commentInputPlaceholder, { color: colors.textTertiary }]}>Viết bình luận...</Text>
                </TouchableOpacity> */}
          <TextInput
            style={[styles.commentInput, { backgroundColor: colors.input, color: colors.text }]}
            placeholder="Viết bình luận..."
            placeholderTextColor={colors.textTertiary}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.sendBtn}>
            <Ionicons name="send" size={20} color="#00D9B5" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
