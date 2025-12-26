import React from 'react';

import { dayjsExt } from '@/lib/days';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { ScrollView, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Pagination } from '@/components/ui/Pagination';
import { Separator } from '@/components/ui/Separator';
import { Space } from '@/components/ui/Space';
import { Text } from '@/components/ui/Text';

import { useBookingHistory } from '@/features/bookings/shared/hooks/useBookingHistory';

import { useGetStyles } from '@/hooks/useGetStyles';

import { formatCurrencyWithUnit } from '@/utils/format.utils';

import { getBookingHistoryListStyles } from './BookingHistoryList.styles';

type BookingHistoryListProps = {
  startDate: Date | null;
  endDate: Date | null;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const BookingHistoryList = ({ startDate, endDate, page, setPage }: BookingHistoryListProps) => {
  const { data, status } = useBookingHistory({
    start_date: startDate ? dayjsExt(startDate).format('YYYY-MM-DD') : '',
    end_date: endDate ? dayjsExt(endDate).format('YYYY-MM-DD') : '',
    page,
  });

  const styles = useGetStyles(getBookingHistoryListStyles);

  if (status === 'pending') {
    return null;
  }

  if (status === 'error') {
    return null;
  }

  if (!data.data.length) {
    return (
      <Text textAlign="center" color="muted">
        Không có dữ liệu
      </Text>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.list}>
        {data.data.map((item) => (
          <Card padding={16} radius="xl" key={item.id}>
            <Flex alignItems="stretch" gap={16}>
              {/* Image */}
              <Image source={item.stadium.image} style={styles.image} />

              {/* Content */}
              <View style={styles.content}>
                {/* Stadium */}
                <Text size="h3" numberOfLines={2}>
                  {item.stadium.name}
                </Text>

                {/* Court */}
                <Text size="h4" numberOfLines={1}>
                  {item.court.court_name}
                </Text>

                {/* Time */}
                <View>
                  <Flex gap={8}>
                    <Icon variant="fit" color="muted" translateY={1}>
                      <MaterialIcons name="calendar-month" size={16} />
                    </Icon>
                    <Text color="muted" size="sm">
                      {dayjsExt(item.booking_date).format('DD/MM/YYYY')}
                    </Text>
                  </Flex>

                  <Flex gap={8}>
                    <Icon variant="fit" color="muted" translateY={1}>
                      <MaterialIcons name="access-time-filled" size={16} />
                    </Icon>
                    <Text color="muted" size="sm">
                      {item.start_time} - {item.end_time}
                    </Text>
                  </Flex>
                </View>
              </View>
            </Flex>

            <Separator marginVertical={8} />

            <Flex justifyContent="space-between">
              <View>
                <Text color="muted" size="h5">
                  Tổng tiền
                </Text>
                <Text size="h3" color="primary">
                  {formatCurrencyWithUnit(item.total_price)}
                </Text>
              </View>
              <Badge variant="outline-light" color={item.status === 'pending' ? 'muted' : 'primary'} alignSelf="center">
                {item.status === 'pending' ? 'Chờ xác nhận' : 'Đã xác nhận'}
              </Badge>
            </Flex>
          </Card>
        ))}
      </View>

      <Space size="lg" />

      {data.pagination.total > 0 && (
        <Pagination
          totalPages={data.pagination.last_page}
          currentPage={data.pagination.current_page}
          onPageChange={setPage}
        />
      )}
    </ScrollView>
  );
};

export default BookingHistoryList;
