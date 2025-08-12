/* eslint-disable react-native/no-inline-styles */
import { View, StyleProp, ViewStyle } from 'react-native'
import { PropsWithChildren, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface Prosp extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

export const Card = ({ style, children }: Prosp) => {

  const { colors } = useContext(ThemeContext);

  return (
    <View style={[
      {
        backgroundColor: colors.cardBackground,
        borderRadius: 10,
        padding: 10
      },
      style
    ]}>
      {children}
    </View>
  )
}
