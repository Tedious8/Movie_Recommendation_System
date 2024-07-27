import { handleStringFormat } from "../utils/string";
import Close from "../assets/icons/close-ellipse-svgrepo-com.svg";
import MovieList from "./MovieList";
import { Movies } from "../types/Movies";

interface MovieDetailProps {
    selectedMovie: Array<string | number>;
    recommendedMovies: Movies;
    handleClose: () => void;
    handleMovieClick: (index: number, movies: Movies) => Promise<void>;
}

export default function MovieDetail(props: MovieDetailProps): JSX.Element | null {
    const {selectedMovie, recommendedMovies, handleClose, handleMovieClick} = props;
    
    return (
        selectedMovie && (
            <>
                <section className="flex lg:flex-row flex-col px-12 py-8 gap-8 bg-[#EAFCFF]">
                    <figure>
                    {typeof selectedMovie[25] === 'string' ? (
                        <img
                        className="lg:min-w-96 lg:max-w-96 min-h-48 rounded-xl"
                        src={selectedMovie[25]} alt="" />
                    ) : (
                        <div className="lg:min-w-96 lg:max-w-96 min-h-48 rounded-xl cursor-pointer bg-[#00000040] flex justify-center items-center font-medium text-base">Image not found</div>
                    )}   
                    </figure>
                    <figcaption className="flex gap-4 min-h-max flex-col">
                    <h1 className="text-4xl font-medium">{selectedMovie[8]}</h1>
                    <p className="text-base">{selectedMovie[9]}</p>
                    <p><span className="font-medium">Released:</span> {selectedMovie[13]}</p>
                    {typeof selectedMovie[3] === 'string' && (
                        <p><span className="font-medium">Genre:</span> {handleStringFormat(selectedMovie[3], false)}</p>
                    )}
                    {typeof selectedMovie[23] === 'string' && (
                        <p><span className="font-medium">Casts:</span> {handleStringFormat(selectedMovie[23], false)}</p>
                    )}
                    <p><span className="font-medium">Duration:</span> {selectedMovie[15]}m</p>
                    <p><span className="font-medium">Score:</span> {selectedMovie[20]}/10 by {selectedMovie[21]} reviewers</p>
                    {typeof selectedMovie[11] === 'string' && (
                        <p><span className="font-medium">Production:</span> {handleStringFormat(selectedMovie[11], true)}</p>
                    )}
                    </figcaption>
                    {window.innerWidth > 1024 && (
                    <figure className="" onClick={handleClose}>
                        <img
                        className="min-w-8 max-w-8 cursor-pointer" 
                        src={Close} alt="" />
                    </figure>
                    )}
                </section>
                <h4 className="bg-[#EAFCFF] text-4xl font-medium px-12 py-4">You may also like</h4>
                <MovieList movies={recommendedMovies} onMovieClick={handleMovieClick}/>
            </>
        ));
}