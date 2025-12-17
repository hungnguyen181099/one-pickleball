import React from 'react';

import { Text, View } from 'react-native';

import { useStadiums } from '@/features/stadiums/shared/hooks/useStadiums';

const StadiumsList = () => {
  const { data, status } = useStadiums();

  if (status === 'pending') {
    return;
  }

  if (status === 'error') {
    return;
  }

  console.log('data', data);

  return (
    <View>
      <Text>StadiumsList</Text>
    </View>
  );
};

export default StadiumsList;
