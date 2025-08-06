import { useState } from "react";
import { Text, View } from "react-native";
import { globalStyles } from "../theme/global.styles";
import { FAB } from "react-native-paper";


// import Icon from '@react-native-vector-icons/ionicons';

export const CounterM3Screen = () => {

  const [count, setCount] = useState<number>(10);

  const increaseCounter = () => {
    setCount(count + 1)
  }
  const resetCounter = () => {
    setCount(0)
  }

  return (
    <View style={globalStyles.centerContainer}>
      <Text style={globalStyles.title}>{count}</Text>

      {/* <Icon name='accessibility-outline' size={25} /> */}

      <FAB
        icon='add-outline'
        // label="Increment"
        style={globalStyles.fabBottom}
        onPress={increaseCounter}
        onLongPress={resetCounter}
      />
    </View>
  )
}
