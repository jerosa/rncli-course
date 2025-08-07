import Ionicons from "@react-native-vector-icons/ionicons";
import { DrawerActions, useNavigation } from "@react-navigation/native"
import { useEffect } from "react";
import { Pressable } from "react-native"
import { globalColors } from "../../../config/theme/theme";


export const HamburguerMenu = () => {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          style={{ marginLeft: 5 }}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
          <Ionicons name='menu-outline' color={globalColors.primary} />
        </Pressable>
      )
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (<></>)
}
