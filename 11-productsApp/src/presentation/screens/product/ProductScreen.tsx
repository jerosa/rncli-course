import { StackScreenProps } from '@react-navigation/stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTheme } from '@ui-kitten/components';
import { ProductForm } from './ProductForm';
import { useRef } from 'react';

import { getProductById } from '../../../actions/products/get-product-by-id';
import { Gender, Product } from '../../../domain/entities/product';
import { Size } from '../../../infra/interfaces/teslo-products.responses';
import { MainLayout } from '../../layouts/MainLayout';
import { RootStackParams } from '../../navigation/StackNavigator';
import { updateCreateProduct } from '../../../actions/products/update-create-product';


const sizes: Size[] = [
  Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl
];
const genders: Gender[] = [
  Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex
];


interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { }


export const ProductScreen = ( { route }: Props ) => {

  const productIdRef = useRef( route.params.productId );
  const theme = useTheme();
  const queryClient = useQueryClient();


  const { data: product } = useQuery( {
    queryKey: [ 'product', productIdRef.current ],
    queryFn: () => getProductById( productIdRef.current ),
  } );

  // mutation
  const mutation = useMutation( {
    mutationFn: ( data: Product ) => updateCreateProduct( { ...data, id: productIdRef.current } ),
    onSuccess: ( data: Product ) => {
      productIdRef.current = data.id; // Update the ref with the new product ID if it was created
      queryClient.invalidateQueries( { queryKey: [ 'products', 'infinite' ] } );
      queryClient.invalidateQueries( { queryKey: [ 'product', productIdRef.current ] } );
    }
  } );

  if ( !product ) {
    return ( <MainLayout title="Loading..." /> );
  }

  return (
    <ProductForm
      product={ product }
      mutation={ mutation }
      sizes={ sizes }
      genders={ genders }
      theme={ theme }
    />
  );
};
