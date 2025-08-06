/* eslint-disable react-native/no-inline-styles */
import { View, Pressable, Text } from "react-native"
import { colors, globalStyles } from "../../config/theme/app-theme"


interface Props {
  label: string,
  color?: string,
  doubleSize?: boolean,
  onPress: () => void;
}

export const CalculatorBotton = ({
  label,
  color = globalStyles.button.backgroundColor,
  doubleSize = false,
  onPress
}: Props) => {
  return (
    <View style={globalStyles.buttonsContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          ...globalStyles.button,

          backgroundColor: color,
          width: (!doubleSize) ? globalStyles.button.width : globalStyles.button.width * 2 + 10,
          opacity: (pressed) ? 0.8 : 1
        })}>
        <Text style={({
          ...globalStyles.buttonText,
          color: (color === colors.lighGray) ? 'black' : 'white'
        })}>{label}</Text>
      </Pressable>
    </View>
  )
}
