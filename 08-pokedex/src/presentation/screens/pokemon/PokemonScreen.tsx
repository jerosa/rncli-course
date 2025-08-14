import { StackScreenProps } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';
import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Chip, FAB, Text } from 'react-native-paper';

import { useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPokemonById } from '../../../actions/pokemons';
import { Formatter } from '../../../config/helpers/formatter';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ThemeContext } from '../../context/ThemeContext';
import { RootStackParams } from '../../navigator/StackNavigator';
import { globalStyles } from '../../../config/theme/global-theme';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { }

export const PokemonScreen = ( { navigation, route }: Props ) => {
  const { isDark, theme } = useContext( ThemeContext );
  const { top } = useSafeAreaInsets();
  const { pokemonId } = route.params;

  const pokeballImg = isDark
    ? require( '../../../assets/pokeball-light.png' )
    : require( '../../../assets/pokeball-dark.png' );


  const { isLoading, data: pokemon } = useQuery( {
    queryKey: [ 'pokemon', pokemonId ],
    queryFn: () => getPokemonById( pokemonId ),
    staleTime: 1000 * 60 * 60 // 1 hour
  } );

  if ( isLoading || !pokemon ) {
    return ( <FullScreenLoader /> );
  }

  return (
    <>
      <ScrollView
        style={ [ styles.scrollView, { backgroundColor: pokemon.color } ] }
        bounces={ false }
        showsVerticalScrollIndicator={ false }>

        {/* Pokemon name with back button */ }
        <Appbar.Header style={ { backgroundColor: pokemon.color } }>
          <Appbar.BackAction onPress={ navigation.goBack } color='white' />
          <Appbar.Content color='white' title={
            `${ Formatter.capitalize( pokemon.name ) + ' #' + pokemon.id }`
          } />
        </Appbar.Header>

        {/* Header Container */ }
        <View style={ styles.headerContainer }>
          {/* Pokemon Name */ }
          {/* <Text
          style={ {
            ...styles.pokemonName,
            top: top + 5,
          } }>
          { Formatter.capitalize( pokemon.name ) + '\n' }#{ pokemon.id }
        </Text> */}

          {/* Pokeball */ }
          <Image source={ pokeballImg } style={ styles.pokeball } />

          <FadeInImage uri={ pokemon.avatar } style={ styles.pokemonImage } />
        </View>

        {/* Types */ }
        <View style={ styles.typesContainer }>
          { pokemon.types.map( type => (
            <Chip
              key={ type }
              mode="outlined"
              selectedColor="white"
              style={ [ styles.typesChip, { backgroundColor: pokemon.color } ] } >
              { type }
            </Chip>
          ) ) }
        </View>

        {/* Sprites */ }
        <FlatList
          data={ pokemon.sprites }
          horizontal
          keyExtractor={ item => item }
          showsHorizontalScrollIndicator={ false }
          centerContent
          style={ styles.spritesContainer }
          renderItem={ ( { item } ) => (
            <FadeInImage
              uri={ item }
              style={ styles.spritesImages }
            />
          ) }
        />


        {/* abilities */ }
        <Text style={ styles.subTitle }>Abilities</Text>
        <FlatList
          data={ pokemon.abilities }
          horizontal
          keyExtractor={ item => item }
          showsHorizontalScrollIndicator={ false }
          renderItem={ ( { item } ) => (
            <Chip
              key={ item }
              // mode="outlined"
              selectedColor="white"
              style={ [ styles.typesChip, { backgroundColor: pokemon.color } ] } >
              { Formatter.capitalize( item ) }
            </Chip>
          ) }
        />

        {/* Stats */ }
        <Text style={ styles.subTitle }>Stats</Text>

        <FlatList
          data={ pokemon.stats }
          keyExtractor={ item => item.name }
          horizontal
          showsHorizontalScrollIndicator={ false }
          renderItem={ ( { item } ) => (
            <View style={ styles.statsContainer }>
              <Text style={ { flex: 1, color: 'white' } }>
                { Formatter.capitalize( item.name ) }
              </Text>
              <Text style={ { color: 'white' } }>{ item.value }</Text>
            </View>
          ) }
        />

        {/* Moves */ }
        <Text style={ styles.subTitle }>Moves</Text>
        <FlatList
          data={ pokemon.moves }
          horizontal
          showsHorizontalScrollIndicator={ false }
          centerContent
          renderItem={ ( { item } ) => (
            <View style={ styles.statsContainer }>
              <Text style={ { flex: 1, color: 'white' } }>
                { Formatter.capitalize( item.name ) }
              </Text>
              <Text style={ { color: 'white' } }>lvl { item.level }</Text>
            </View>
          ) }
        />

        {/* Games */ }
        <Text style={ styles.subTitle }>Games</Text>
        <FlatList
          data={ pokemon.games }
          horizontal
          keyExtractor={ item => item }
          showsHorizontalScrollIndicator={ false }
          centerContent
          renderItem={ ( { item } ) => (
            <Chip
              key={ item }
              // mode="outlined"
              selectedColor="white"
              style={ [ styles.typesChip, { backgroundColor: pokemon.color } ] } >
              { Formatter.capitalize( item ) }
            </Chip>
          ) }
        />


        <View style={ styles.bottomView } />
      </ScrollView>
      <FAB
        icon="arrow-right"
        style={ [ globalStyles.fab, { backgroundColor: theme.colors.primary } ] }
        color={ isDark ? 'black' : 'white' }
        onPress={ () => navigation.navigate( 'PokemonScreen', { pokemonId: pokemon.id + 1 } ) }
      />
    </>
  );
};

const styles = StyleSheet.create( {
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  typesContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
  },
  typesChip: {
    marginLeft: 10,
  },
  spritesContainer: {
    marginTop: 20,
    height: 100,
  },
  spritesImages: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
  },
  bottomView: {
    height: 80,
  },
} );
