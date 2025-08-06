import { type RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import { type RootStackParams } from "../../routes/StackNavigator";
import { globalStyles } from "../../../config/theme/theme";
import { useEffect } from "react";

export const ProductScreen = () => {


  const params = useRoute<RouteProp<RootStackParams, 'Product'>>().params;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: params.name
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={globalStyles.container}>
      <Text>Product Screen</Text>

      <Text style={styles.text}>{params.id} - {params.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20
  }
})
