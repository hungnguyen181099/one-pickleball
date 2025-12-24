import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Flex } from '@/components/ui/Flex';
import { Grid, GridItem } from '@/components/ui/Grid';
import { Icon } from '@/components/ui/Icon';
import { Separator } from '@/components/ui/Separator';
import { Text } from '@/components/ui/Text';

import { useGetStyles } from '@/hooks/useGetStyles';

import { getHomeActionsStyles } from './HomeActions.styles';

type Action = {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  backgroundColor: string;
  primaryColor: string;
  active: boolean;
  href: Href;
};

const actions: Action[] = [
  {
    label: 'Tìm trận đấu',
    icon: 'search',
    backgroundColor: '#3b82f620',
    primaryColor: '#3b82f6',
    active: false,
    href: '/',
  },
  {
    label: 'Tạo trận đấu',
    icon: 'add',
    backgroundColor: '#00d9b520',
    primaryColor: '#00d9b5',
    active: true,
    href: '/',
  },
  {
    label: 'BXH OCR',
    icon: 'leaderboard',
    backgroundColor: '#f9731620',
    primaryColor: '#f97316',
    active: false,
    href: '/(stack)/leaderboard/ocr',
  },
  {
    label: 'BXH OPRS',
    icon: 'emoji-events',
    backgroundColor: '#a855f720',
    primaryColor: '#a855f7',
    active: false,
    href: '/(stack)/leaderboard/oprs',
  },
];

const HomeActions = () => {
  const styles = useGetStyles(getHomeActionsStyles);

  return (
    <View style={styles.container}>
      <Flex>
        <Separator style={styles.line} orientation="vertical"></Separator>
        <Text size="h2">Truy cập nhanh</Text>
      </Flex>

      <Grid columns={2} gap={8}>
        {actions.map((item, index) => {
          const isActive = item.active;

          return (
            <GridItem key={index}>
              <Pressable
                style={[styles.item, isActive && styles.itemActive]}
                onPress={() => router.navigate(item.href)}
              >
                <Flex direction="column">
                  <Icon
                    size="lg"
                    variant={isActive ? 'outline' : 'light'}
                    {...(!isActive && {
                      styleOverrides: {
                        container: {
                          backgroundColor: item.backgroundColor,
                        },
                        icon: {
                          color: item.primaryColor,
                        },
                      },
                    })}
                  >
                    <MaterialIcons name={item.icon} size={24} />
                  </Icon>
                  <Text size="h4" color={isActive ? 'primaryForeground' : 'default'}>
                    {item.label}
                  </Text>
                </Flex>
              </Pressable>
            </GridItem>
          );
        })}
      </Grid>
    </View>
  );
};

export default HomeActions;
