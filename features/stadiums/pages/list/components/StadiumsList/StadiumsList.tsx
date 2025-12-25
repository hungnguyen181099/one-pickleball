import React, { useState } from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { FlatList, Keyboard, ScrollView, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Input } from '@/components/ui/Input';
import { Pagination } from '@/components/ui/Pagination';
import { Separator } from '@/components/ui/Separator';
import { StadiumCardSkeleton } from '@/components/ui/Skeleton';
import { Text } from '@/components/ui/Text';

import { useStadiums } from '@/features/stadiums/shared/hooks/useStadiums';

import { useThemedColors } from '@/hooks/use-theme';
import { useGetStyles } from '@/hooks/useGetStyles';

import { getStadiumListStyles } from './StadiumsList.styles';

const StadiumsList = () => {
  const [searchSubmit, setSearchSubmit] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const colors = useThemedColors();

  const { data, status } = useStadiums({
    page,
    search: searchSubmit,
  });

  const styles = useGetStyles(getStadiumListStyles);

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
            placeholder="Nhập tên sân ..."
            startIcon={<MaterialIcons name="search" size={24} color={colors.icon} />}
            maxLength={50}
          />
        </View>
        <Button
          size="sm"
          variant="light"
          onPress={handleSearch}
          styleOverrides={{
            container: styles.searchButtonContainer,
            text: styles.searchButtonText,
          }}
        >
          Tìm kiêm
        </Button>
      </View>

      {status === 'pending' ? (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
          {[1, 2].map((item) => (
            <View key={item} style={{ marginBottom: 16 }}>
              <StadiumCardSkeleton />
            </View>
          ))}
        </ScrollView>
      ) : status === 'error' ? (
        <Text>Có lỗi xảy ra</Text>
      ) : (
        <FlatList
          data={data.data}
          renderItem={({ item }) => (
            <Card radius="xl">
              <Image source={item.image} contentFit="cover" style={styles.image} />

              <Flex gap={4} style={styles.rating}>
                <MaterialIcons name="star" style={styles.ratingIcon} />
                <Text style={styles.ratingText} fontWeight={600}>
                  {item.rating} ({item.rating_count})
                </Text>
              </Flex>

              <View style={styles.body}>
                {/* Name */}
                <Text size="h2">{item.name}</Text>

                {/* Address */}
                <Flex gap={8} alignItems="flex-start">
                  <Icon variant="fit" color="muted" translateY={3}>
                    <MaterialIcons name="location-on" size={18} />
                  </Icon>
                  <Text color="muted" style={styles.textItem}>
                    {item.address}
                  </Text>
                </Flex>

                {/* Time */}
                <Flex gap={8} alignItems="flex-start">
                  <Icon variant="fit" color="muted" translateY={3}>
                    <MaterialIcons name="access-time-filled" size={18} />
                  </Icon>
                  <Text color="muted" style={styles.textItem}>
                    {item.opening_time} - {item.closing_time}
                  </Text>
                </Flex>

                <Separator marginVertical={8} />

                {/* CTA */}
                <Button
                  fullWidth
                  variant="filled"
                  onPress={() =>
                    router.navigate({
                      pathname: '/stadiums/[stadiumId]',
                      params: {
                        stadiumId: item.id,
                      },
                    })
                  }
                  styleOverrides={{ container: styles.btn, text: styles.btnText }}
                >
                  Đặt sân
                </Button>
              </View>
            </Card>
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

export default StadiumsList;
