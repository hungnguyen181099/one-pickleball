import React, { useState } from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const TestScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const translateY = useSharedValue(0);
  const swipeThreshold = 100; // Minimum distance to be considered a swipe

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Limit movement to only downwards (positive Y values)
      if (event.translationY >= 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > swipeThreshold) {
        // Run a function on the JavaScript thread when swipe down is detected
        setModalVisible(false);
      }
      // Reset position after gesture ends
      translateY.value = 0;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>

      <Animated.View style={[styles.container, animatedStyle]}>
        <GestureDetector gesture={panGesture}>
          <Text style={styles.pull}>Kéo xuống</Text>
        </GestureDetector>
        <Text>Body</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'red',
  },
  pull: {
    backgroundColor: 'green',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TestScreen;
