import React, { useEffect, useRef } from 'react';

import { ToastState } from '@/types';
import { Animated, Text } from 'react-native';

import { styles } from '../styles';

interface ToastProps {
  toast: ToastState;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  const translateX = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    if (toast.show) {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: 400,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [toast.show, translateX]);

  if (!toast.show && !toast.message) {
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
