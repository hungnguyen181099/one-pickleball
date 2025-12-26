import React from 'react';

import { View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Flex } from '@/components/ui/Flex';
import { Grid, GridItem } from '@/components/ui/Grid';
import { Separator } from '@/components/ui/Separator';
import { Text } from '@/components/ui/Text';

import { useGetStyles } from '@/hooks/useGetStyles';

import { useHomeProfile } from '../../hooks/useHomeProfile';
import { getHomeUserStyles } from './HomeUser.styles';

const HomeUser = () => {
  const styles = useGetStyles(getHomeUserStyles);

  const { data, status } = useHomeProfile();

  if (status === 'pending') {
    return null;
  }

  if (status === 'error') {
    return null;
  }

  const user = data.user;

  return (
    <Card radius="xl" padding={24}>
      {/* Corner */}
      <View style={styles.corner}></View>

      {/* Avatar */}
      <Flex justifyContent="center">
        <View style={styles.avatar}>
          <Avatar src="" size={96} />
        </View>
        <View style={styles.badgeContainer}>
          <Flex justifyContent="center">
            <Badge styleOverrides={{ container: styles.badge }}>{user.elo_rank}</Badge>
          </Flex>
        </View>
      </Flex>

      {/* Name */}
      <Flex direction="column" alignItems="center" style={styles.name}>
        <Text size="h1">{user.name}</Text>

        <Flex>
          <Text style={styles.nameBadge}>
            <Text color="muted">ELO: </Text>
            <Text color="primary" size="h4">
              {user.elo_rating}
            </Text>
          </Text>
          <Text style={styles.nameBadge}>
            <Text color="muted">OPR: </Text>
            <Text size="h4">{user.opr_level}</Text>
          </Text>
        </Flex>
      </Flex>

      <Separator marginVertical={20} />

      {/* OCR */}
      <Grid columns={3} gap={4}>
        <GridItem>
          <Flex direction="column" gap={2} style={[styles.ocrItem, styles.ocrItemSecondary]}>
            <Text size="h5" color="muted" textTransform="uppercase">
              Tổng OCR
            </Text>
            <Text size="h3">{user.total_ocr_matches}</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex direction="column" gap={2} style={[styles.ocrItem, styles.ocrItemSuccess]}>
            <Text size="h5" color="success" textTransform="uppercase">
              Thắng
            </Text>
            <Text size="h3" color="success">
              {user.ocr_wins}
            </Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex direction="column" gap={2} style={[styles.ocrItem, styles.ocrItemError]}>
            <Text size="h5" color="error" textTransform="uppercase">
              Thua
            </Text>
            <Text size="h3" color="error">
              {user.ocr_losses}
            </Text>
          </Flex>
        </GridItem>
      </Grid>

      {/* OPR */}
      <Flex gap={0} style={styles.oprContainer}>
        <Flex direction="column" style={styles.oprItem}>
          <Text size="h5" color="muted" textTransform="uppercase">
            Thử thách
          </Text>
          <Text size="h3">{user.challenge_score}</Text>
        </Flex>
        <Separator orientation="vertical" opacity={0.2} />
        <Flex direction="column" style={styles.oprItem}>
          <Text size="h5" color="muted" textTransform="uppercase">
            Cộng đồng
          </Text>
          <Text size="h2">{user.community_score}</Text>
        </Flex>
        <Separator orientation="vertical" opacity={0.2} />
        <Flex direction="column" style={styles.oprItem}>
          <Text size="h5" color="muted" textTransform="uppercase">
            Tổng OPS
          </Text>
          <Text size="h3" color="primary">
            {user.total_oprs}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default HomeUser;
