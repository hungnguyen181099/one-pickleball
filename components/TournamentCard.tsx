import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';
import { useThemedColors } from '@/hooks/use-theme';
import { Tournament } from '@/types';
import { formatDate } from '@/utils/date.utils';
import { formatCurrency } from '@/utils/format.utils';

interface TournamentCardProps {
    tournament: Tournament;
}

const TournamentCard = ({ tournament }: TournamentCardProps) => {
    const colors = useThemedColors();

    // Status mapping logic
    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'upcoming':
                return {
                    label: 'Sắp diễn ra',
                    color: AppColors.primary,
                    bgColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'transparent',
                    dotColor: AppColors.primary
                };
            case 'ongoing':
                return {
                    label: 'Đang nhận đăng ký',
                    color: '#d97706', // orange-600
                    bgColor: '#ffedd5', // orange-100
                    borderColor: '#fed7aa', // orange-200
                    dotColor: null
                };
            case 'completed':
                return {
                    label: 'Đã hoàn thành',
                    color: '#64748b', // slate-500
                    bgColor: '#f1f5f9', // slate-100
                    borderColor: 'transparent',
                    dotColor: null
                };
            default:
                return {
                    label: 'Mở',
                    color: AppColors.primary,
                    bgColor: 'white',
                    borderColor: 'transparent',
                    dotColor: AppColors.primary
                };
        }
    };

    const statusInfo = getStatusInfo(tournament.status);
    const isCompleted = tournament.status === 'completed';

    const handlePress = () => {
        router.push({
            pathname: '/(details)/eventDetail/[id]',
            params: { id: tournament.id },
        });
    };

    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
                styles.card,
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border
                }
            ]}
        >

            <View style={styles.imageContainer}>
                <Image
                    source={tournament.image_url || 'https://via.placeholder.com/400x200'}
                    style={[styles.image, isCompleted && styles.imageGrayscale]}
                    contentFit="cover"
                    transition={500}
                />

                <View style={styles.badgeContainer}>
                    <View style={[
                        styles.badge,
                        { backgroundColor: statusInfo.bgColor, borderColor: statusInfo.borderColor, borderWidth: statusInfo.borderColor ? 1 : 0 }
                    ]}>
                        {statusInfo.dotColor && (
                            <View style={[styles.badgeDot, { backgroundColor: statusInfo.dotColor }]} />
                        )}
                        <Text style={[styles.badgeText, { color: statusInfo.color }]}>
                            {statusInfo.label}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
                        {tournament.name}
                    </Text>
                    <View style={styles.metaRow}>
                        <MaterialIcons name="calendar-today" size={16} color={colors.textSecondary} />
                        <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                            {formatDate(tournament.start_date)}
                        </Text>
                    </View>
                    <View style={styles.metaRow}>
                        <MaterialIcons name="location-pin" size={16} color={colors.textSecondary} />
                        <Text style={[styles.metaText, { color: colors.textSecondary }]} numberOfLines={1}>
                            {tournament.location}
                        </Text>
                    </View>
                </View>

                <View style={[styles.separator, { backgroundColor: colors.border }]} />

                <View style={styles.footer}>
                    <View>
                        <Text style={[styles.label, { color: colors.textTertiary }]}>PHÍ THAM DỰ</Text>
                        <Text style={[styles.price, {
                            color: isCompleted ? colors.textTertiary : AppColors.primary,
                            textDecorationLine: isCompleted ? 'line-through' : 'none'
                        }]}>
                            {tournament.price ? formatCurrency(tournament.price) : 'Miễn phí'}
                        </Text>
                    </View>

                    {tournament.status === 'ongoing' ? (
                        <Pressable style={[styles.button, styles.buttonOutline]} onPress={handlePress}>
                            <Text style={styles.buttonTextOutline}>Đăng ký</Text>
                        </Pressable>
                    ) : tournament.status === 'completed' ? (
                        <Pressable style={[styles.button, styles.buttonGhost]} onPress={handlePress}>
                            <Text style={styles.buttonTextGhost}>Xem kết quả</Text>
                        </Pressable>
                    ) : (
                        <Pressable style={[styles.button, styles.buttonPrimary]} onPress={handlePress}>
                            <Text style={styles.buttonTextPrimary}>Chi tiết</Text>
                            <MaterialIcons name="arrow-forward" size={18} color="white" />
                        </Pressable>
                    )}
                </View>

            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        borderWidth: 1,
    },
    imageContainer: {
        height: 160,
        width: '100%',
        position: 'relative',
        backgroundColor: '#e2e8f0',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageGrayscale: {
        // Expo Image doesn't support grayscale prop directly easily without plugin,
        // but we can manipulate opacity or tint. For now just keeping it standard image.
        // Alternatively could use a tintColor overlaid or opacity.
    },
    badgeContainer: {
        position: 'absolute',
        top: 12,
        left: 12,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: Radius.full,
        // rough backdrop blur simulation with opacity
    },
    badgeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    content: {
        padding: 16,
        gap: 12,
    },
    header: {
        gap: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 24,
    },
    metaRow: {
        flexDirection: 'row',
        gap: 4
    },
    metaText: {
        fontSize: 14,
        flex: 1,
    },
    metaDot: {
        marginHorizontal: 4,
    },
    separator: {
        height: 1,
        width: '100%',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 4,
    },
    label: {
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: Radius.full,
        gap: 6,
    },
    buttonPrimary: {
        backgroundColor: AppColors.primary,
    },
    buttonTextPrimary: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: AppColors.primary,
    },
    buttonTextOutline: {
        color: AppColors.primary,
        fontSize: 14,
        fontWeight: '700',
    },
    buttonGhost: {
        backgroundColor: '#f1f5f9', // slate-100
    },
    buttonTextGhost: {
        color: '#64748b', // slate-500
        fontSize: 14,
        fontWeight: '500',
    },
});

export default TournamentCard;
