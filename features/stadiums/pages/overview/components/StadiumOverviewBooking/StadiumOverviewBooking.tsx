import React from 'react';

import { dayjsExt } from '@/lib/days';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Separator } from '@/components/ui/Separator';
import { Space } from '@/components/ui/Space';
import { Text } from '@/components/ui/Text';

import { useBookingHistory } from '@/features/bookings/shared/hooks/useBookingHistory';

const StadiumOverviewBooking = () => {
  // const styles = useGetStyles(getStadiumOverviewBookingStyles);

  const { data, status } = useBookingHistory({
    per_page: 5,
    page: 1,
  });

  if (status === 'pending') {
    return;
  }

  if (status === 'error') {
    return;
  }

  const histories = data.data;

  return (
    <View>
      <Flex justifyContent="space-between" alignItems="flex-end">
        <Text size="h2">Lịch sử đặt sân</Text>
        <Link href="/bookings/history">
          <Text size="h4" color="primary">
            Xem tất cả
          </Text>
        </Link>
      </Flex>

      <Space size="lg" />

      <Flex direction="column" alignItems="stretch" gap={16}>
        {histories.map((history) => {
          const today = dayjsExt();
          const bookingDate = dayjsExt(history.booking_date);

          const isExpired = bookingDate.isBefore(today);

          return (
            <Card radius="xl" key={history.id} padding={16}>
              <Flex>
                {/* Name */}
                <Flex direction="column" alignItems="stretch" gap={0} flex={1}>
                  <Text size="h3" numberOfLines={1}>
                    {history.court.court_name}
                  </Text>
                  <Text numberOfLines={1} color="muted">
                    {history.court.stadium.name}
                  </Text>
                </Flex>

                {/* Status */}
                <Badge variant="outline-light" color={isExpired ? 'muted' : 'primary'}>
                  {isExpired ? 'Hết hạn' : 'Sắp tới'}
                </Badge>
              </Flex>

              <Separator marginVertical={16} />

              <View>
                {/* Date */}
                <Flex>
                  <Icon variant="fit" color="muted" translateY={1}>
                    <MaterialIcons name="calendar-month" size={18} />
                  </Icon>
                  <Text>{dayjsExt(history.booking_date).format('D [tháng] M, YYYY')}</Text>
                </Flex>

                {/* Time */}
                <Flex>
                  <Icon variant="fit" color="muted" translateY={1}>
                    <MaterialIcons name="access-time-filled" size={18} />
                  </Icon>
                  <Text color="muted">
                    {history.start_time} - {history.end_time}
                  </Text>
                </Flex>
              </View>

              {/* Check in */}
              {!isExpired && (
                <>
                  <Space size="lg" />
                  <Button
                    fullWidth
                    radius="full"
                    variant="light"
                    startIcon={<MaterialIcons name="qr-code" size={18} />}
                  >
                    Check-in
                  </Button>
                </>
              )}
            </Card>
          );
        })}
      </Flex>
    </View>
  );
};

export default StadiumOverviewBooking;
