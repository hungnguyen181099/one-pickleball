import React, { useState } from 'react';

import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';

import { BookingHistoryFilter } from '../BookingHistoryFilter';
import { BookingHistoryList } from '../BookingHistoryList';

const BookingHistoryScreen = () => {
  const [startDateSubmit, setStartDateSubmit] = useState<Date | null>(null);
  const [endDateSubmit, setEndDateSubmit] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [page, setPage] = useState<number>(1);

  return (
    <ScreenContainer>
      <ScreenHeader title="Lịch sử đặt sân" withBorder={false} />

      <BookingHistoryFilter
        startDate={startDate}
        endDate={endDate}
        setStartDateSubmit={setStartDateSubmit}
        setEndDateSubmit={setEndDateSubmit}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setPage={setPage}
      />

      <BookingHistoryList startDate={startDateSubmit} endDate={endDateSubmit} page={page} setPage={setPage} />
    </ScreenContainer>
  );
};

export default BookingHistoryScreen;
