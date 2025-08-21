import { StackScreenProps } from '@react-navigation/stack';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { ProductList } from '../../components/products/ProductList';
import { FAB } from '../../components/ui/FAB';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { MainLayout } from '../../layouts/MainLayout';
import { RootStackParams } from '../../navigation/StackNavigator';


interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> { }


export const HomeScreen = ( { navigation }: Props ) => {

  const queryClient = useQueryClient();

  const { isLoading, data, fetchNextPage } = useInfiniteQuery( {
    queryKey: [ 'products', 'infinite' ],
    staleTime: 1000 * 60 * 60, // 1 hour
    initialPageParam: 0,

    queryFn: async ( params ) => {
      const products = await getProductsByPage( params.pageParam );

      // Preload product data into the query cache
      products.forEach( product => {
        queryClient.setQueryData( [ 'product', product.id ], product );
      } );
      return products;
    },
    getNextPageParam: ( lastPage, allPages ) => allPages.length,
  } );


  return (
    <>
      <MainLayout
        title='TesloShop - Products'
        subTitle='Browse the latest products'
      // rightAction={ () => { } }
      // rightActionIcon='plus-outline'
      >
        {
          isLoading
            ? <FullScreenLoader />
            : <ProductList
              products={ data?.pages.flat() ?? [] }
              fetchNextPage={ fetchNextPage }
            />
        }
      </MainLayout>

      <FAB
        iconName="plus-outline"
        style={ { position: 'absolute', bottom: 20, right: 20 } }
        onPress={ () => navigation.navigate( 'ProductScreen', { productId: 'new' } ) }
      />
    </>
  );
};
