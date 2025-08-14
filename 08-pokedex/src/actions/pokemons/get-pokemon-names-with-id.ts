import { pokeApi } from "../../config/api/pokeApi";
import { PokeAPIPaginatedResponse } from "../../infra/interfaces/pokeapi.interfaces";


export const getPokemonNamesWithId = async () => {

  const url = `pokemon?limit=1000`;
  const { data } = await pokeApi.get<PokeAPIPaginatedResponse>( url );

  return data.results.map( ( pokemon ) => ( {
    id: Number( pokemon.url.split( '/' )[ 6 ] ),
    name: pokemon.name
  } ) );
};
