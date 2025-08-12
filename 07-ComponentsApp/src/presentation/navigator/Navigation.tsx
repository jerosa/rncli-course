import { createStackNavigator } from '@react-navigation/stack';
import { ChangeThemeScreen } from '../screens/theme/ChangeThemeScreen';
import { InfiniteScrollScreen } from '../components/ui/InfiniteScrollScreen';
import { SlidesScreen } from '../components/ui/SlidesScreen';
import { AlertScreen } from '../screens/alerts/AlertScreen';
import { Animation101Screen } from '../screens/animations/Animation101Screen';
import { Animation102Screen } from '../screens/animations/Animation102Screen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { TextInputScreen } from '../screens/inputs/TextInputScreen';
import { SwitchScreen } from '../screens/switches/SwitchScreen';
import { CustomSectionListScreen } from '../screens/ui/CustomSectionListScreen';
import { ModalScreen } from '../screens/ui/ModalScreen';
import { PullToRefreshScreen } from '../screens/ui/PullToRefreshScreen';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

const Stack = createStackNavigator();

export const Navigation = () => {

  const { colors } = useContext(ThemeContext);

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: colors.background
      }
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Animation101Screen" component={Animation101Screen} />
      <Stack.Screen name="Animation102Screen" component={Animation102Screen} />

      <Stack.Screen name="SwitchScreen" component={SwitchScreen} />
      <Stack.Screen name="AlertScreen" component={AlertScreen} />
      <Stack.Screen name="TextInputScreen" component={TextInputScreen} />

      <Stack.Screen name="PullToRefreshScreen" component={PullToRefreshScreen} />
      <Stack.Screen name="CustomSectionListScreen" component={CustomSectionListScreen} />
      <Stack.Screen name="ModalScreen" component={ModalScreen} />
      <Stack.Screen name="InfiniteScrollScreen" component={InfiniteScrollScreen} />
      <Stack.Screen name="SlidesScreen" component={SlidesScreen} />
      <Stack.Screen name="ChangeThemeScreen" component={ChangeThemeScreen} />
    </Stack.Navigator>
  );
}
