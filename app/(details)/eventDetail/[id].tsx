import { styles } from '@/assets/styles/eventdeatil.styles';
import { useTheme, useThemedColors } from '@/hooks/use-theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface InfoCard {
    icon: string;
    label: string;
    value: string;
}

interface Category {
    name: string;
    count: string;
    icon: string;
}

interface FeeItem {
    name: string;
    amount: string;
    discount?: string;
}

export default function EventDetailScreen() {
    const [activeTab, setActiveTab] = useState<string>('overview');
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const { id } = useLocalSearchParams();
    const colors = useThemedColors();



    const infoCards: InfoCard[] = [
        { icon: 'calendar', label: 'Thời gian', value: '15-17/12/2025' },
        { icon: 'map-marker', label: 'Địa điểm', value: 'Sân Rạch Chiếc' },
        { icon: 'human-male-female', label: 'Đã đăng ký', value: '128/256' },
        { icon: 'star', label: 'Giải thưởng', value: '500 triệu' },
    ];

    const categories: Category[] = [
        { name: 'Nam Đơn', count: '64 VĐV', icon: 'human-male' },
        { name: 'Nữ Đơn', count: '48 VĐV', icon: 'human-female' },
        { name: 'Đôi Nam', count: '32 cặp', icon: 'human-male-female' },
        { name: 'Đôi Nữ', count: '24 cặp', icon: 'human-male-female' },
        { name: 'Đôi Hỗn hợp', count: '28 cặp', icon: 'human-male-female' },
    ];

    const fees: FeeItem[] = [
        { name: 'Đơn Nam/Nữ', amount: '500.000đ' },
        { name: 'Đôi Nam/Nữ', amount: '800.000đ/cặp' },
        { name: 'Đôi Hỗn hợp', amount: '800.000đ/cặp' },
        { name: 'Combo 2 hạng đấu', amount: '1.200.000đ', discount: '-20%' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.headerContainer}>
                    <View style={styles.headerImage}>
                        <View style={styles.headerGradient} />
                        <Text style={styles.headerTitle}>HCM OPEN</Text>
                        <Text style={styles.headerSubtitle}>2025</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8} style={styles.backBtn}>
                        <Ionicons name="chevron-back" size={28} color="white" />
                    </TouchableOpacity>
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Ionicons name="share-social" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.iconBtn}
                            onPress={() => setIsFavorite(!isFavorite)}
                        >
                            <MaterialCommunityIcons
                                name={isFavorite ? 'heart' : 'heart-outline'}
                                size={24}
                                color={isFavorite ? '#FF6B6B' : 'white'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
                    <View style={styles.statusBadge}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>Đang mở đăng ký</Text>
                    </View>
                    <Text style={[styles.title, { color: colors.text }]}>HCM Pickleball Open 2025</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Giải đấu mở rộng quy mô lớn nhất năm
                    </Text>
                </View>


                <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
                    <View style={styles.infoCardsGrid}>
                        {infoCards.map((card, index) => (
                            <View key={index} style={[styles.infoCard, { backgroundColor: colors.cardSecondary, borderColor: colors.border }]}>
                                <MaterialCommunityIcons
                                    name={card.icon as any}
                                    size={24}
                                    color="#00D9B5"
                                />
                                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{card.label}</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>{card.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>


                <View style={[styles.tabsContainer, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
                    {['overview', 'schedule', 'rules', 'prizes'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                styles.tabBtn,
                                activeTab === tab && styles.tabBtnActive,
                            ]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text
                                style={[
                                    styles.tabLabel,
                                    activeTab === tab && styles.tabLabelActive,
                                    { color: activeTab === tab ? '#00D9B5' : colors.textSecondary }
                                ]}
                            >
                                {tab === 'overview' && 'Tổng quan'}
                                {tab === 'schedule' && 'Lịch thi đấu'}
                                {tab === 'rules' && 'Thể lệ'}
                                {tab === 'prizes' && 'Giải thưởng'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>


                {activeTab === 'overview' && (
                    <>

                        <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
                            <Text style={[styles.sectionHeading, { color: colors.text }]}>Về giải đấu</Text>
                            <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>
                                HCM Pickleball Open 2025 là giải đấu mở rộng quy mô lớn nhất
                                trong năm, thu hút hơn 250 vận động viên từ khắp cả nước. Giải
                                đấu được tổ chức theo tiêu chuẩn quốc tế với hệ thống sân thi
                                đấu hiện đại.
                            </Text>
                            <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>
                                Đây là cơ hội tuyệt vời để các tay vợt thể hiện kỹ năng, giao
                                lưu học hỏi và tranh tài công bằng trong môi trường chuyên
                                nghiệp.
                            </Text>
                        </View>


                        <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
                            <Text style={[styles.sectionHeading, { color: colors.text }]}>Hạng đấu</Text>
                            <View style={styles.categoriesGrid}>
                                {categories.map((cat, index) => (
                                    <View key={index} style={[styles.categoryCard, { backgroundColor: colors.backgroundTertiary, borderColor: colors.border }]}>
                                        <View style={styles.categoryIcon}>
                                            <MaterialCommunityIcons
                                                name={cat.icon as any}
                                                size={28}
                                                color="white"
                                            />
                                        </View>
                                        <Text style={[styles.categoryName, { color: colors.text }]}>{cat.name}</Text>
                                        <Text style={[styles.categoryCount, { color: colors.textSecondary }]}>{cat.count}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>


                        <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
                            <Text style={[styles.sectionHeading, { color: colors.text }]}>Lệ phí tham gia</Text>
                            {fees.map((fee, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.feeItem,
                                        fee.discount && styles.feeItemFeatured,
                                        { backgroundColor: colors.backgroundTertiary, borderColor: colors.border }
                                    ]}
                                >
                                    <View>
                                        <Text style={[styles.feeName, { color: colors.text }]}>{fee.name}</Text>
                                    </View>
                                    <View style={styles.feeRight}>
                                        {fee.discount && (
                                            <View style={styles.feeBadge}>
                                                <Text style={styles.feeBadgeText}>{fee.discount}</Text>
                                            </View>
                                        )}
                                        <Text style={[styles.feeAmount, { color: colors.text }]}>{fee.amount}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>


                        <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
                            <Text style={[styles.sectionHeading, { color: colors.text }]}>Ban tổ chức</Text>
                            <View style={[styles.organizerCard, { backgroundColor: colors.backgroundTertiary, borderColor: colors.border }]}>
                                <View style={styles.organizerLogo}>
                                    <Text style={styles.organizerLogoText}>ONE</Text>
                                </View>
                                <View style={styles.organizerInfo}>
                                    <Text style={[styles.organizerName, { color: colors.text }]}>onePickleball Vietnam</Text>
                                    <Text style={[styles.organizerDesc, { color: colors.textSecondary }]}>
                                        Đơn vị tổ chức giải đấu Pickleball chuyên nghiệp
                                    </Text>
                                    <TouchableOpacity style={styles.contactLink}>
                                        <Ionicons name="call" size={18} color="#00D9B5" />
                                        <Text style={styles.contactText}>0901 234 567</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.contactLink}>
                                        <Ionicons name="mail" size={18} color="#00D9B5" />
                                        <Text style={styles.contactText}>info@onepickleball.vn</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </>
                )}

                {activeTab !== 'overview' && (
                    <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
                        <Text style={[styles.sectionHeading, { color: colors.text }]}>
                            {activeTab === 'schedule' && 'Lịch thi đấu'}
                            {activeTab === 'rules' && 'Thể lệ'}
                            {activeTab === 'prizes' && 'Giải thưởng'}
                        </Text>
                        <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>
                            Nội dung sẽ được cập nhật sớm
                        </Text>
                    </View>
                )}
            </ScrollView>


            <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
                <View style={styles.footerInfo}>
                    <View>
                        <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>Từ</Text>
                        <Text style={styles.priceValue}>500.000đ</Text>
                    </View>
                    <View style={styles.deadlineInfo}>
                        <Ionicons name="time" size={18} color={colors.icon} />
                        <Text style={[styles.deadlineText, { color: colors.textSecondary }]}>Đóng đăng ký sau 5 ngày</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.registerBtn}>
                    <Text style={styles.registerBtnText}>Đăng ký ngay</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

