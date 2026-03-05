import "./App.css";
import MovieCarousel from "./components/MovieCarousel";
import { DetailCard } from "./components/MovieModal/DetailCard";
import { useMovies } from "./context/MovieContext";

function App() {
  const { trendingMovies, favorites, watched, selectedMovieId, loading } =
    useMovies();

  return (
    <>
      <MovieCarousel
        title="trending now"
        movies={trendingMovies}
        loading={loading}
      />
      <MovieCarousel title="watch later" movies={favorites} loading={loading} />
      <MovieCarousel title="watched" movies={watched} loading={loading} />
      {selectedMovieId && <DetailCard />}
    </>
  );
}

export default App;
