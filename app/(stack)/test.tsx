import React, { useState } from 'react';

import { View } from 'react-native';

import { DebouncedSearch } from '@/components/common/DebouncedSearch';

const TestScreen = () => {
  const [value, setValue] = useState<string>('');

  console.log('🚀 ~ value: ', value);

  return (
    <View>
      <DebouncedSearch onDebouncedChange={setValue} />
    </View>
  );
};

export default TestScreen;
