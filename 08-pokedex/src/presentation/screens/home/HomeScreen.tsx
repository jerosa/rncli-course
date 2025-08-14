import { StackScreenProps } from '@react-navigation/stack';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList, StyleSheet, View } from 'react-native';
import { FAB, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getPokemons } from '../../../actions/pokemons/get-pokemons';
import { globalStyles } from '../../../config/theme/global-theme';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { RootStackParams } from '../../navigator/StackNavigator';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';

const ListHeaderComponent = () => (
  <Text variant='displayMedium'>Pokédex</Text>
);

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> { }

export const HomeScreen = ( { navigation }: Props ) => {

  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const theme = useTheme();

  // Traditional way http query
  // const { isLoading, data: pokemons = [] } = useQuery( {
  //   queryKey: [ 'pokemons' ],
  //   queryFn: () => getPokemons( 0 ),
  //   staleTime: 1000 * 60 * 60, // 60 minutes
  // } );

  const { data, fetchNextPage, isFetching } = useInfiniteQuery( {
    queryKey: [ "pokemons", "infinite" ],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60, // 60 minutes
    queryFn: async ( params ) => {
      const pokemons = await getPokemons( params.pageParam );
      // Cache each pokemon individually
      pokemons.forEach( pokemon => {
        queryClient.setQueryData( [ 'pokemon', pokemon.id ], pokemon );
      } );
      return pokemons;
    },
    getNextPageParam: ( lastPage, allPages ) => allPages.length,
  } );


  return (
    <View style={ globalStyles.globalMargin }>
      <PokeballBg style={ styles.imgPosition } />

      <FlatList
        data={ data?.pages.flat() ?? [] }
        keyExtractor={ ( pokemon, index ) => `${ pokemon.id }-${ index }` }
        numColumns={ 2 }
        style={ {
          paddingTop: top + 20, // Adjust for safe area insets
        } }
        ListHeaderComponent={ ListHeaderComponent }
        renderItem={ ( { item } ) => (
          <PokemonCard pokemon={ item } />
        ) }
        onEndReachedThreshold={ 0.6 }
        onEndReached={ () => fetchNextPage() }
        showsVerticalScrollIndicator={ false }
      />
      {
        isFetching && ( <FullScreenLoader /> )
      }
      <FAB
        icon="magnify"
        style={ [ globalStyles.fab, { backgroundColor: theme.colors.primary } ] }
        color={ theme.dark ? 'black' : 'white' }
        onPress={ () => { navigation.push( 'SearchScreen' ); } }
      />
    </View>
  );
};

const styles = StyleSheet.create( {
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  }
} );
