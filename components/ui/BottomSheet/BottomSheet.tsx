import React, { useEffect } from 'react';

import { Dimensions, Pressable, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  SlideOutDown,
  WithTimingConfig,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { AppColors, Radius, ThemeColor } from '@/constants/theme';

import { useThemedColors } from '@/hooks/use-theme';

import { Portal } from '../Portal';

export type BottomSheetProps = {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  children: React.ReactNode;
  fullSize?: boolean;
  stylesFor?: {
    content?: ViewStyle;
    pullIcon?: ViewStyle;
  };
};

type StyleProps = { colors: ThemeColor; fullSize: boolean };

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const velocityThreshold = 800;

const distanceThreshold = 100;

const timingConfig: WithTimingConfig = {
  duration: 300,
};

const BottomSheet = ({ visible, fullSize = false, stylesFor = {}, children, onVisibleChange }: BottomSheetProps) => {
  const translateY = useSharedValue<number>(SCREEN_HEIGHT);
  const styles = getStyles({ colors: useThemedColors(), fullSize });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = Math.max(0, event.translationY);
    })
    .onEnd((event) => {
      const shouldDismiss = event.translationY > distanceThreshold || event.velocityY > velocityThreshold;
      if (shouldDismiss) {
        translateY.value = withTiming(SCREEN_HEIGHT, timingConfig, () => {
          scheduleOnRN(onVisibleChange, false);
        });
      } else {
        scheduleOnRN(onVisibleChange, true);
        translateY.value = withTiming(0, timingConfig);
      }
    });

  const handleEnd = () => {
    translateY.value = withTiming(SCREEN_HEIGHT, timingConfig, () => {
      scheduleOnRN(onVisibleChange, false);
    });
  };

  useEffect(() => {
    if (visible) {
      scheduleOnRN(onVisibleChange, true);
      translateY.value = withTiming(0, timingConfig);
    } else {
      handleEnd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) {
    return;
  }

  return (
    <Portal>
      <View style={styles.container}>
        {/* Backdrop */}
        <Pressable onPress={handleEnd} style={styles.backdrop} />

        {/* Modal */}
        <Animated.View exiting={SlideOutDown} style={[styles.modal, animatedStyle]}>
          <GestureDetector gesture={panGesture}>
            <View style={styles.pull}>
              <View style={[styles.pullIcon, stylesFor.pullIcon]}></View>
            </View>
          </GestureDetector>
          <View style={[styles.content, stylesFor.content]}>
            <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
          </View>
        </Animated.View>
      </View>
    </Portal>
  );
};

const getStyles = ({ colors, fullSize }: StyleProps) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: SCREEN_HEIGHT,
    },
    backdrop: {
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      overflow: 'hidden',
      backgroundColor: colors.card,
      ...(fullSize && { top: 0 }),
    },
    pull: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 16,
      paddingBottom: 24,
    },
    pullIcon: {
      width: 64,
      height: 4,
      backgroundColor: AppColors.primary,
      borderRadius: Radius.full,
    },
    content: {
      flex: 1,
      backgroundColor: colors.card,
      ...(!fullSize && { maxHeight: 512 }),
      minHeight: 384,
      paddingBottom: 16,
    },
  });

export default BottomSheet;
