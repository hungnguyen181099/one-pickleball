import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground } from "expo-image";
import { styles } from "@/assets/styles/news.styles";
import { router } from "expo-router";


interface NewsItem {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  author: string;
  time: string;
  readTime: string;
  image: string;
  views: number;
  likes: number;
  isLiked: boolean;
}

interface NewsCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}
const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [likedNews, setLikedNews] = useState<string[]>([]);

  const categories: NewsCategory[] = [
    { id: 'all', name: 'Tất cả', icon: 'home', color: '#00D9B5' },
    { id: 'technique', name: 'Kỹ thuật', icon: 'school', color: '#FF9800' },
    { id: 'community', name: 'Cộng đồng', icon: 'account-multiple', color: '#2196F3' },
    { id: 'tournament', name: 'Giải đấu', icon: 'trophy', color: '#E91E63' },
    { id: 'lifestyle', name: 'Lối sống', icon: 'heart', color: '#9C27B0' },
  ];

  const newsItems: NewsItem[] = [
    {
      id: '1',
      category: 'Kỹ thuật',
      categoryColor: '#FF9800',
      title: '5 Tips nâng cao kỹ thuật serve trong Pickleball',
      description: 'Khám phá những tips thiết thực để cải thiện kỹ thuật serve của bạn. Từ cách cầm vợt đến thời gian release, bài viết này sẽ giúp bạn hiểu rõ hơn...',
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
      description: 'Gặp gỡ những VĐV tiêu biểu đã góp phần xây dựng cộng đồng Pickleball tại Việt Nam. Những câu chuyện truyền cảm hứng từ những người anh chị...',
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
      description: 'Nhìn lại những trận đấu hấp dẫn tại VN Open Championship 2024. Các tay vợt xuất sắc nhất năm đã tranh tài với những kỹ năng ấn tượng...',
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
      description: 'Tại sao Pickleball được xem là một trong những môn thể thao tốt nhất cho sức khỏe thể chất và tinh thần. Khám phá lợi ích tuyệt vời...',
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
      description: 'Hiểu rõ sự khác biệt trong chiến thuật giữa Doubles và Singles. Bài viết này sẽ giúp bạn điều chỉnh lối chơi phù hợp với từng loại hình...',
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
      setLikedNews(likedNews.filter(id => id !== newsId));
    } else {
      setLikedNews([...likedNews, newsId]);
    }
  };

  const filteredNews = activeCategory === 'all'
    ? newsItems
    : newsItems.filter(news => news.category.toLowerCase().includes(
      categories.find(c => c.id === activeCategory)?.name.toLowerCase() || ''
    ));

  const NewsCard = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity
      style={styles.newsCard}
      onPress={()=> router.push({
        pathname:'/(details)/newDetail/[id]',
        params:{id: item.id}
      })}
    >
      <View style={styles.newsCardInner}>
        <View style={[styles.newsThumbnail, { backgroundColor: item.image as any }]}>
          <Text style={{ color: item.categoryColor, fontSize: 12, fontWeight: '600' }}>
            News
          </Text>
        </View>

        <View style={styles.newsContent}>
          <View style={[styles.categoryBadge, { backgroundColor: `${item.categoryColor}20` }]}>
            <Text style={[styles.categoryBadgeText, { color: item.categoryColor }]}>
              {item.category}
            </Text>
          </View>

          <Text style={styles.newsTitle} numberOfLines={2}>
            {item.title}
          </Text>

          <Text style={styles.newsDescription} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.metaInfo}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Ionicons name="eye" size={14} color="#999" />
              <Text style={styles.statText}>{item.views}</Text>
            </View>
            <View style={styles.statItem}>
              <TouchableOpacity
                onPress={() => toggleLike(item.id)}
                style={styles.likeBtn}
              >
                <Ionicons
                  name={likedNews.includes(item.id) ? 'heart' : 'heart-outline'}
                  size={14}
                  color={likedNews.includes(item.id) ? '#FF4444' : '#999'}
                />
              </TouchableOpacity>
              <Text style={styles.statText}>
                {item.likes + (likedNews.includes(item.id) ? 1 : 0)}
              </Text>
            </View>
            <Text style={styles.readTime}>{item.readTime}</Text>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </View>
    </TouchableOpacity>
  );

  const CategoryChip = ({ item }: { item: NewsCategory }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        activeCategory === item.id && styles.categoryChipActive,
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
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tin tức & Sự kiện</Text>
        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={24} color="#000" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm tin tức..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Tin nổi bật</Text>
        <TouchableOpacity style={styles.featuredCard}>
          <ImageBackground style={styles.featuredImage} source={{ uri: 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png' }}>
            <View style={styles.featuredOverlay}>
              <View style={[styles.featuredBadge, { backgroundColor: '#FF4444' }]}>
                <Text style={styles.featuredBadgeText}>HOT</Text>
              </View>
              <Text style={styles.featuredTitle}>
                HCM Open 2025: Những tiêu điểm không thể bỏ lỡ
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <CategoryChip key={category.id} item={category} />
          ))}
        </ScrollView>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={filteredNews}
        renderItem={({ item }) => <NewsCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

export default NewsPage;