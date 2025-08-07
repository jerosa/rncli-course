import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

import { globalStyles } from "../../../config/app-theme";
import { useCounterStore } from "../../store/counter-store";

export const SettingsScreen = () => {
  const count = useCounterStore(state => state.count);
  const incrementBy = useCounterStore(state => state.incrementBy);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: `Settings: ${count}`
    })
  }, [count])


  return (
    <View style={globalStyles.container}>

      <Text style={globalStyles.title}>Counter: {count}</Text>

      <View style={{ alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
        <Pressable
          onPress={() => (incrementBy(1))}
          style={globalStyles.primaryButton}>
          <Text style={globalStyles.title}>+1</Text>
        </Pressable>

        <Pressable
          onPress={() => (incrementBy(-1))}
          style={globalStyles.primaryButton}>
          <Text style={globalStyles.title}>-1</Text>
        </Pressable>

      </View>

    </View>
  )
}
