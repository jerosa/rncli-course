import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useWindowDimensions, View } from 'react-native';

import { globalColors } from '../../config/theme/theme';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { StackNavigator } from './StackNavigator';
import { BottomTabNavigator } from './BottomTabsNavigator';
import Ionicons from '@react-native-vector-icons/ionicons';

const Drawer = createDrawerNavigator();

export const SideMenuNavigator = () => {

  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator

      drawerContent={(props) => <CustomDrawerContent {...props} />}

      screenOptions={{
        headerShown: false,
        drawerType: (dimensions.width >= 758) ? 'permanent' : 'slide',

        drawerActiveBackgroundColor: globalColors.primary,
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: globalColors.primary,
        drawerItemStyle: {
          borderRadius: 100,
          paddingHorizontal: 20
        }
      }}
    >
      {/* <Drawer.Screen name="StackNavigator" component={StackNavigator} /> */}

      <Drawer.Screen
        options={{ drawerIcon: ({ color }) => (<Ionicons name="bonfire-outline" color={color} />) }}
        name="Tabs"
        component={BottomTabNavigator} />
      <Drawer.Screen
        options={{ drawerIcon: ({ color }) => (<Ionicons name="person-circle-outline" color={color} />) }}
        name="Profile"
        component={ProfileScreen} />
    </Drawer.Navigator>
  );
}


const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView>
      <View style={{
        height: 200,
        backgroundColor: globalColors.primary,
        margin: 30,
        borderRadius: 50
      }} />

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}
