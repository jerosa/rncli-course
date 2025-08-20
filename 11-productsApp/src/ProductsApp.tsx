import React from 'react';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useColorScheme } from 'react-native';

import { StackNavigator } from './presentation/navigation/StackNavigator';
import { AuthProvider } from './presentation/providers/AuthProvider';


export const ProductsApp = () => {

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;

  return (
    <>
      <IconRegistry icons={ EvaIconsPack } />
      <ApplicationProvider { ...eva } theme={ theme }>
        <NavigationContainer >
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
