import { Movies } from "../types/Movies";

interface MovieListProps {
    movies: Movies;
    onMovieClick: (index: number, movies: Movies) => void;
}

export default function MovieList(props: MovieListProps): JSX.Element {
    const { movies, onMovieClick } = props;
    return (
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-y-6 py-6 bg-[#EAFCFF]">
            {movies && movies.data.length > 0 && (movies.data.map((value, index) => (
            <figure key={index} onClick={() => onMovieClick(index, movies)} className="flex flex-col space-y-1 items-center">
                {typeof value[25] === 'string' ? (
                    <img className="w-44 max-h-64 min-h-64 rounded-xl cursor-pointer" src={value[25]} alt="" />
                ) : (
                    <div className="w-44 max-h-64 min-h-64 rounded-xl cursor-pointer bg-[#00000040] flex justify-center items-center font-medium text-base">Image not found</div>
                )}
                <h3 className="max-w-full text-lg font-medium text-center overflow-clip">{value[8]}</h3>
                <h4 className="text-sm font-normal">{new Date(value[13]).getFullYear()} - {value[15]}m</h4>           
            </figure>
            )))}
        </section>
    )
}