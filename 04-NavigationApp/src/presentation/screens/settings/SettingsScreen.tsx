import { Text, View } from "react-native"
import { globalStyles } from "../../../config/theme/theme"
import { PrimaryBotton } from "../../components/shared/PrimaryBotton"
import { StackActions, useNavigation } from "@react-navigation/native"

export const SettingsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={globalStyles.container}>
      <Text>SettingsScreen</Text>

      <PrimaryBotton
        label="Back"
        onPress={() => navigation.goBack()}
      />

      <PrimaryBotton
        label="Home"
        onPress={() => navigation.dispatch(StackActions.popToTop)}
      />
    </View>
  )
}
