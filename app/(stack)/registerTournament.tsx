import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import z from 'zod';

import { RHFLayout } from '@/components/rhf/RHFLayout';
import { RHFTextInput } from '@/components/rhf/RHFTextInput';

import { useSession } from '@/contexts/AuthProvider';

import { useThemedColors } from '@/hooks/use-theme';

import { fetchWrapper } from '@/utils/fetch.utils';
import { formatCurrency } from '@/utils/format.utils';
import { Text } from '@/components/ui/Text';

type JoinTournamentBody = {
  athlete_name: string;
  email: string;
  phone: string;
  category_id: string;
  partner_name?: string;
};

type SearchPamram = {
  tournamentId: string;
  categoryId: string;
  categoryName: string;
  ageGroup: string;
  price: string;
  categoryType: string;
};

const getRegisterTournamentSchema = (isDouble: boolean) =>
  z.object({
    athleteName: z.string().min(1, 'Tên phải có ít nhất 1 ký tự'),
    phone: z
      .string()
      .min(1, 'Không được để trống')
      .regex(/(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/g, 'Vui lòng nhập đúng định dạng'),
    email: z.string().email('Vui lòng nhập đúng định dạng'),
    partnerName: isDouble ? z.string().min(1, 'Tên phải có ít nhất 1 ký tự') : z.string().optional(),
    partnerEmail: z.string().optional(),
    partnerPhone: z.string().optional(),
  });

export default function RegisterTournament() {
  const params = useLocalSearchParams<SearchPamram>();
  const router = useRouter();
  const { user } = useSession();
  const colors = useThemedColors();
  const queryClient = useQueryClient();

  const { tournamentId, categoryId, categoryName, ageGroup, price, categoryType } = params;
  const isDouble = categoryType?.includes('double');

  const schema = React.useMemo(() => getRegisterTournamentSchema(!!isDouble), [isDouble]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      athleteName: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      partnerName: '',
      partnerEmail: '',
      partnerPhone: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    const body: JoinTournamentBody = {
      athlete_name: data.athleteName,
      email: data.email,
      phone: data.phone,
      category_id: categoryId,
      ...(isDouble && {
        partner_name: data.partnerName,
        partner_email: data.partnerEmail,
        partner_phone: data.partnerPhone,
      }),
    };

    joinTournament(body, {
      onSuccess: () => {
        Alert.alert('Thành công', 'Đăng ký giải đấu thành công!', [
          {
            text: 'OK',
            onPress: () => {
              router.back();
            },
          },
        ]);
      },
      onError: (error) => {
        console.log(error);
        Alert.alert('Thất bại', 'Đăng ký thất bại. Vui lòng thử lại.');
      },
    });
  });

  const { mutate: joinTournament, isPending } = useMutation({
    mutationFn: (data: JoinTournamentBody) =>
      fetchWrapper(`/tournaments/${tournamentId}/register`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getUserTournament'] });
    },
  });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { backgroundColor: colors.background }]}>
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
            <Text style={[styles.value, { color: colors.text }]}>
              {categoryName} ({ageGroup})
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Lệ phí:</Text>
            <Text style={[styles.value, { color: '#00D9B5', fontWeight: 'bold' }]}>
              {formatCurrency(Number(price) || 0)}
            </Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Thông tin vận động viên</Text>

          <RHFLayout>
            <RHFTextInput
              controller={{
                control: control,
                name: 'athleteName',
                message: errors.athleteName?.message,
              }}
              label="Tên vận động viên"
              input={{
                placeholder: 'Nguyễn Phạm Thảo',
              }}
            />

            <RHFTextInput
              controller={{
                control: control,
                name: 'phone',
                message: errors.phone?.message,
              }}
              label="Số điện thoại"
              input={{
                placeholder: '0987654321',
              }}
            />

            <RHFTextInput
              controller={{
                control: control,
                name: 'email',
                message: errors.email?.message,
              }}
              label="Email"
              input={{
                placeholder: 'onepickleball@gmail.com',
              }}
            />
          </RHFLayout>
        </View>

        {isDouble && (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Thông tin đồng đội</Text>

            <RHFLayout>
              <RHFTextInput
                controller={{
                  control: control,
                  name: 'partnerName',
                  message: errors.partnerName?.message,
                }}
                label="Tên đồng đội"
                input={{
                  placeholder: 'Nguyễn Phạm Thảo',
                }}
              />

              <RHFTextInput
                controller={{
                  control: control,
                  name: 'partnerPhone',
                  message: errors.partnerPhone?.message,
                }}
                label="Số điện thoại đồng đội"
                input={{
                  placeholder: '0987654321 (Tùy chọn)',
                }}
              />

              <RHFTextInput
                controller={{
                  control: control,
                  name: 'partnerEmail',
                  message: errors.partnerEmail?.message,
                }}
                label="Email đồng đội"
                input={{
                  placeholder: 'onepickleball@gmail.com (Tùy chọn)',
                }}
              />
            </RHFLayout>
          </View>
        )}
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <TouchableOpacity
          onPress={onSubmit}
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
    </KeyboardAvoidingView>
  );
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
  },
});
