import { StyleColorsProps } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { AppColors, Radius } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { Text } from '../Text';

type PaginationAlign = 'center' | 'left' | 'right';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
  showControls?: boolean;
  align?: PaginationAlign;
  onPageChange?: (page: number) => void;
  style?: ViewStyle;
};

const DOT_VALUE = '...';

const getPaginationRange = (currentPage: number, totalPages: number, siblingCount: number = 1) => {
  const totalPageNumbers = siblingCount * 2 + 5; // Includes first, last, current, 2 dots

  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - 1);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const range = [];

  range.push(1); // Always show first page

  if (shouldShowLeftDots) {
    range.push(DOT_VALUE);
  }

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    range.push(i);
  }

  if (shouldShowRightDots) {
    range.push(DOT_VALUE);
  }

  range.push(totalPages); // Always show last page

  return range;
};

const Pagination = ({
  currentPage,
  totalPages,
  siblingCount = 1,
  showControls = true,
  align = 'center',
  style,
  onPageChange,
}: PaginationProps) => {
  const paginationWithSiblings = getPaginationRange(currentPage, totalPages, siblingCount);
  const styles = getStyles({ colors: useThemedColors(), align });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        {showControls && (
          <Pressable
            disabled={currentPage <= 1}
            onPress={() => onPageChange?.(currentPage - 1)}
            style={[styles.item, currentPage <= 1 && styles.disabled]}
          >
            <MaterialIcons name="chevron-left" />
          </Pressable>
        )}

        {paginationWithSiblings.map((page, index) => {
          const isSibling = page === DOT_VALUE;
          const isActive = !isSibling && page === currentPage;

          if (isSibling) {
            return (
              <View key={index} style={styles.item}>
                <Text>{DOT_VALUE}</Text>
              </View>
            );
          }

          return (
            <Pressable
              key={index}
              onPress={() => onPageChange?.(Number(page))}
              style={[styles.item, isActive && styles.active]}
            >
              <Text style={isActive && styles.textActive}>{page}</Text>
            </Pressable>
          );
        })}

        {showControls && (
          <Pressable
            disabled={currentPage >= totalPages}
            onPress={() => onPageChange?.(currentPage + 1)}
            style={[styles.item, currentPage >= totalPages && styles.disabled]}
          >
            <MaterialIcons name="chevron-right" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const getStyles = ({ colors, align }: StyleColorsProps & { align: PaginationAlign }) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    item: {
      width: 36,
      height: 36,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: Radius.sm,
    },
    active: {
      backgroundColor: AppColors.primary,
      borderColor: AppColors.primary,
    },
    textActive: {
      color: AppColors.white,
    },
    disabled: {
      opacity: 0.5,
    },
  });

export default Pagination;
