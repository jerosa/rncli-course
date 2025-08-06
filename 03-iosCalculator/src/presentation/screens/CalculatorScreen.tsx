import { Text, View } from "react-native"
import { colors, globalStyles } from "../../config/theme/app-theme"
import { CalculatorBotton } from "../components/CalculatorBotton"
import { useCalculator } from "../hooks/useCalculator"




export const CalculatorScreen = () => {

  const {
    number, prevNumber, formula,
    buildNumber, clean, deleteOperation, toggleSign,
    divideOperation, multiplyOperation, substractOperation, addOperation, calculateResult
  } = useCalculator();
  return (
    <View style={globalStyles.calculatorContainer}>

      <View style={globalStyles.numberContainer}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={globalStyles.mainResult}>{formula}</Text>
        <Text
          adjustsFontSizeToFit numberOfLines={1} style={globalStyles.subResult}>
          {(prevNumber === '0') ? ' ' : prevNumber}
        </Text>
      </View>

      <View style={globalStyles.buttonsRow}>
        <CalculatorBotton onPress={clean} label='C' color={colors.lighGray} />
        <CalculatorBotton onPress={toggleSign} label='+/-' color={colors.lighGray} />
        <CalculatorBotton onPress={deleteOperation} label='del' color={colors.lighGray} />
        <CalculatorBotton onPress={divideOperation} label='÷' color={colors.orange} />
      </View>

      <View style={globalStyles.buttonsRow}>
        <CalculatorBotton onPress={() => buildNumber('7')} label='7' />
        <CalculatorBotton onPress={() => buildNumber('8')} label='8' />
        <CalculatorBotton onPress={() => buildNumber('9')} label='9' />
        <CalculatorBotton onPress={multiplyOperation} label='x' color={colors.orange} />
      </View>

      <View style={globalStyles.buttonsRow}>
        <CalculatorBotton onPress={() => buildNumber('4')} label='4' />
        <CalculatorBotton onPress={() => buildNumber('5')} label='5' />
        <CalculatorBotton onPress={() => buildNumber('6')} label='6' />
        <CalculatorBotton onPress={substractOperation} label='-' color={colors.orange} />
      </View>

      <View style={globalStyles.buttonsRow}>
        <CalculatorBotton onPress={() => buildNumber('1')} label='1' />
        <CalculatorBotton onPress={() => buildNumber('2')} label='2' />
        <CalculatorBotton onPress={() => buildNumber('3')} label='3' />
        <CalculatorBotton onPress={addOperation} label='+' color={colors.orange} />
      </View>

      <View style={globalStyles.buttonsRow}>
        <CalculatorBotton onPress={() => buildNumber('0')} label='0' doubleSize />
        <CalculatorBotton onPress={() => buildNumber('.')} label='.' />
        <CalculatorBotton onPress={calculateResult} label='=' color={colors.orange} />
      </View>

    </View>
  )
}
