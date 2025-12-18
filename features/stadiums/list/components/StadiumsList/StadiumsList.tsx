import React, { useState } from 'react';

import { StyleColorsProps } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { Pagination } from '@/components/ui/Pagination';

import { AppColors, Radius, Shadows } from '@/constants/theme';

import { useStadiums } from '@/features/stadiums/shared/hooks/useStadiums';

import { useThemedColors } from '@/hooks/use-theme';

const StadiumsList = () => {
  const [page, setPage] = useState<number>(1);
  const { data, status } = useStadiums({
    page: page,
  });

  const styles = getStyles({ colors: useThemedColors() });

  if (status === 'pending') {
    return;
  }

  if (status === 'error') {
    return;
  }

  return (
    <FlatList
      data={data.data}
      renderItem={({ item }) => (
        <Pressable style={styles.card}>
          <Image source={item.image} contentFit="cover" style={styles.image} />
          <View style={styles.body}>
            <Text style={styles.name}>{item.name}</Text>

            {/* Rating */}
            <View style={styles.rating}>
              <MaterialCommunityIcons name="star" size={16} color="#fbbc04" />
              <Text>{item.rating}/5</Text>
              <Text style={styles.textSecondary}>({item.rating_count} đánh giá)</Text>
            </View>

            {/* Address */}
            <View style={styles.address}>
              <MaterialCommunityIcons
                name="map-marker-radius-outline"
                size={16}
                style={[styles.iconSecondary, styles.iconTranslate]}
              />
              <Text style={styles.textSecondary}>{item.address}</Text>
            </View>

            {/* Time */}
            <View style={styles.time}>
              <MaterialCommunityIcons
                name="clock-time-four-outline"
                size={16}
                color="black"
                style={styles.iconSecondary}
              />
              <Text style={styles.textSecondary}>{item.opening_hours}</Text>
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
        </Pressable>
      )}
      keyExtractor={(item) => String(item.id)}
      ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      style={styles.list}
      ListFooterComponent={
        <Pagination
          currentPage={data.meta.current_page}
          totalPages={data.meta.last_page}
          onPageChange={setPage}
          style={styles.pagination}
        />
      }
    />
  );
};

const getStyles = ({ colors }: StyleColorsProps) =>
  StyleSheet.create({
    list: {
      flex: 1,
      padding: 4,
    },
    card: {
      borderRadius: Radius.md,
      overflow: 'hidden',
      backgroundColor: colors.card,
      ...Shadows.sm,
    },
    image: {
      width: '100%',
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
    pagination: {
      paddingVertical: 16,
    },
  });

export default StadiumsList;
