import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { UpcomingResponse } from "../../../infra/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infra/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";


export const moviesUpcomingUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {
  try {
    const upcoming = await fetcher.get<UpcomingResponse>('/upcoming');
    return upcoming.results.map(result => MovieMapper.fromMovieDBResultToEntity(result));
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies - Upcoming');
  }
}
