import { Dimensions, StyleSheet } from "react-native";

export const colors = {
  darkGray: '#2D2D2D',
  lighGray: '#9B9B9B',
  orange: '#FF9427',

  textPrimary: 'white',
  textSecondary: '#666666',
  background: '#000000'
}



const width = Dimensions.get("window").width;
console.log(width);

export const globalStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background
  },

  calculatorContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end'
  },
  numberContainer: {
    paddingHorizontal: 30,
    paddingBottom: 20
  },
  buttonsContainer: {
    // flexDirection: 'row',
  },


  mainResult: {
    color: colors.textPrimary,
    fontSize: 70,
    fontWeight: 400,
    textAlign: 'right',
    marginBottom: 10,
  },

  subResult: {
    color: colors.textSecondary,
    fontSize: 40,
    fontWeight: 300,
    textAlign: 'right'
  },


  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 18,
    paddingHorizontal: 10,
  },
  button: {
    height: width > 600 ? 80 : 60,
    width: width > 600 ? 80 : 60,
    backgroundColor: colors.darkGray,
    borderRadius: 100,
    justifyContent: 'center',
    marginHorizontal: 5
  },
  buttonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 30,
    color: colors.textPrimary,
    fontWeight: 300
  }
})
