import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieResponse } from "../../../infra/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infra/mappers/movie.mapper";
import { FullMovie } from "../../entities/movie.entity";


export const getMovieByIdUseCase = async (
  fetcher: HttpAdapter,
  movieId: number
): Promise<FullMovie> => {
  try {
    const movieResponse = await fetcher.get<MovieResponse>(`/${movieId}`);
    return MovieMapper.fromMovieDBToEntity(movieResponse);
  } catch (error) {
    throw new Error(`Cannot get movie by id ${movieId}`);
  }
}
