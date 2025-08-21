import { tesloApi } from "../../config/api/tesloApi";
import type { Product } from "../../domain/entities/product";
import { TestloProduct } from "../../infra/interfaces/teslo-products.responses";
import { ProductMapper } from "../../infra/mappers/product.mapper";



export const getProductsByPage = async ( page: number, limit: number = 20 ): Promise<Product[]> => {
  try {
    const response = await tesloApi.get<TestloProduct[]>( `/products?offset=${ page * 10 }&limit=${ limit }` );
    return response.data.map( product => ProductMapper.tesloProductToEntity( product ) );
  } catch ( error ) {
    console.error( "Error fetching products:", error );
    throw error;
  }
};
