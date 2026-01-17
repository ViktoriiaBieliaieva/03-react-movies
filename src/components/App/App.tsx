import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import fetchMovies from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const handleSearch = async (value: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);
      const data = await fetchMovies(value);
      if (data.length === 0) {
        toast.error("No movies found for your request.", {
          icon: "❌",
        });
      } else {
        setMovies(data);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <Toaster />
      <MovieGrid movies={movies} onSelect={handleMovieClick} />
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal}></MovieModal>
      )}
    </div>
  );
}
