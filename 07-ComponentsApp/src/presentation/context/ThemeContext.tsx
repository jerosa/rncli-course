import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { darkColors, lightColors, ThemeColors } from "../../config/theme/global.theme";
import { useColorScheme } from "react-native";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";


type ThemeColor = 'light' | 'dark';

interface ThemeContextProps {
  currentTheme: ThemeColor;
  colors: ThemeColors;
  isDark: boolean;

  setTheme: (theme: ThemeColor) => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);


// provider, can also be defined by zustand library
export const ThemeProvider = ({ children }: PropsWithChildren) => {

  const colorScheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>('light');

  const isDark = currentTheme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  useEffect(() => {
    if (colorScheme === 'dark') {
      setCurrentTheme('dark');
    } else {
      setCurrentTheme('light');
    }
  }, [colorScheme])

  // modify theme if app suspended
  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', _ => {
  //     const appearenceColorScheme = Appearance.getColorScheme();
  //     setCurrentTheme(appearenceColorScheme === 'dark' ? 'dark' : 'light');
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);


  const setTheme = (theme: ThemeColor) => {
    setCurrentTheme(theme);
  }

  return (

    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>

      <ThemeContext.Provider
        value={{
          currentTheme: currentTheme,
          colors: colors,
          isDark: isDark,
          setTheme: setTheme
        }}
      >
        {children}
      </ThemeContext.Provider>
    </NavigationContainer>
  )
}
