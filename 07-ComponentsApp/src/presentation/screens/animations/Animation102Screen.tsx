import { StyleSheet, Animated, PanResponder } from 'react-native'
import { useRef } from 'react';
import { CustomView } from '../../components/ui/CustomView';


export const Animation102Screen = () => {

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pan.x,
        dy: pan.y
      }
    ], {
      useNativeDriver: false
    }),
    onPanResponderRelease: () => {
      Animated.spring(
        pan,
        {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }
      ).start();
    }
  });

  return (
    <CustomView style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.box,
          pan.getLayout()
        ]} />

    </CustomView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#61dafb',
    width: 80,
    height: 80,
    borderRadius: 4,
  },
});
