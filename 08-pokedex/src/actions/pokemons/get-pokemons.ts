import { pokeApi } from "../../config/api/pokeApi";
import type { Pokemon } from "../../domain/entities/pokemon";
import type { PokeAPIPaginatedResponse, PokeAPIPokemonResponse } from "../../infra/interfaces/pokeapi.interfaces";
import { PokemonMapper } from "../../infra/mappers/pokemon.mapper";


export const getPokemons = async ( page: number, limit: number = 20 ): Promise<Pokemon[]> => {
  try {

    const url = `/pokemon?offset=${ page * 10 }&limit=${ limit }`;
    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>( url );

    // do not await. multiple promises
    const pokemonPromises = data.results.map( ( info ) => {
      return pokeApi.get<PokeAPIPokemonResponse>( info.url );
    } );

    const pokeApiPokemons = await Promise.all( pokemonPromises );
    const pokemonsPromises = pokeApiPokemons.map( ( response ) =>
      PokemonMapper.pokeApiPokemonToEntity( response.data )
    );
    const pokemons = await Promise.all( pokemonsPromises );

    return pokemons;

  } catch ( error ) {
    throw new Error( "Error fetching Pokémon: " + error );
  }
};
