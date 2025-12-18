import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { registration } from '@/types'
import { useThemedColors } from '@/hooks/use-theme';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { formatDate } from '@/utils/date.utils';
import { styles } from '@/constants/styles/tournament.styles';

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return { bg: '#FFF7ED', text: '#EA580C' }; 
        case 'approved':
            return { bg: '#F0FDF4', text: '#16A34A' }; 
        case 'rejected':
            return { bg: '#FEF2F2', text: '#DC2626' }; 
        default:
            return { bg: '#F9FAFB', text: '#4B5563' };
    }
};

export default function MyTournamentCard(registration: registration) {
    const colors = useThemedColors();
    const statusColors = getStatusColor(registration.status);
    return (
        <Pressable
            // onPress={() => router.push(`/mytournament/${registration.registration_id}` as any)}
            style={[styles.myTournamentCard, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
            <View style={styles.myTournamentHeader}>
                <Text style={[styles.myTournamentTitle, { color: colors.text }]} numberOfLines={2}>
                    {registration.tournament.name}
                </Text>
                <View style={[styles.myTournamentStatusBadge, { backgroundColor: statusColors.bg }]}>
                    <Text style={[styles.myTournamentStatusText, { color: statusColors.text }]}>
                        {registration.status}
                    </Text>
                </View>
            </View>

            <View style={styles.myTournamentDetails}>
                <View style={styles.myTournamentDetailRow}>
                    <Ionicons name="location-outline" size={14} color={colors.icon} />
                    <Text style={[styles.myTournamentDetailText, { color: colors.textSecondary }]} numberOfLines={1}>
                        {registration.tournament.location}
                    </Text>
                </View>
            </View>

            <View style={styles.myTournamentFooter}>
                <Text style={[styles.myTournamentCategory, { color: colors.tint }]}>
                    {registration.category?.name || 'Chưa xác định'}
                </Text>
                <View style={styles.myTournamentDetailRow}>
                    <Ionicons name="calendar-outline" size={14} color={colors.textTertiary} />
                    <Text style={[styles.myTournamentDate, { color: colors.textTertiary }]}>
                        {formatDate(registration.tournament.start_date)}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}