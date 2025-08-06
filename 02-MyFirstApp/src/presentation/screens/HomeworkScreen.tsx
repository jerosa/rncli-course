import { StyleSheet, View } from "react-native"


export const HomeworkScreen = () => {
  return (
    <View style={styles.container}>

      <View style={[styles.box, styles.purpleBox]} />
      <View style={[styles.box, styles.orangeBox]} />
      <View style={[styles.box, styles.blueBox]} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28425B',
    // TODO: tarea
    justifyContent: 'center', // ejercicio 2, 3, 7, 8, 9, 10
    alignItems: 'center', // ejercicio 7, 8, 9, 10
    // flexDirection: 'row-reverse', // ejercicio 4
    // justifyContent: 'space-between', // ejercicio 4, 5
    flexDirection: 'row', // ejercicio 5, 10
  },
  box: {
    width: 100, // comentarlo ejercicio 6
    height: 100, // comentarlo en ejercicio 5
    borderWidth: 10,
    borderColor: 'white'
  },
  purpleBox: {
    backgroundColor: '#5856D6',
    // alignSelf: 'flex-end' // ejercicio 3
    // flex: 2 // ejercicio 6
    // top: 100 // ejercicio 9
  },
  orangeBox: {
    backgroundColor: '#F0A23B',
    // left: 100 // ejercicio 8, 9
    // flex: 1 ejercicio 1
    // alignSelf: 'center' // ejercicio 4
    // flex: 2 // ejercicio 6
    top: 50 // ejercicio 10
  },
  blueBox: {
    backgroundColor: '#28C4D9',
    // alignSelf: 'center', // ejercicio 2
    // width: '100%' // ejercicio 2
    // alignSelf: 'center' // ejercicio 3
    // alignSelf: 'flex-end' // ejercicio 4
    // flex: 4 // ejercicio 6
  }
})
