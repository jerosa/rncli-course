import { Button } from "@ui-kitten/components";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { CustomIcon } from "./CustomIcon";


interface Props {
  iconName: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}


export const FAB = ( { iconName, style, onPress }: Props ) => {
  return (
    <Button
      style={ [ styles.button, style ] }
      accessoryLeft={ <CustomIcon name={ iconName } white /> }
      onPress={ onPress }
    />
  );
};

const styles = StyleSheet.create( {
  button: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
    borderRadius: 13
  }
} );
