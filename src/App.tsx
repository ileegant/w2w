import "./App.css";
import MovieCarousel from "./components/MovieCarousel";
import { MovieDetailsModal } from "./components/MovieDetailsModal";
import { useMovies } from "./context/MovieContext";

function App() {
  const { trendingMovies, favorites, watched, selectedMovieId } = useMovies();

  return (
    <>
      <MovieCarousel title="trending now" movies={trendingMovies} />
      <MovieCarousel title="watch later" movies={favorites} />
      <MovieCarousel title="watched" movies={watched} />
      {selectedMovieId && <MovieDetailsModal />}
    </>
  );
}

export default App;
