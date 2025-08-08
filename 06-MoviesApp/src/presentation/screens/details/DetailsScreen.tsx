// import { useRoute } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/Navigation";
import { useMovie } from "../../hooks/useMovie";
import { MovieHeader } from "../../components/movie/MovieHeader";
import { MovieDetails } from "../../components/movie/MovieDetails";
import { ScrollView } from "react-native-gesture-handler";
import { FullScreenLoader } from "../../components/loaders/FullScreenLoader";

interface Props extends StackScreenProps<RootStackParams, 'Details'> { };

export const DetailsScreen = ({ route }: Props) => {

  // const { movieId } = useRoute().params;
  // console.log(movieId);

  const { movieId } = route.params;
  const { movie, isLoading, cast } = useMovie(movieId);

  if (isLoading || !movie || !cast) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView>
      <MovieHeader
        title={movie.title}
        originalTitle={movie.originalTitle}
        poster={movie.poster}
      />

      <MovieDetails
        movie={movie}
        cast={cast}
      />
    </ScrollView>
  )
}
