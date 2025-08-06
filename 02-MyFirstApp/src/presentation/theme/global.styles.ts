import { Platform, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 80,
    fontWeight: '300',
    color: 'black'
  },
  fabBottom: {
    position: 'absolute',
    right: 0,
    bottom: Platform.OS === 'android' ? 15 : 0,
    margin: 16
  }
})
