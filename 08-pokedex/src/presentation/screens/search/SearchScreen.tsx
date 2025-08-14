import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator, Appbar, TextInput } from 'react-native-paper';

import { getPokemonNamesWithId, getPokemonsByIds } from '../../../actions/pokemons';
import { globalStyles } from '../../../config/theme/global-theme';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';


export const SearchScreen = () => {
  const navigation = useNavigation();
  const [ term, setTerm ] = useState( '' );

  const debounceValue = useDebouncedValue( term );

  const { isLoading, data: pokemonNamesList } = useQuery( {
    queryKey: [ 'pokemons', 'all' ],
    queryFn: () => getPokemonNamesWithId(),
  } );

  // TODO: add debounce
  const pokemonNameIdList = useMemo( () => {
    if ( !isNaN( Number( debounceValue ) ) ) {
      const pokemons = pokemonNamesList?.find( pokemon => pokemon.id === Number( debounceValue ) );
      return pokemons ? [ pokemons ] : [];
    }
    if ( debounceValue.length < 3 ) return [];

    return pokemonNamesList?.filter( pokemon => pokemon.name.toLowerCase().includes( debounceValue.toLowerCase() ) ) ?? [];
  }, [ debounceValue, pokemonNamesList ] );

  const { isLoading: isLoadingPokemons, data: pokemons } = useQuery( {
    queryKey: [ 'pokemons', 'by', pokemonNameIdList ],
    queryFn: () => getPokemonsByIds( pokemonNameIdList.map( pokemon => pokemon.id ) ),
    staleTime: 1000 * 60 * 5, // 5 minutes
  } );

  return (
    <View style={ [ globalStyles.globalMargin, ] }>

      <Appbar.Header>
        <Appbar.BackAction style={ { left: -20 } } onPress={ navigation.goBack } />
        <Appbar.Content title={ 'Search' } />
      </Appbar.Header>

      <TextInput
        placeholder="Search Pokémon"
        mode="flat"
        autoFocus
        autoCorrect={ false }
        onChangeText={ setTerm }
        value={ term }
      />

      {
        isLoadingPokemons && <ActivityIndicator style={ { paddingTop: 20 } } />
      }

      <KeyboardAwareFlatList
        data={ pokemons }
        keyExtractor={ ( pokemon, index ) => `${ pokemon.id }-${ index }` }
        numColumns={ 2 }
        style={ { paddingTop: 20 } }
        renderItem={ ( { item } ) => (
          <PokemonCard pokemon={ item } />
        ) }
        showsVerticalScrollIndicator={ false }
        ListFooterComponent={
          <View style={ { height: 200 } } />
        }
      />
    </View>
  );
};
