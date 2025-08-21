import { AxiosError, isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";


const sanitiseImages = ( images: string[] ) => {
  // TODO: check FILES

  return images.map( image => image.trim() && image.split( '/' ).pop() ) || '';
};


export const updateCreateProduct = async ( product: Partial<Product> ) => {

  product.stock = Number( product.stock ) || 0;
  product.price = Number( product.price ) || 0;

  if ( product.id && product.id !== 'new' ) {
    // Update existing product
    return updateProduct( product );
  } else {
    // Create new product
    return createProduct( product );
  }
};


// TODO: check if user is present
const updateProduct = async ( product: Partial<Product> ) => {
  const { id, images = [], ...rest } = product;

  try {
    const cleanedImages = sanitiseImages( images );

    const { data } = await tesloApi.patch<Product>( `/products/${ id }`, {
      images: cleanedImages,
      ...rest
    } );
    return data;
  } catch ( error: AxiosError | any ) {

    if ( isAxiosError( error ) ) {
      console.error( error.response?.data );
    } else {
      console.error( error );
    }
    throw new Error( 'Error updating product' );
  }
};


const createProduct = async ( product: Partial<Product> ) => {

  const { id, images = [], ...rest } = product;

  try {
    const cleanedImages = sanitiseImages( images );

    const { data } = await tesloApi.post<Product>( `/products`, {
      images: cleanedImages,
      ...rest
    } );
    return data;
  } catch ( error: AxiosError | any ) {

    if ( isAxiosError( error ) ) {
      console.error( error.response?.data );
    } else {
      console.error( error );
    }
    throw new Error( 'Error creating product' );
  }
};
