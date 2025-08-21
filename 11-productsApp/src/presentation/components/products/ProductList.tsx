import { Product } from '../../../domain/entities/product';
import { List, Layout } from '@ui-kitten/components';
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import { RefreshControl } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';


interface Props {
  products: Product[];
  fetchNextPage: () => void;
}

export const ProductList = ( { products, fetchNextPage }: Props ) => {

  const queryClient = useQueryClient();
  const [ isRefreshing, setIsRefreshing ] = useState( false );

  const onPullToRefresh = async () => {
    setIsRefreshing( true );
    queryClient.invalidateQueries( [ 'products', 'infinite' ] );
    await new Promise( resolve => setTimeout( resolve, 200 ) ); // Simulate a network request

    setIsRefreshing( false );
  };

  return (
    <List
      data={ products }
      numColumns={ 2 }
      keyExtractor={ ( item, index ) => `${ item.id }-${ index }` }
      renderItem={ ( { item } ) => (
        <ProductCard product={ item } />
      ) }
      ListFooterComponent={ () => <Layout style={ { height: 150 } } /> }

      onEndReached={ fetchNextPage }
      onEndReachedThreshold={ 0.6 }

      refreshControl={
        <RefreshControl
          refreshing={ isRefreshing }
          onRefresh={ onPullToRefresh }
        />
      }
    />
  );
};
