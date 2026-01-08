import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { Flex } from '@/components/ui/Flex';
import { Grid, GridItem } from '@/components/ui/Grid';
import { Icon } from '@/components/ui/Icon';
import { Separator } from '@/components/ui/Separator';
import { Text } from '@/components/ui/Text';

import { useSession } from '@/contexts/AuthProvider';

import { useGetStyles } from '@/hooks/useGetStyles';

import { hexToHexAlpha } from '@/utils/hexToHexAlpha';

import { homeActions } from '../../constants';
import { getHomeActionsStyles } from './HomeActions.styles';

const HomeActions = () => {
  const styles = useGetStyles(getHomeActionsStyles);
  const { user } = useSession();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Flex>
          <Separator style={styles.line} orientation="vertical"></Separator>
          <Text size="h2">Truy cập nhanh</Text>
        </Flex>
        <Grid columns={2} gap={8}>
          {homeActions.map((item, index) => (
            <GridItem key={index}>
              <Pressable onPress={() => router.navigate(item.href)}>
                <Card radius="xl" padding={16}>
                  <Flex direction="column">
                    <Icon
                      size="lg"
                      variant="light"
                      onPress={() => router.navigate(item.href)}
                      styleOverrides={{
                        container: {
                          backgroundColor: hexToHexAlpha(item.color),
                          borderColor: hexToHexAlpha(item.color),
                        },
                        icon: {
                          color: item.color,
                        },
                      }}
                    >
                      <MaterialIcons name={item.icon} size={24} />
                    </Icon>
                    <Text size="h4">{item.label}</Text>
                  </Flex>
                </Card>
              </Pressable>
            </GridItem>
          ))}
        </Grid>
      </View>

      {user?.role_type?.includes('referee') && (
        <View style={styles.section}>
          <Flex>
            <Separator style={styles.line} orientation="vertical"></Separator>
            <Text size="h2">Trọng tài</Text>
          </Flex>
          <Pressable onPress={() => router.navigate('/listReferee')}>
            <Card radius="xl" padding={16}>
              <Flex direction="column">
                <Icon size="lg" variant="light" onPress={() => router.navigate('/listReferee')}>
                  <MaterialIcons name="dashboard" size={24} />
                </Icon>
                <Text size="h4">Quản lý giải đấu</Text>
              </Flex>
            </Card>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default HomeActions;
