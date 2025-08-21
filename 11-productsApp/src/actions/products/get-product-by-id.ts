import { tesloApi } from "../../config/api/tesloApi";
import { Gender, Product, Size } from "../../domain/entities/product";
import { TestloProduct } from "../../infra/interfaces/teslo-products.responses";
import { ProductMapper } from "../../infra/mappers/product.mapper";


const emptyProduct: Product = {
  id: '',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [ Size.Xs ],
  gender: Gender.Unisex,
  tags: [],
  images: [],
};


export const getProductById = async ( id: string ): Promise<Product> => {

  if ( id === 'new' ) return emptyProduct;

  try {
    console.log( "Fetching product with ID:", id );
    const { data } = await tesloApi.get<TestloProduct>( `/products/${ id }` );
    return ProductMapper.tesloProductToEntity( data );
  } catch ( error ) {
    console.error( `Error fetching product ${ id }: `, error );
    throw new Error( `Failed to fetch product with ID ${ id }` );
  }
};
