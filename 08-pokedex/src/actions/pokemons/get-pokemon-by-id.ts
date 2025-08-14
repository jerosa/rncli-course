import { pokeApi } from "../../config/api/pokeApi";
import { Pokemon } from "../../domain/entities/pokemon";
import { PokeAPIPokemonResponse } from "../../infra/interfaces/pokeapi.interfaces";
import { PokemonMapper } from "../../infra/mappers/pokemon.mapper";


export const getPokemonById = async ( pokemonId: number ): Promise<Pokemon> => {
  try {
    const url = `/pokemon/${ pokemonId }`;
    const { data } = await pokeApi.get<PokeAPIPokemonResponse>( url );

    return PokemonMapper.pokeApiPokemonToEntity( data );
  } catch ( error ) {
    throw new Error( "Error fetching Pokémon: " + error );
  }
};
