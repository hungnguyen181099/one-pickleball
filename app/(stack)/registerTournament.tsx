import { useSession } from '@/contexts/AuthProvider'
import { useThemedColors } from '@/hooks/use-theme'
import { fetchWrapper } from '@/utils/fetch.utils'
import { formatCurrency } from '@/utils/format.utils'
import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

type JoinTournamentBody = {
  athlete_name: string;
  email: string;
  phone: string;
  category_id: number;
}

export default function RegisterTournament() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { user } = useSession();
  const colors = useThemedColors();
  const queryClient = useQueryClient();

  const { tournamentId, categoryId, categoryName, ageGroup, price } = params;

  const [athleteName, setAthleteName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');

  const { mutate: joinTournament, isPending } = useMutation({
    mutationFn: (data: JoinTournamentBody) => fetchWrapper(`/tournaments/${tournamentId}/register`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserTournament"] })
    }
  })

  const handleConfirm = () => {
    if (!athleteName || !phone || !email) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    const body = {
      athlete_name: athleteName,
      email: email,
      phone: phone,
      category_id: Number(categoryId)
    }

    joinTournament(body, {
      onSuccess: () => {
        Alert.alert("Thành công", "Đăng ký giải đấu thành công!", [
          {
            text: "OK",
            onPress: () => {
              router.back();
            }
          }
        ])
      },
      onError: (error) => {
        console.log(error);
        Alert.alert("Thất bại", "Đăng ký thất bại. Vui lòng thử lại.");
      }
    })
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Xác nhận đăng ký</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Thông tin giải đấu</Text>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Hạng mục:</Text>
            <Text style={[styles.value, { color: colors.text }]}>{categoryName} ({ageGroup})</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Lệ phí:</Text>
            <Text style={[styles.value, { color: '#00D9B5', fontWeight: 'bold' }]}>{formatCurrency(Number(price) || 0)}</Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Thông tin vận động viên</Text>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Họ và tên</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.backgroundTertiary }]}
              value={athleteName}
              onChangeText={setAthleteName}
              placeholder="Nhập họ tên"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Số điện thoại</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.backgroundTertiary }]}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Nhập số điện thoại"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Email</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.backgroundTertiary }]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Nhập email"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>

      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <TouchableOpacity
          onPress={handleConfirm}
          disabled={isPending}
          style={[styles.confirmBtn, { opacity: isPending ? 0.7 : 1 }]}
        >
          {isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.confirmBtnText}>Xác nhận đăng ký</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
  },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    paddingBottom: 32, // Safe area
  },
  confirmBtn: {
    backgroundColor: '#00D9B5',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
})