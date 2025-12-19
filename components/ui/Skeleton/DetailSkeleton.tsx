import { styles } from '@/constants/styles/newdetail.styles';
import { useThemedColors } from '@/hooks/use-theme';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Skeleton from './Skeleton';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function DetailSkeleton() {
    const colors = useThemedColors();
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={{ height: 300, width: '100%', position: 'relative' }}>
                <Skeleton width="100%" height="100%" borderRadius={0} />
                <TouchableOpacity style={[{ position: 'absolute', top: 20, left: 16 },styles.backBtnLight]} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={[styles.contentSection, { backgroundColor: colors.card, marginTop: -20, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 16 }]}>
                <Skeleton width={80} height={24} borderRadius={12} style={{ marginBottom: 12 }} />

                <Skeleton width="100%" height={28} borderRadius={4} style={{ marginBottom: 8 }} />
                <Skeleton width="80%" height={28} borderRadius={4} style={{ marginBottom: 24 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                    <Skeleton width={40} height={40} borderRadius={20} style={{ marginRight: 12 }} />
                    <View>
                        <Skeleton width={120} height={16} borderRadius={4} style={{ marginBottom: 4 }} />
                        <Skeleton width={80} height={14} borderRadius={4} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
                    <Skeleton width={60} height={20} borderRadius={4} />
                    <Skeleton width={60} height={20} borderRadius={4} />
                    <Skeleton width={60} height={20} borderRadius={4} />
                </View>

                <Skeleton width="100%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
                <Skeleton width="100%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
                <Skeleton width="100%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
                <Skeleton width="90%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
                <Skeleton width="95%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
            </View>
        </View>
    )
}