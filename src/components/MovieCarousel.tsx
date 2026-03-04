import type { Movie } from "../types";
import EmptyCard from "./EmptyCard";
import MovieCard from "./MovieCard";

interface MovieCarouselProps {
  title: string;
  movies: Movie[] | null;
}

export default function MovieCarousel({ title, movies }: MovieCarouselProps) {
  return (
    <div className="flex flex-col gap-2 uppercase bg-neutral-800 py-4 w-full px-40">
      <h3 className="text-2xl text-neutral-50 font-black">{title}</h3>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pt-2">
        {!movies?.length && <EmptyCard />}

        {movies?.map((movie) => {
          return <MovieCard movie={movie} />;
        })}
      </div>
    </div>
  );
}
