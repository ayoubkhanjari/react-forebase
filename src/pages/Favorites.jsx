// import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites(){

    const {favorites} = useMovieContext();

    if(favorites.length){
        return(
            <div className="bg-[url('/bg.jpg')] bg-cover bg-center min-h-screen w-full px-4 sm:px-6 py-8">
                <div className="w-full px-4 sm:px-6 py-8 sm:py-4 box-border " >   
                    <h2 className="text-7xl font-bold mt-14 mb-14 text-center">Your favorites</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 box-border">
                            {favorites.map((movie)=>(<MovieCard Movie={movie} key={movie.id}/>))}
                    </div>
                </div> 
            </div>
        );

    }

    return(
        <div className="bg-[url('/bg.jpg')] bg-cover bg-center min-h-screen w-full px-4 sm:px-6 py-8">
            <h2 className="text-7xl font-bold mt-14 mb-14 text-center">No favorite movies yet</h2>
            <p className="text-7xl font-bold mt-14 mb-14 text-center text-white">start adding your favorite movies</p>
        </div>
    );
}

export default Favorites