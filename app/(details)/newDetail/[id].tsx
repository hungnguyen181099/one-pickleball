import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Dimensions,
    StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { styles } from '@/assets/styles/newdetail.styles';

const { width } = Dimensions.get('window');

interface Comment {
    id: string;
    userName: string;
    userInitials: string;
    userColor: string;
    time: string;
    text: string;
    likes: number;
    isLiked: boolean;
}

interface RelatedNews {
    id: string;
    category: string;
    categoryColor: string;
    title: string;
    image: string;
    time: string;
}

export default function NewsDetailScreen() {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(342);
    const [comments, setComments] = useState<Comment[]>([
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

    const relatedNews: RelatedNews[] = [
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

    const handleLike = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    const CommentItem = ({ item }: { item: Comment }) => (
        <View style={styles.commentItem}>
            <View style={[styles.commentAvatar, { backgroundColor: item.userColor }]}>
                <Text style={styles.commentAvatarText}>{item.userInitials}</Text>
            </View>
            <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                    <View>
                        <Text style={styles.commentUserName}>{item.userName}</Text>
                        <Text style={styles.commentTime}>{item.time}</Text>
                    </View>
                    <TouchableOpacity style={styles.moreBtn}>
                        <Ionicons name="ellipsis-horizontal" size={16} color="#999" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.commentText}>{item.text}</Text>
                <View style={styles.commentActions}>
                    <TouchableOpacity style={styles.commentAction}>
                        <Ionicons name="thumbs-up-outline" size={14} color="#999" />
                        <Text style={styles.commentActionText}>{item.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.commentAction}>
                        <Text style={styles.commentActionText}>Trả lời</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const RelatedNewsItem = ({ item }: { item: RelatedNews }) => (
        <TouchableOpacity style={styles.relatedNewsItem}>
            <View style={[styles.relatedNewsThumbnail, { backgroundColor: item.image as any }]} />
            <View style={styles.relatedNewsContent}>
                <View style={[styles.relatedNewsCategory, { backgroundColor: `${item.categoryColor}20` }]}>
                    <Text style={[styles.relatedNewsCategoryText, { color: item.categoryColor }]}>
                        {item.category}
                    </Text>
                </View>
                <Text style={styles.relatedNewsTitle} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.relatedNewsTime}>{item.time}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>

            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={styles.gallerySection}>
                            <LinearGradient
                                colors={['#00D9B5', '#0099CC']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.featuredImage}
                            />
                            <View style={styles.galleryOverlay}>
                                <TouchableOpacity
                                    style={styles.backBtnLight}
                                    onPress={() => router.back()}
                                >
                                    <Ionicons name="chevron-back" size={28} color="#fff" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.iconBtnLight}
                                    onPress={() => setIsLiked(!isLiked)}
                                >
                                    <Ionicons
                                        name={isLiked ? 'heart' : 'heart-outline'}
                                        size={24}
                                        color={isLiked ? '#FF4444' : '#fff'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.contentSection}>

                            <View style={[styles.categoryBadge, { backgroundColor: '#FF980020' }]}>
                                <Text style={[styles.categoryBadgeText, { color: '#FF9800' }]}>
                                    Kỹ thuật
                                </Text>
                            </View>

                            <Text style={styles.title}>
                                5 Tips nâng cao kỹ thuật serve trong Pickleball
                            </Text>

                            <View style={styles.metaInfo}>
                                <View style={styles.metaItem}>
                                    <View style={[styles.authorAvatar, { backgroundColor: '#00D9B5' }]}>
                                        <Text style={styles.authorAvatarText}>TT</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.authorName}>Trần Minh Tuấn</Text>
                                        <Text style={styles.publishTime}>2 giờ trước</Text>
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <Ionicons name="person-add-outline" size={24} color="#00D9B5" />
                                </TouchableOpacity>
                            </View>


                            <View style={styles.stats}>
                                <View style={styles.statItem}>
                                    <Ionicons name="eye" size={16} color="#999" />
                                    <Text style={styles.statText}>1.2K</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <MaterialCommunityIcons name="comment-outline" size={16} color="#999" />
                                    <Text style={styles.statText}>24</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Ionicons name="share-social-outline" size={16} color="#999" />
                                    <Text style={styles.statText}>18</Text>
                                </View>
                            </View>
                        </View>

                        {/* Article Content */}
                        <View style={styles.articleContent}>
                            <Text style={styles.articleText}>
                                Serve là một trong những kỹ thuật quan trọng nhất trong Pickleball. Một cú serve tốt không chỉ giúp bạn bắt đầu điểm số với lợi thế mà còn tạo áp lực cho đối phương.
                            </Text>

                            <Text style={styles.sectionSubtitle}>1. Kiểm tra lại cách cầm gậy</Text>
                            <Text style={styles.articleText}>
                                Cách cầm gậy là nền tảng của tất cả các cú đánh. Hãy chắc chắn rằng bạn đang cầm gậy ở vị trí continental grip hoặc eastern grip. Tránh cầm quá chặt vì điều này sẽ giới hạn độ linh hoạt của cổ tay.
                            </Text>

                            <Text style={styles.sectionSubtitle}>2. Điều chỉnh vị trí đứng</Text>
                            <Text style={styles.articleText}>
                                Đứng cách net khoảng 6-8 feet, chân rộng bằng vai. Bước chân trước nên hơi bước vào một chút để tạo momentum. Vị trí đứng đúng sẽ giúp bạn dễ dàng thực hiện các cú serve khác nhau.
                            </Text>

                            <Text style={styles.sectionSubtitle}>3. Sử dụng động tác tay tự nhiên</Text>
                            <Text style={styles.articleText}>
                                Động tác serve trong Pickleball khác với Tennis. Hãy sử dụng động tác underhand hoặc waist-high serve. Tránh swing quá mạnh vì điều này sẽ khiến bạn mất kiểm soát.
                            </Text>

                            <Text style={styles.sectionSubtitle}>4. Tập trung vào độ chính xác</Text>
                            <Text style={styles.articleText}>
                                Thay vì cố serve mạnh nhất, hãy tập trung vào độ chính xác. Hãy luyện tập để serve về các góc khác nhau của sân. Khi bạn thành thạo độ chính xác, việc tăng tốc độ sẽ dễ hơn.
                            </Text>

                            <Text style={styles.sectionSubtitle}>5. Luyện tập thường xuyên</Text>
                            <Text style={styles.articleText}>
                                Điều quan trọng nhất là luyện tập thường xuyên. Hãy dành ít nhất 15-20 phút mỗi ngày để luyện tập serve. Khi bạn luyện tập đủ nhiều, serve sẽ trở thành phản xạ tự nhiên.
                            </Text>
                        </View>


                        <View style={styles.engagementSection}>
                            <View style={styles.divider} />
                            <View style={styles.engagementStats}>
                                <TouchableOpacity
                                    style={styles.engagementItem}
                                    onPress={handleLike}
                                >
                                    <Ionicons
                                        name={isLiked ? 'heart' : 'heart-outline'}
                                        size={24}
                                        color={isLiked ? '#FF4444' : '#999'}
                                    />
                                    <Text style={[
                                        styles.engagementText,
                                        isLiked && { color: '#FF4444' }
                                    ]}>
                                        {likes}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.engagementItem}>
                                    <MaterialCommunityIcons name="comment-outline" size={24} color="#999" />
                                    <Text style={styles.engagementText}>24</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.engagementItem}>
                                    <Ionicons name="share-social-outline" size={24} color="#999" />
                                    <Text style={styles.engagementText}>18</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.divider} />
                        </View>


                        <View style={styles.commentsSection}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Bình luận (24)</Text>
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


                        <View style={styles.relatedSection}>
                            <Text style={styles.sectionTitle}>Tin tức liên quan</Text>
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


            <View style={styles.commentInputFooter}>
                <View style={[styles.commentInputAvatar, { backgroundColor: '#667eea' }]}>
                    <Text style={styles.commentInputAvatarText}>ML</Text>
                </View>
                <TouchableOpacity style={styles.commentInput}>
                    <Text style={styles.commentInputPlaceholder}>Viết bình luận...</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sendBtn}>
                    <Ionicons name="send" size={20} color="#00D9B5" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

