import { type AxiosError, isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";


const sanitiseImages = async ( images: string[] ) => {
  // TODO: check FILES
  const fileImages = images.filter( image => image.startsWith( 'file://' ) );
  const httpImages = images.filter( image => !image.startsWith( 'file://' ) );

  if ( fileImages.length > 0 ) {
    const uploadPromises = images.map( image => uploadImages( image ) );
    const uploadedImages = await Promise.all( uploadPromises );
    httpImages.push( ...uploadedImages );
  }

  return httpImages.map( image => image.split( '/' ).pop() ) || '';
};

const uploadImages = async ( image: string ): Promise<string> => {
  const formData = new FormData();
  formData.append( 'file', {
    uri: image,
    type: 'image/jpeg',
    name: image.split( '/' ).pop()
  } );

  const { data } = await tesloApi.post<{ image: string; }>( '/files/product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  } );

  return data.image;
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
    const cleanedImages = await sanitiseImages( images );

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
    const cleanedImages = await sanitiseImages( images );

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
