import React, { useState } from 'react';

import { View } from 'react-native';

import { Select } from '@/components/ui/Select';

const options = [
  {
    label:
      'Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1',
    value: '1',
  },
  {
    label: 'Item 2',
    value: '2',
  },
  {
    label: 'Item 3',
    value: '3',
  },
];

const TestScreen = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <View>
      <Select options={options} value={value} onChangeValue={setValue} />
    </View>
  );
};

export default TestScreen;
