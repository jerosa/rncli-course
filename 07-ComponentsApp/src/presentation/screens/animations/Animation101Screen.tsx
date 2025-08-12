/* eslint-disable react-native/no-inline-styles */
import { useContext } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import useAnimation from '../../hooks/useAnimation';
import { CustomView } from '../../components/ui/CustomView';
import { Button } from '../../components/ui/Button';


export const Animation101Screen = () => {

  const { colors } = useContext(ThemeContext);
  const {
    fadeIn,
    fadeOut,
    startMovingTopPosition,
    animatedOpacity,
    animatedTop
  } = useAnimation();

  return (
    <CustomView style={styles.container}>
      <Animated.View style={[
        styles.purpleBox,
        {
          backgroundColor: colors.primary,
          opacity: animatedOpacity,
          transform: [{
            translateY: animatedTop
          }]
        }
      ]} />

      <Button
        onPress={() => {
          fadeIn({});
          startMovingTopPosition({ initialPos: -300, easing: Easing.bounce, duration: 700 })
        }
        }
        style={{ marginTop: 10 }}
        text='FadeIn'
      />

      <Button
        onPress={() => fadeOut({})}
        style={{ marginTop: 10 }}
        text='FadeOut'
      />
    </CustomView>
  )
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  purpleBox: {
    width: 150,
    height: 150,
  }
});
