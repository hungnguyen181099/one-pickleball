import React, { useEffect, useRef } from 'react';

import { ToastState } from '@/types';
import { Animated, Text } from 'react-native';

import { styles } from '../styles';

interface ToastProps {
  toast: ToastState;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  const translateX = useRef(new Animated.Value(400)).current;
  const wasShownRef = useRef(false);

  useEffect(() => {
    if (toast.show) {
      wasShownRef.current = true;
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();
    } else if (wasShownRef.current) {
      // Only animate out if we were showing before
      wasShownRef.current = false;
      Animated.timing(translateX, {
        toValue: 400,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [toast.show, translateX]);

  // Only render when show is true (not based on message)
  if (!toast.show) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          transform: [{ translateX }],
        },
      ]}
    >
      <Text style={styles.toastIcon}>{toast.icon}</Text>
      <Text style={styles.toastText}>{toast.message}</Text>
    </Animated.View>
  );
};
