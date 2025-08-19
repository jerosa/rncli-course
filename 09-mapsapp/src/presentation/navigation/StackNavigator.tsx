import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { MapsScreen } from '../screens/maps/MapsScreen';
import { PermissionsScreen } from '../screens/permissions/PermissionsScreen';

export type RootStackParamList = {
  LoadingScreen: undefined;
  PermissionsScreen: undefined;
  MapsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='LoadingScreen'
      // initialRouteName='PermissionsScreen'
      screenOptions={ {
        headerShown: false,
        cardStyle: { backgroundColor: 'white' }
      } }
    >
      <Stack.Screen name="LoadingScreen" component={ LoadingScreen } />
      <Stack.Screen name="PermissionsScreen" component={ PermissionsScreen } />
      <Stack.Screen name="MapsScreen" component={ MapsScreen } />
    </Stack.Navigator>
  );
};
