import { StyleSheet, View } from "react-native"
import { useMovies } from "../../hooks/useMovies"
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PosterCarousel } from "../../components/movies/PosterCarousel";
import { HorizontalCarousel } from "../../components/movies/HorizontalCarousel";
import { FullScreenLoader } from "../../components/loaders/FullScreenLoader";



export const HomeScreen = () => {

  const { top } = useSafeAreaInsets();

  const styles = StyleSheet.create({
    view: {
      marginTop: top + 20,
      paddingBottom: 30
    }
  })

  const { isLoading, nowPlaying, popular, topRated, upcoming, popularNextPage } = useMovies();
  if (isLoading) {
    return <FullScreenLoader />
  }

  return (
    <ScrollView>
      <View style={styles.view}>

        {/* Principal */}
        <PosterCarousel movies={nowPlaying} />

        {/* Populars */}
        <HorizontalCarousel loadNextPage={popularNextPage} movies={popular} title="Popular" />

        {/* Top Rated */}
        <HorizontalCarousel movies={topRated} title="Top Rated" />

        {/* Upcoming */}
        <HorizontalCarousel movies={upcoming} title="Upcoming" />
      </View>
    </ScrollView>
  )
}
