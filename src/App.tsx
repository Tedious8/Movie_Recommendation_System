import axios from "axios";
import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import { Loading } from "./templates/Loading";
import SearchBar from "./components/SearchBar";
import { scrollToTop } from "./utils/scrollToTop";
import MovieDetail from "./components/MovieDetail";
import { BASE_API_URL } from "./constants/env";
import { Movies } from "./types/Movies";

const API_URL = axios.create({baseURL: BASE_API_URL});

function App() {
  const [title, setTitle] = useState<string>('');
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movies>();
  const [recommendedMovies, setRecommendedMovies] = useState<Movies>();
  const [selectedMovie, setSelectedMovie] = useState<Array<number | string> | null>(null);
  

  useEffect(() => {
    startLoading();
    API_URL.get<Movies>(`/movies?title=${title}&limit=${limit}`)
      .then(res => {
        setMovies(res.data);
        cancelLoading();
      })
      .catch(err => {
        console.error('Error', err.message);        
      });
    cancelLoading();
  }, [limit, title]);

  const handleMovieClick = async (index: number, movies: Movies) => {
    if (!movies) return;
    startLoading();
    scrollToTop();
    const selectedMovie = movies.data[index];
    setSelectedMovie(selectedMovie)
    const result = await API_URL.post<Movies>('/movies', {
      title: selectedMovie[8]
    });
    setRecommendedMovies(result.data)
    cancelLoading();
  };

  const handleClose = () => {
    startLoading();
    setSelectedMovie(null);
    cancelLoading();
  };

  const startLoading = () => setIsLoading(true);
  const cancelLoading = (time: number = 5000) => {
      setTimeout(() => {
        setIsLoading(false);
      }, time);
  }  

  return (
    <>
      {isLoading && (<Loading blur={true}/>)}
      <header className="bg-[#0092B0] space-y-6 py-6">
        <h1 className="text-5xl lg:text-6xl text-center text-white font-bold">Movie Recommender</h1>
        <h2 className="text-3xl lg:text-4xl text-center text-white font-medium">Find Movies, TV shows and more</h2>
        <h3 className="text-base text-center text-white font-normal">Please note that the data presented on this website is limited to information collected up until 2017</h3>
        <SearchBar startLoading={startLoading} cancelLoading={cancelLoading} setSelectedMovie={setSelectedMovie} setTitle={setTitle} setLimit={setLimit}/>
      </header>
      {selectedMovie && recommendedMovies ? (
        <MovieDetail selectedMovie={selectedMovie} recommendedMovies={recommendedMovies} handleClose={handleClose} handleMovieClick={handleMovieClick}/>
      ) : (movies && movies.data.length > 0 ? (
        <>
          <MovieList movies={movies} onMovieClick={handleMovieClick}/>
          <section className="flex justify-center bg-[#1a4047] px-6 pt-4">
            <button onClick={() => setLimit(limit + 10)} className="bg-white px-6 py-4 rounded-full mb-4 font-normal text-xl cursor-pointer">Load more</button>
          </section>
        </>
      ) : (
        <section className="bg-[#EAFCFF] w-full px-8 py-12">
          <h3 className="text-center font-normal text-3xl">Sorry, we can't find the movies you're looking for...</h3>
        </section>
      )
      )}
    </>
  )
}

export default App
