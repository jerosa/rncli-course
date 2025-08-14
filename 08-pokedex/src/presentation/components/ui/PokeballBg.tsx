import { useContext } from 'react';
import { StyleProp, Image, StyleSheet, ImageStyle } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
  style?: StyleProp<ImageStyle>;
}

export const PokeballBg = ( { style }: Props ) => {

  const { isDark } = useContext( ThemeContext );
  const pokeballImg = isDark
    ? require( '../../../assets/pokeball-light.png' )
    : require( '../../../assets/pokeball-dark.png' );


  return (
    <Image
      source={ pokeballImg }
      style={ [ styles.image, style ] }
    />
  );
};

const styles = StyleSheet.create( {
  image: {
    width: 300,
    height: 300,
    opacity: 0.3,
  }
} );
