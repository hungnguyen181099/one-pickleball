import React, { useState } from 'react';

import { View } from 'react-native';

import { Pagination } from '@/components/ui/Pagination';

const TestScreen = () => {
  const [page, setPage] = useState<number>(1);

  return (
    <View>
      <Pagination currentPage={page} totalPages={10} onClick={setPage} onNext={setPage} onPrevious={setPage} />
    </View>
  );
};

export default TestScreen;
