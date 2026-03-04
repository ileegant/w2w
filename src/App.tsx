import "./App.css";
import MovieCarousel from "./components/MovieCarousel";
import { MovieDetailsModal } from "./components/MovieDetailsModal";
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
      {selectedMovieId && <MovieDetailsModal />}
    </>
  );
}

export default App;
