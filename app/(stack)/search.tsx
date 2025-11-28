import { styles } from '@/constants/styles/search.styles';
import { useThemedColors } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// Utility function to remove Vietnamese diacritics
const removeDiacritics = (str: string): string => {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase();
};

interface SearchResult {
    id: string;
    type: 'court' | 'event' | 'news' | 'player';
    title: string;
    description: string;
    image: string;
    meta?: {
        location?: string;
        rating?: number;
        price?: string;
        date?: string;
        views?: number;
    };
}

export default function SearchScreen() {
    const colors = useThemedColors();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<'all' | 'court' | 'event' | 'news' | 'player'>('all');
    const [recentSearches, setRecentSearches] = useState<string[]>([
        'Sân pickleball quận 2',
        'Giải đấu HCM',
        'Kỹ thuật serve',
    ]);

    // Sample data
    const allResults: SearchResult[] = [
        {
            id: '1',
            type: 'court',
            title: 'Sân Pickleball Rạch Chiếc',
            description: '6 sân thi đấu tiêu chuẩn quốc tế, đầy đủ tiện nghi',
            image: '#00D9B5',
            meta: {
                location: 'Quận 2, TP.HCM',
                rating: 4.8,
                price: '200k-300k/giờ',
            },
        },
        {
            id: '2',
            type: 'court',
            title: 'Sân Pickleball Thảo Điền',
            description: '4 sân ngoài trời, view đẹp, giá tốt',
            image: '#667eea',
            meta: {
                location: 'Quận 2, TP.HCM',
                rating: 4.5,
                price: '150k-250k/giờ',
            },
        },
        {
            id: '3',
            type: 'event',
            title: 'HCM Pickleball Open 2025',
            description: 'Giải đấu mở rộng quy mô lớn nhất năm',
            image: '#FFB800',
            meta: {
                date: '25/12/2024',
                location: 'TP.HCM',
            },
        },
        {
            id: '4',
            type: 'news',
            title: '5 Tips nâng cao kỹ thuật serve trong Pickleball',
            description: 'Hướng dẫn chi tiết cách cải thiện kỹ thuật serve',
            image: '#FF9800',
            meta: {
                views: 1200,
                date: '2 giờ trước',
            },
        },
        {
            id: '5',
            type: 'news',
            title: 'Luật chơi Pickleball cơ bản cho người mới',
            description: 'Tìm hiểu các quy tắc cơ bản của Pickleball',
            image: '#2196F3',
            meta: {
                views: 850,
                date: '1 ngày trước',
            },
        },
        {
            id: '6',
            type: 'court',
            title: 'Sân Pickleball Sala',
            description: '8 sân trong nhà, điều hòa, phục vụ 24/7',
            image: '#9C27B0',
            meta: {
                location: 'Quận 7, TP.HCM',
                rating: 4.9,
                price: '250k-350k/giờ',
            },
        },
        {
            id: '7',
            type: 'event',
            title: 'Giải Pickleball Mùa Xuân 2025',
            description: 'Giải đấu cộng đồng, mở cho tất cả trình độ',
            image: '#00BCD4',
            meta: {
                date: '15/01/2025',
                location: 'Quận 1, TP.HCM',
            },
        },
    ];

    // Filter and search logic
    const filteredResults = useMemo(() => {
        let results = allResults;

        
        if (activeFilter !== 'all') {
            results = results.filter(item => item.type === activeFilter);
        }

        
        if (searchQuery.trim()) {
            const normalizedQuery = removeDiacritics(searchQuery.trim());
            results = results.filter(item => {
                const normalizedTitle = removeDiacritics(item.title);
                const normalizedDescription = removeDiacritics(item.description);
                return (
                    normalizedTitle.includes(normalizedQuery) ||
                    normalizedDescription.includes(normalizedQuery)
                );
            });
        }

        return results;
    }, [searchQuery, activeFilter]);

    const filters = [
        { key: 'all', label: 'Tất cả' },
        { key: 'court', label: 'Sân' },
        { key: 'event', label: 'Sự kiện' },
        { key: 'news', label: 'Tin tức' },
    ];

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'court': return 'SÂN';
            case 'event': return 'SỰ KIỆN';
            case 'news': return 'TIN TỨC';
            case 'player': return 'CẦU THỦ';
            default: return type.toUpperCase();
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'court': return '#00D9B5';
            case 'event': return '#FFB800';
            case 'news': return '#FF9800';
            case 'player': return '#2196F3';
            default: return colors.textTertiary;
        }
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        if (text.trim() && !recentSearches.includes(text.trim())) {
            setRecentSearches(prev => [text.trim(), ...prev.slice(0, 4)]);
        }
    };

    const handleRecentSearch = (query: string) => {
        setSearchQuery(query);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    const renderResultItem = ({ item }: { item: SearchResult }) => (
        <TouchableOpacity
            style={[styles.resultItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
        >
            <LinearGradient
                colors={[item.image, `${item.image}CC`]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.resultImage}
            />

            <View style={styles.resultContent}>
                <Text style={[styles.resultType, { color: getTypeColor(item.type) }]}>
                    {getTypeLabel(item.type)}
                </Text>
                <Text style={[styles.resultTitle, { color: colors.text }]} numberOfLines={1}>
                    {item.title}
                </Text>
                <Text style={[styles.resultDescription, { color: colors.textSecondary }]} numberOfLines={2}>
                    {item.description}
                </Text>

                <View style={styles.resultMeta}>
                    {item.meta?.location && (
                        <View style={styles.metaItem}>
                            <Ionicons name="location" size={12} color={colors.textTertiary} />
                            <Text style={[styles.metaText, { color: colors.textTertiary }]}>
                                {item.meta.location}
                            </Text>
                        </View>
                    )}
                    {item.meta?.rating && (
                        <View style={styles.metaItem}>
                            <Ionicons name="star" size={12} color="#FFB800" />
                            <Text style={[styles.metaText, { color: colors.textTertiary }]}>
                                {item.meta.rating}
                            </Text>
                        </View>
                    )}
                    {item.meta?.price && (
                        <View style={styles.metaItem}>
                            <Text style={[styles.metaText, { color: colors.textTertiary }]}>
                                {item.meta.price}
                            </Text>
                        </View>
                    )}
                    {item.meta?.date && (
                        <View style={styles.metaItem}>
                            <Ionicons name="calendar" size={12} color={colors.textTertiary} />
                            <Text style={[styles.metaText, { color: colors.textTertiary }]}>
                                {item.meta.date}
                            </Text>
                        </View>
                    )}
                    {item.meta?.views && (
                        <View style={styles.metaItem}>
                            <Ionicons name="eye" size={12} color={colors.textTertiary} />
                            <Text style={[styles.metaText, { color: colors.textTertiary }]}>
                                {item.meta.views}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderEmptyState = () => {
        if (searchQuery.trim()) {
            return (
                <View style={styles.emptyContainer}>
                    <View style={[styles.emptyIcon, { backgroundColor: colors.backgroundTertiary }]}>
                        <Ionicons name="search-outline" size={40} color={colors.textTertiary} />
                    </View>
                    <Text style={[styles.emptyTitle, { color: colors.text }]}>
                        Không tìm thấy kết quả
                    </Text>
                    <Text style={[styles.emptyMessage, { color: colors.textSecondary }]}>
                        Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc
                    </Text>
                </View>
            );
        }

        return (
            <ScrollView style={styles.recentSearches}>
                <Text style={[styles.recentTitle, { color: colors.text }]}>Tìm kiếm gần đây</Text>
                {recentSearches.map((search, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.recentItem, { borderBottomColor: colors.border }]}
                        onPress={() => handleRecentSearch(search)}
                    >
                        <View style={styles.recentLeft}>
                            <Ionicons name="time-outline" size={20} color={colors.textTertiary} />
                            <Text style={[styles.recentText, { color: colors.text }]}>{search}</Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="arrow-forward" size={20} color={colors.textTertiary} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    return (

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <View style={[styles.searchContainer, { backgroundColor: colors.input, borderColor: colors.border }]}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color={colors.icon} style={styles.searchIcon} />
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.searchInput, { color: colors.text }]}
                        placeholder="Tìm kiếm sân, sự kiện, tin tức..."
                        placeholderTextColor={colors.textTertiary}
                        value={searchQuery}
                        onChangeText={handleSearch}
                        autoFocus
                        returnKeyType="search"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity style={styles.clearBtn} onPress={clearSearch}>
                            <Ionicons name="close-circle" size={20} color={colors.textTertiary} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Filters */}
            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    {filters.map((filter) => (
                        <TouchableOpacity
                            key={filter.key}
                            style={[
                                styles.filterChip,
                                { borderColor: colors.border },
                                activeFilter === filter.key && styles.filterChipActive,
                            ]}
                            onPress={() => setActiveFilter(filter.key as any)}
                        >
                            <Text
                                style={[
                                    styles.filterChipText,
                                    { color: colors.text },
                                    activeFilter === filter.key && styles.filterChipTextActive,
                                ]}
                            >
                                {filter.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredResults}
                renderItem={renderResultItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.resultsContainer}
                ListEmptyComponent={renderEmptyState}
                showsVerticalScrollIndicator={false}
            />
        </KeyboardAvoidingView>
    );
}