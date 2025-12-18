import React, { useState } from 'react';

import { StyleColorsProps } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { FlatList, Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';

import { Input } from '@/components/ui/Input';
import { Pagination } from '@/components/ui/Pagination';

import { AppColors, Radius, Shadows } from '@/constants/theme';

import { useStadiums } from '@/features/stadiums/shared/hooks/useStadiums';

import { useThemedColors } from '@/hooks/use-theme';

const StadiumsList = () => {
  const [searchSubmit, setSearchSubmit] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const colors = useThemedColors();

  const { data, status } = useStadiums({
    page,
    search: searchSubmit,
  });

  const styles = getStyles({ colors });

  const handleSearch = () => {
    Keyboard.dismiss();
    setSearchSubmit(search);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Input
            value={search}
            onChangeText={setSearch}
            placeholder="Tìm theo tên ..."
            startIcon={<MaterialCommunityIcons name="magnify" size={20} color={colors.icon} />}
            maxLength={50}
            styleFor={{ input: styles.input }}
          />
        </View>
        <Pressable style={styles.searchButton} onPress={handleSearch}>
          <Text>Tìm kiếm</Text>
        </Pressable>
      </View>

      {status === 'pending' ? (
        <Text>Đang tải...</Text>
      ) : status === 'error' ? (
        <Text>Có lỗi xảy ra</Text>
      ) : (
        <FlatList
          data={data.data}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} contentFit="cover" style={styles.image} />
              <View style={styles.body}>
                {/* Name */}
                <Text style={styles.name}>{item.name}</Text>

                {/* Rating */}
                <View style={styles.rating}>
                  <MaterialCommunityIcons name="star" size={16} color="#fbbc04" />
                  <Text>{item.rating}/5</Text>
                  <Text style={[styles.textSecondary, styles.textItem]}>({item.rating_count} đánh giá)</Text>
                </View>

                {/* Address */}
                <View style={styles.address}>
                  <MaterialCommunityIcons
                    name="map-marker-radius-outline"
                    size={16}
                    style={[styles.iconSecondary, styles.iconTranslate]}
                  />
                  <Text style={[styles.textSecondary, styles.textItem]}>{item.address}</Text>
                </View>

                {/* Time */}
                <View style={styles.time}>
                  <MaterialCommunityIcons
                    name="clock-time-four-outline"
                    size={16}
                    color="black"
                    style={styles.iconSecondary}
                  />
                  <Text style={[styles.textSecondary, styles.textItem]}>{item.opening_hours}</Text>
                </View>

                {/* Amenities */}
                <View style={styles.amenity}>
                  {item.amenities.map((amenity, index) => (
                    <View key={index} style={styles.amenityItem}>
                      <Text style={styles.textSecondary}>{amenity}</Text>
                    </View>
                  ))}
                </View>

                {/* CTA */}
                <Pressable style={styles.btn}>
                  <Text style={styles.btnText}>Đặt sân</Text>
                </Pressable>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={
            <>
              {data.meta.total > 0 && (
                <Pagination
                  currentPage={data.meta.current_page}
                  totalPages={data.meta.last_page}
                  onPageChange={setPage}
                  style={styles.pagination}
                />
              )}
            </>
          }
          ListEmptyComponent={<Text>Không tìm thấy sân</Text>}
          style={styles.list}
        />
      )}
    </View>
  );
};

const getStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 8,
    },
    // Search
    searchContainer: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 8,
    },
    searchInput: {
      flex: 1,
    },
    searchButton: {
      backgroundColor: `${AppColors.primary}20`,
      borderRadius: Radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: AppColors.primary,
    },
    input: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    // List
    list: {
      paddingHorizontal: 4,
      marginHorizontal: -4,
    },
    card: {
      borderRadius: Radius.md,
      overflow: 'hidden',
      backgroundColor: colors.card,
      ...Shadows.sm,
    },
    image: {
      aspectRatio: 16 / 9,
      maxHeight: 256,
    },
    body: {
      padding: 16,
      gap: 4,
    },
    separator: {
      height: 16,
    },
    name: {
      fontSize: 18,
      fontWeight: 500,
      marginBottom: 4,
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    address: {
      flexDirection: 'row',
      gap: 8,
    },
    textItem: {
      flex: 1,
    },
    iconSecondary: {
      color: colors.textSecondary,
    },
    iconTranslate: {
      transform: [{ translateY: 2 }],
    },
    time: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    textSecondary: {
      color: colors.textSecondary,
    },
    amenity: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 4,
    },
    amenityItem: {
      padding: 4,
      paddingHorizontal: 8,
      borderRadius: Radius.full,
      backgroundColor: colors.input,
      borderWidth: 1,
      borderColor: colors.inputBorder,
    },
    btn: {
      marginTop: 8,
      padding: 12,
      borderRadius: Radius.sm,
      backgroundColor: AppColors.primary,
      alignItems: 'center',
    },
    btnText: {
      color: AppColors.white,
      fontWeight: 500,
    },
    // Pagination
    pagination: {
      paddingVertical: 16,
    },
  });

export default StadiumsList;
