import { DrawerActions, type NavigationProp, useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";

import { globalStyles } from "../../../config/theme/theme";
import { PrimaryBotton } from "../../components/shared/PrimaryBotton";
import { type RootStackParams } from "../../routes/StackNavigator";
import { useEffect } from "react";



export const HomeScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const menu = () => {
    return (
      <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
        <Text>Menu</Text>
      </Pressable>
    )
  }

  // crea el menu custom
  useEffect(() => {
    navigation.setOptions({
      headerLeft: menu
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={globalStyles.container}>
      <PrimaryBotton
        onPress={() => navigation.navigate('Products')}
        label="Products"
      />

      <PrimaryBotton
        onPress={() => navigation.navigate('Settings')}
        label="Settings"
      />
    </View>
  )
}
