import { BottomTabNavigator } from "./presentation/navigators/BottomTabNavigator"
import { NavigationContainer } from "@react-navigation/native"

export const Main = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  )
}
