import { StyleSheet, View } from "react-native"


export const FlexScreen = () => {
  return (
    <View style={styles.container}>

      <View style={styles.box1} />
      <View style={styles.box2} />
      <View style={styles.box3} />

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  box1: {
    backgroundColor: '#5856D6',
    flex: 1, // 1 + 2 + 3 = 6 -> 1/6 de la pantalla
  },
  box2: {
    backgroundColor: '#4543aaff',
    flex: 2, // 2/6 = 1/3
  },
  box3: {
    backgroundColor: '#26255fff',
    flex: 3, // 3/6 = 1/2
  },
});
