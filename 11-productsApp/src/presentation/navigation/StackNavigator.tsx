import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { ProductScreen } from '../screens/product/ProductScreen';

export type RootStackParams = {
  LoadingScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  HomeScreen: undefined;
  ProductScreen: { productId: string; };
};

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ( { current } ) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='LoadingScreen'
      screenOptions={ {
        headerShown: false,
        // cardStyleInterpolator: fadeAnimation,
      } }
    >
      <Stack.Screen name="LoadingScreen" component={ LoadingScreen } options={ { cardStyleInterpolator: fadeAnimation } } />
      <Stack.Screen name="LoginScreen" component={ LoginScreen } options={ { cardStyleInterpolator: fadeAnimation } } />
      <Stack.Screen name="SignUpScreen" component={ SignUpScreen } options={ { cardStyleInterpolator: fadeAnimation } } />
      <Stack.Screen name="HomeScreen" component={ HomeScreen } options={ { cardStyleInterpolator: fadeAnimation } } />
      <Stack.Screen name="ProductScreen" component={ ProductScreen } />
    </Stack.Navigator>
  );
};
