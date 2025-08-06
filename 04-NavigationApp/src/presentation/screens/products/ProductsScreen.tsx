import { type NavigationProp, useNavigation } from "@react-navigation/native"
import { FlatList, StyleSheet, Text, View } from "react-native"

import { globalStyles } from "../../../config/theme/theme"
import { PrimaryBotton } from "../../components/shared/PrimaryBotton"
import { type RootStackParams } from "../../routes/StackNavigator"


const products = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' },
  { id: 4, name: 'Product 4' },
  { id: 5, name: 'Product 5' },
  { id: 6, name: 'Product 6' },
]

const styles = StyleSheet.create({
  text: {
    marginBottom: 10,
    fontSize: 30
  }
})


export const ProductsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <View style={globalStyles.container}>
      <Text style={styles.text}>Products</Text>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <PrimaryBotton
            onPress={() => navigation.navigate('Product', item)}
            label={item.name}
          />
        )}
      />

      <Text style={styles.text}>Settings</Text>
      <PrimaryBotton
        onPress={() => navigation.navigate('Settings')}
        label="Settings"
      />
    </View>
  )
}
