import { DrawerActions, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { PrimaryBotton } from "../../components/shared/PrimaryBotton";

export const ProfileScreen = () => {

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: top
    },
    text: {
      marginBottom: 10
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ProfileScreen</Text>

      <PrimaryBotton
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
        label="Menu"
      />
    </View>
  )
}
