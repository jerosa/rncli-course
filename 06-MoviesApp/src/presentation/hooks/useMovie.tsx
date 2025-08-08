import { useEffect, useState } from "react";

import { movieDBFetcher } from "../../config/adapters/movieDB.adapter";
import * as UseCases from "../../core/use-cases";
import { FullMovie } from "../../core/entities/movie.entity";
import { Cast } from "../../core/entities/cast.entity";


export const useMovie = (movieId: number) => {

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<FullMovie>();
  const [cast, setCast] = useState<Cast[]>();

  useEffect(() => {
    loadMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId])


  const loadMovie = async () => {
    setIsLoading(true);

    const fullMoviePromise = await UseCases.getMovieByIdUseCase(movieDBFetcher, movieId);
    const castPromise = await UseCases.getMovieCastUseCase(movieDBFetcher, movieId);

    const [fullMovie, fullCast] = await Promise.all([fullMoviePromise, castPromise]);
    console.log(fullCast)

    setMovie(fullMovie);
    setCast(fullCast);

    setIsLoading(false);
  }

  return {
    // params
    isLoading,
    movie,
    cast,

    // methods
  }
}
