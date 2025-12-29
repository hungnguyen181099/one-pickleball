import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { styles } from '@/constants/styles/tournament.styles';
import { AppColors, Radius } from '@/constants/theme';
import { useThemedColors } from '@/hooks/use-theme';
import { statuses, TournamentStatus } from '@/types';
import { TournamentList } from '@/components/TournamentList';


export default function TournamentScreen() {
  const [status, setStatus] = useState<TournamentStatus | undefined>(undefined);
  const colors = useThemedColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Text size='h2'>Giải đấu</Text>
        <TouchableOpacity onPress={() => router.push('/search')} style={styles.searchBtn}>
          <Ionicons name="search" size={24} color={colors.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingHorizontal: 4, paddingBottom: 4 }}
            style={{ marginHorizontal: -4 }} // Offset padding
          >
            {statuses.map((item, index) => {
              const isActive = status === item.value;
              return (
                <Pressable
                  key={index}
                  onPress={() => setStatus(item.value)}
                  style={({ pressed }) => [
                    {
                      height: 36,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 20,
                      borderRadius: Radius.full,
                      backgroundColor: isActive ? AppColors.primary : colors.card,
                      borderWidth: 1,
                      borderColor: isActive ? AppColors.primary : colors.border,
                      transform: [{ scale: pressed ? 0.95 : 1 }]
                    }
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: isActive ? 'white' : colors.textSecondary
                    }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ gap: 16 }}>
          <TournamentList status={status} />
        </View>

      </ScrollView>
    </View>
  );
}
