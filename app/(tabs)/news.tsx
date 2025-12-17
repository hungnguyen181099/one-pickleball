import React, { useState } from 'react';

import { NewsArticle, NewsCategory, NewsItemDetailed } from '@/types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, ImageBackground } from 'expo-image';
import { router } from 'expo-router';
import { FlatList, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from '@/constants/styles/news.styles';

import { useThemedColors } from '@/hooks/use-theme';
import newService from '@/services/api/new.service';
import { formatDate } from '@/utils/date.utils';
import { useQuery } from '@tanstack/react-query';

const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [likedNews, setLikedNews] = useState<string[]>([]);
  const colors = useThemedColors();


  const { data, isPending, refetch, isRefetching } = useQuery({
    queryKey: ['getNews', searchQuery],
    queryFn: () => newService.getNews({
    })
  })


  const categories: NewsCategory[] = [
    { id: 'all', name: 'Tất cả', icon: 'home', color: '#00D9B5' },
    { id: 'technique', name: 'Kỹ thuật', icon: 'school', color: '#FF9800' },
    { id: 'community', name: 'Cộng đồng', icon: 'account-multiple', color: '#2196F3' },
    { id: 'tournament', name: 'Giải đấu', icon: 'trophy', color: '#E91E63' },
    { id: 'lifestyle', name: 'Lối sống', icon: 'heart', color: '#9C27B0' },
  ];

  const newsItems: NewsItemDetailed[] = [
    {
      id: '1',
      category: 'Kỹ thuật',
      categoryColor: '#FF9800',
      title: '5 Tips nâng cao kỹ thuật serve trong Pickleball',
      description:
        'Khám phá những tips thiết thực để cải thiện kỹ thuật serve của bạn. Từ cách cầm vợt đến thời gian release, bài viết này sẽ giúp bạn hiểu rõ hơn...',
      author: 'Trần Minh Tuấn',
      time: '2 giờ trước',
      readTime: '3 phút đọc',
      image: '#E8F5E9',
      views: 1250,
      likes: 342,
      isLiked: false,
    },
    {
      id: '2',
      category: 'Cộng đồng',
      categoryColor: '#2196F3',
      title: 'Chuyện của các tay vợt huyền thoại Pickleball Việt Nam',
      description:
        'Gặp gỡ những VĐV tiêu biểu đã góp phần xây dựng cộng đồng Pickleball tại Việt Nam. Những câu chuyện truyền cảm hứng từ những người anh chị...',
      author: 'Lê Thanh Hùng',
      time: '5 giờ trước',
      readTime: '5 phút đọc',
      image: '#E3F2FD',
      views: 2100,
      likes: 568,
      isLiked: false,
    },
    {
      id: '3',
      category: 'Giải đấu',
      categoryColor: '#E91E63',
      title: 'Kết quả Vietnam Open Championship 2024',
      description:
        'Nhìn lại những trận đấu hấp dẫn tại VN Open Championship 2024. Các tay vợt xuất sắc nhất năm đã tranh tài với những kỹ năng ấn tượng...',
      author: 'Nguyễn Hoàng Nam',
      time: '1 ngày trước',
      readTime: '4 phút đọc',
      image: '#FFF3E0',
      views: 3400,
      likes: 892,
      isLiked: false,
    },
    {
      id: '4',
      category: 'Lối sống',
      categoryColor: '#9C27B0',
      title: 'Pickleball: Tuyệt vời cho sức khỏe và xã hội',
      description:
        'Tại sao Pickleball được xem là một trong những môn thể thao tốt nhất cho sức khỏe thể chất và tinh thần. Khám phá lợi ích tuyệt vời...',
      author: 'Dương Thị Hương',
      time: '3 ngày trước',
      readTime: '6 phút đọc',
      image: '#FCE4EC',
      views: 1850,
      likes: 445,
      isLiked: false,
    },
    {
      id: '5',
      category: 'Kỹ thuật',
      categoryColor: '#FF9800',
      title: 'Phân tích chiến thuật: Doubles vs Singles',
      description:
        'Hiểu rõ sự khác biệt trong chiến thuật giữa Doubles và Singles. Bài viết này sẽ giúp bạn điều chỉnh lối chơi phù hợp với từng loại hình...',
      author: 'Phạm Quốc Khánh',
      time: '4 ngày trước',
      readTime: '5 phút đọc',
      image: '#E8F5E9',
      views: 956,
      likes: 267,
      isLiked: false,
    },
  ];

  const toggleLike = (newsId: string) => {
    if (likedNews.includes(newsId)) {
      setLikedNews(likedNews.filter((id) => id !== newsId));
    } else {
      setLikedNews([...likedNews, newsId]);
    }
  };

  const filteredNews =
    activeCategory === 'all'
      ? newsItems
      : newsItems.filter((news) =>
        news.category
          .toLowerCase()
          .includes(categories.find((c) => c.id === activeCategory)?.name.toLowerCase() || '')
      );

  const NewsCard = (NewsArticle: NewsArticle) => (
    <TouchableOpacity
      style={styles.newsCard}
      onPress={() =>
        router.push({
          pathname: '/(details)/newDetail/[id]',
          params: { id: NewsArticle.id },
        })
      }
    >
      <View style={[styles.newsCardInner, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
        <View style={[styles.newsThumbnail]}>
          <Image style={styles.featuredImage} source={NewsArticle.image} />
        </View>

        <View style={styles.newsContent}>
          {/* <View style={[styles.categoryBadge,{backgroundColor: '#2196F3'}]}>
            <Text style={[styles.categoryBadgeText]}>a</Text>
          </View> */}

          <Text style={[styles.newsTitle, { color: colors.text }]} numberOfLines={2}>
            {NewsArticle.title}
          </Text>

          <View style={styles.metaInfo}>
            <Text style={[styles.author, { color: colors.textSecondary }]}>{NewsArticle.author}</Text>
            <Text style={[styles.dot, { color: colors.textTertiary }]}>•</Text>
            <Text style={[styles.time, { color: colors.textTertiary }]}>{formatDate(NewsArticle.created_at)}</Text>
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Ionicons name="eye" size={14} color={colors.textTertiary} />
              <Text style={[styles.statText, { color: colors.textTertiary }]}>{NewsArticle.views}</Text>
            </View>
            <View style={styles.statItem}>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const CategoryChip = ({ item }: { item: NewsCategory }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        activeCategory === item.id && styles.categoryChipActive,
        {
          backgroundColor: activeCategory === item.id ? item.color : colors.backgroundTertiary,
          borderColor: activeCategory === item.id ? item.color : colors.border,
          borderWidth: 1,
        },
      ]}
      onPress={() => setActiveCategory(item.id)}
    >
      <MaterialCommunityIcons
        name={item.icon as any}
        size={16}
        color={activeCategory === item.id ? '#fff' : item.color}
      />
      <Text
        style={[
          styles.categoryChipText,
          activeCategory === item.id && styles.categoryChipTextActive,
          { color: activeCategory === item.id ? '#fff' : colors.text },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Tin tức & Sự kiện</Text>
        <TouchableOpacity
          onPress={() => router.navigate('/notification')}
          style={[styles.notificationBtn, { backgroundColor: colors.backgroundTertiary }]}
        >
          <Ionicons name="notifications-outline" size={24} color={colors.icon} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <View style={[styles.searchBar, { backgroundColor: colors.input }]}>
          <Ionicons name="search" size={20} color={colors.textTertiary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Tìm tin tức..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.categoriesWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContent}>
          {categories.map((category) => (
            <CategoryChip key={category.id} item={category} />
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={data?.data}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        renderItem={({ item }) => <NewsCard {...item} />}
        // ListHeaderComponent={
        //   <View style={styles.featuredSection}>
        //     <Text style={[styles.sectionTitle, { color: colors.text }]}>Tin nổi bật</Text>
        //     <TouchableOpacity style={[styles.featuredCard, { backgroundColor: colors.cardSecondary }]}>
        //       <ImageBackground
        //         style={styles.featuredImage}
        //         source={{
        //           uri: 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
        //         }}
        //       >
        //         <View style={styles.featuredOverlay}>
        //           <View style={[styles.featuredBadge, { backgroundColor: '#FF4444' }]}>
        //             <Text style={styles.featuredBadgeText}>HOT</Text>
        //           </View>
        //           <Text style={styles.featuredTitle}>HCM Open 2025: Những tiêu điểm không thể bỏ lỡ</Text>
        //         </View>
        //       </ImageBackground>
        //     </TouchableOpacity>
        //   </View>
        // }
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View >
            <Ionicons
              name="cube-outline"
              size={60}
            />
            <Text >Không có sản phẩm</Text>
            <Text >
              Hiện tại chưa có sản phẩm nào, vui lòng quay lại sau!
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default NewsPage;
