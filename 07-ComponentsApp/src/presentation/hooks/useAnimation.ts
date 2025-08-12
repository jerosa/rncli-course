import { useRef } from "react";
import { Animated, Easing } from "react-native";


export default function useAnimation() {
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedTop = useRef(new Animated.Value(0)).current;

  const fadeIn = ({ duration = 300, toValue = 1, callback = () => { } }) => {


    Animated.timing(animatedOpacity, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    }).start(callback);
  }

  const fadeOut = ({ duration = 300, toValue = 0 }) => {
    Animated.timing(animatedOpacity, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true
    }).start();
  }

  const startMovingTopPosition = ({
    initialPos = 0,
    toValue = 0,
    duration = 300,
    easing = Easing.linear,
    callback = () => { }
  }) => {
    animatedTop.setValue(initialPos);
    Animated.timing(animatedTop, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
      easing: easing,
    }).start(callback);
  }

  // () => animatedTop.resetAnimation()

  return {
    // props
    animatedOpacity,
    animatedTop,

    // methods
    fadeIn,
    fadeOut,
    startMovingTopPosition
  }
}
