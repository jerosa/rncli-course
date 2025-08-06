import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
// import { PrimaryButton } from "../components";


export const CounterScreen = () => {

  const [count, setCount] = useState<number>(10);

  const increaseCounter = () => {
    setCount(count + 1)
  }
  const resetCounter = () => {
    setCount(0)
  }

  // increaseCounter / reset(setCount(0))

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{count}</Text>
      {/* <PrimaryButton label='Increment' onPress={increaseCounter} onLongPress={resetCounter} /> */}
      <Button onPress={increaseCounter} onLongPress={resetCounter} mode='contained' >
        Increment
      </Button>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 80,
    color: 'black',
    fontWeight: '300'
  },
})
