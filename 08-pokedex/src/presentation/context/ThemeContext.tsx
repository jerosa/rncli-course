import { createContext, PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { adaptNavigationTheme, PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const { LightTheme, DarkTheme } = adaptNavigationTheme( {
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
} );

export const ThemeContext = createContext( {
  isDark: false,
  theme: LightTheme
} );


export const ThemeContextProvider = ( { children }: PropsWithChildren ) => {

  const colorScheme = useColorScheme();

  const isDarkTheme = colorScheme === 'dark';

  // Paper theme (MD3)
  const paperTheme = isDarkTheme ? MD3DarkTheme : MD3LightTheme;
  // Navigation theme
  const navigationTheme = isDarkTheme ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={ paperTheme }>
      <NavigationContainer theme={ navigationTheme }>
        <ThemeContext.Provider value={ {
          isDark: isDarkTheme,
          theme: navigationTheme
        } }>
          { children }
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
