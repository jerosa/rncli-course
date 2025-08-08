import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieCastResponse } from "../../../infra/interfaces/movie-db.responses";
import { CastMapper } from "../../../infra/mappers/cast.mapper";
import { Cast } from "../../entities/cast.entity";

export const getMovieCastUseCase = async (fetcher: HttpAdapter, movieId: number): Promise<Cast[]> => {
  try {
    const { cast } = await fetcher.get<MovieCastResponse>(`/${movieId}/credits`);
    return cast.map((actor) => CastMapper.fromMovieDBCastToEntity(actor));
  } catch (error) {
    throw new Error(`Cannot get movie cast ${movieId}, ${error}`);
  }
}
