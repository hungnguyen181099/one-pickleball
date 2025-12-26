import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { DateTimePicker } from '@/components/ui/DateTimePicker';
import { Grid, GridItem } from '@/components/ui/Grid';
import { Space } from '@/components/ui/Space';
import { Text } from '@/components/ui/Text';

import { useGetStyles } from '@/hooks/useGetStyles';

import { getBookingHistoryFilterStyles } from './BookingHistoryFilter.styles';

type BookingHistoryFilterProps = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDateSubmit: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDateSubmit: React.Dispatch<React.SetStateAction<Date | null>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const BookingHistoryFilter = ({
  startDate,
  endDate,
  setStartDateSubmit,
  setEndDateSubmit,
  setStartDate,
  setEndDate,
  setPage,
}: BookingHistoryFilterProps) => {
  const styles = useGetStyles(getBookingHistoryFilterStyles);

  const handleSubmit = () => {
    setStartDateSubmit(startDate);
    setEndDateSubmit(endDate);
    setPage(1);
  };

  return (
    <View style={styles.container}>
      {/* Date select */}
      <Grid columns={2} gap={8}>
        <GridItem>
          <View>
            <Text color="muted">Từ ngày</Text>
            <Space />
            <DateTimePicker value={startDate} onDateChange={setStartDate} />
          </View>
        </GridItem>
        <GridItem>
          <View>
            <Text color="muted">Đến ngày</Text>
            <Space />
            <DateTimePicker value={endDate} onDateChange={setEndDate} />
          </View>
        </GridItem>
      </Grid>

      <Space size="lg" />

      {/* Button */}
      <Button fullWidth startIcon={<MaterialIcons name="filter-alt" size={20} />} onPress={handleSubmit}>
        Áp dụng bộ lọc
      </Button>
    </View>
  );
};

export default BookingHistoryFilter;
