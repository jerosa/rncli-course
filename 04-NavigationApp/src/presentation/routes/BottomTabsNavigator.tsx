import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab1Screen } from '../screens/tabs/Tab1Screen';
import { globalColors } from '../../config/theme/theme';
import { TopTabsNavigator } from './TopTabsNavigator';
import { StackNavigator } from './StackNavigator';
import Ionicons from '@react-native-vector-icons/ionicons';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: globalColors.primary,
        sceneStyle: {
          backgroundColor: globalColors.background
        },
        // headerShown: true,
        tabBarStyle: {
          marginBottom: 5
        },
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent'
        },
        tabBarIconStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Tab 1"
        options={{ title: 'Tab1', tabBarIcon: ({ color }) => (<Ionicons name="accessibility-outline" color={color} />) }}
        component={Tab1Screen} />
      <Tab.Screen
        name="Tab 2"
        options={{ title: 'TopTab', tabBarIcon: ({ color }) => (<Ionicons name="airplane-outline" color={color} />) }}
        component={TopTabsNavigator} />
      <Tab.Screen
        name="Tab 3"
        options={{ title: 'Home', tabBarIcon: ({ color }) => (<Ionicons name="bar-chart-outline" color={color} />) }}
        component={StackNavigator} />
    </Tab.Navigator>
  );
}
