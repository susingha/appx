import {Animated} from 'react-native';

/*
 * this defines the terms of our scaling animation.
 * ref: https://iwritecodesometimes.net/2019/04/17/react-native-scale-on-press-animations-made-easy/
 */

const SCALE = {
  getScaleTransformationStyle(
    animated: Animated.Value,
    startSize: number = 1,
    endSize: number = 0.95,
  ) {
    const interpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [startSize, endSize],
    });
    return {
      transform: [{scale: interpolation}],
    };
  },
  // This defines animation behavior we expext onPressIn
  pressInAnimation(animated: Animated.Value, duration: number = 150) {
    animated.setValue(0);
    Animated.timing(animated, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  },
  // This defines animatiom behavior we expect onPressOut
  pressOutAnimation(animated: Animated.Value, duration: number = 150) {
    animated.setValue(1);
    Animated.timing(animated, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  },
};

export default SCALE;
