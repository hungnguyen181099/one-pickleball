import React, { useState } from 'react';

import { EventInfoCard } from '@/types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Grid, GridItem } from '@/components/ui/Grid';

import { styles } from '@/constants/styles/eventdeatil.styles';

import { useThemedColors } from '@/hooks/use-theme';

import { useSession } from '@/contexts/AuthProvider';
import tournamentService from '@/services/api/tournament.service';
import { formatDate, isStartDateAfterDeadline } from '@/utils/date.utils';
import { fetchWrapper } from '@/utils/fetch.utils';
import { formatCurrency } from '@/utils/format.utils';
import { Image } from 'expo-image';
import ImageView from 'react-native-image-viewing';

type JoinTournamentBody = {
  athlete_name: string;
  email: string;
  phone: string;
  category_id: number;
}

export default function EventDetailScreen() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useThemedColors();
  const { user } = useSession()

  const queryClient = useQueryClient()
  const { status, data, isPending } = useQuery({
    queryKey: ['getTournamentById', id],
    queryFn: () => tournamentService.getTournamentById(id),
  });

  const { data: userTournament } = useQuery({
    queryKey: ['getUserTournament'],
    queryFn: () => tournamentService.getUserTournament(),
  });

  const { data: Categories } = useQuery({
    queryKey: ['getCategories'],
    queryFn: () => tournamentService.getTournamentCategories(id),
  });
  const { mutate: joinTournament } = useMutation({
    mutationFn: (data: JoinTournamentBody) => fetchWrapper(`/tournaments/${id}/register`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserTournament"] })
    }
  })

  if (status === 'pending') return <Text>Loading...</Text>;

  if (status === 'error') return;

  const isExpired = isStartDateAfterDeadline( data?.registration_deadline)

  const infoCards: EventInfoCard[] = [
    { icon: 'calendar', label: 'Thời gian', value: formatDate(data?.start_date) },
    { icon: 'map-marker', label: 'Địa điểm', value: data?.location || 'N/A' },
    { icon: 'human-male-female', label: 'Đã đăng ký', value: `${data?.participants_count}/${data?.max_participants}` },
    { icon: 'star', label: 'Giải thưởng', value: formatCurrency(data?.prizes || 0) },
  ];

  const joined = userTournament?.data.some(item => String(item.tournament.id) === id)

  const handleSumbit = () => {
    if (!selectedCategory) return Alert.alert("Vui lòng chọn hạng đấu")

    const category = Categories?.categories.find(c => c.id === selectedCategory);

    if (user) {
      router.push({
        pathname: "/(stack)/registerTournament",
        params: {
          tournamentId: id,
          categoryId: selectedCategory,
          categoryName: category?.category_name,
          ageGroup: category?.age_group,
          price: data?.price,
          categoryType: category?.category_type
        }
      })
    } else {
      Alert.alert("Bạn cần đăng nhập để đăng ký")
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Pressable
            style={styles.headerImage}
            onPress={() => setIsImageViewVisible(true)}
          >
            <Image style={styles.headerGradient} source={data.image_url} />
          </Pressable>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="share-social" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={() => setIsFavorite(!isFavorite)}>
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
            <View style={[styles.statusDot, { backgroundColor: !isExpired ? '#00D9B5' : '#FF6B6B' }]} />
            <Text style={[styles.statusText, { color: !isExpired ? '#00D9B5' : '#FF6B6B' }]}>{!isExpired ? 'Đang mở đăng ký' : 'Đã đóng đăng ký'}</Text>
          </View>
          <Text style={[styles.title, { color: colors.text }]}>{data?.name}</Text>
        </View>

        <Grid columns={2} gap={8} style={styles.infoCardsGrid}>
          {infoCards.map((card, index) => (
            <GridItem key={index}>
              <View
                style={[styles.infoCard, { backgroundColor: colors.backgroundTertiary, borderColor: colors.border }]}
              >
                <MaterialCommunityIcons name={card.icon as any} size={24} color="#00D9B5" />
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{card.label}</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{card.value}</Text>
              </View>
            </GridItem>
          ))}
        </Grid>

        <View style={[styles.tabsContainer, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
          {['overview', 'schedule', 'rules', 'prizes'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === tab && styles.tabLabelActive,
                  { color: activeTab === tab ? '#00D9B5' : colors.textSecondary },
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
              <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>{data.description}</Text>
            </View>

            {/* <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionHeading, { color: colors.text }]}>Hạng đấu</Text>
              <View style={styles.categoriesGrid}>
                {categories.map((cat, index) => (
                  <View
                    key={index}
                    style={[
                      styles.categoryCard,
                      { backgroundColor: colors.backgroundTertiary, borderColor: colors.border },
                    ]}
                  >
                    <View style={styles.categoryIcon}>
                      <MaterialCommunityIcons name={cat.icon as any} size={28} color="white" />
                    </View>
                    <Text style={[styles.categoryName, { color: colors.text }]}>{cat.name}</Text>
                    <Text style={[styles.categoryCount, { color: colors.textSecondary }]}>{cat.count}</Text>
                  </View>
                ))}
              </View>
            </View> */}

            <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionHeading, { color: colors.text }]}>Nội dung thi đấu</Text>
              {Categories?.categories.map((fee) => {
                const isSelected = selectedCategory === fee.id;
                return (
                  <Pressable
                    key={fee.id}
                    onPress={() => setSelectedCategory(fee.id)}
                    style={[
                      styles.feeItem,
                      { backgroundColor: colors.backgroundTertiary, borderColor: colors.border },
                      isSelected && styles.feeItemFeatured,
                    ]}
                  >
                    <View>
                      <Text style={[styles.feeName, { color: colors.text }]}>{fee.category_name} ({fee.age_group})</Text>
                    </View>
                    <View style={styles.feeRight}>
                      <Text style={[styles.feeAmount, { color: colors.text }]}>{fee.current_participants}/{fee.max_participants}</Text>
                    </View>
                  </Pressable>
                )
              })}

            </View>

            <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionHeading, { color: colors.text }]}>Ban tổ chức</Text>
              <View
                style={[
                  styles.organizerCard,
                  { backgroundColor: colors.backgroundTertiary, borderColor: colors.border },
                ]}
              >
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
                    <Text style={styles.contactText}>{data.organizer_hotline}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.contactLink}>
                    <Ionicons name="mail" size={18} color="#00D9B5" />
                    <Text style={styles.contactText}>{data.organizer_email}</Text>
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
            <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>Nội dung sẽ được cập nhật sớm</Text>
          </View>
        )}
      </ScrollView>

      {isExpired ? null : <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <View style={styles.footerInfo}>
          <View>
            <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>Từ</Text>
            <Text style={styles.priceValue}>{formatCurrency(data?.price || 0)}</Text>
          </View>
          <View style={styles.deadlineInfo}>
            <Ionicons name="time" size={18} color={colors.icon} />
            <Text style={[styles.deadlineText, { color: colors.textSecondary }]}>
              Hạn đăng ký: {formatDate(data?.registration_deadline)}
            </Text>
          </View>
        </View>
        <TouchableOpacity disabled={joined} onPress={handleSumbit} style={[styles.registerBtn, { opacity: joined ? 0.5 : 1 }]}>
          {joined ? (
            <Text style={styles.registerBtnText}>Đã Đăng ký</Text>
          ) : (
            <Text style={styles.registerBtnText}>Đăng ký ngay</Text>
          )}
        </TouchableOpacity>
      </View>}


      <ImageView
        images={[{ uri: data?.image_url }]}
        imageIndex={0}
        visible={isImageViewVisible}
        onRequestClose={() => setIsImageViewVisible(false)}
        doubleTapToZoomEnabled
        animationType='slide'
      />
    </View>
  );
}
