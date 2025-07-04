import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({Movie}){
    const { addToFavorites, removeFromFavorites,isFavorite} = useMovieContext();

    const favorite = isFavorite(Movie.id);


    function onFavoriteClick(e){
        e.preventDefault();
        favorite? removeFromFavorites(Movie.id):addToFavorites(Movie);
    }
    
    return(
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${Movie.poster_path}`} alt={Movie.title}/>
                <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{Movie.title}</h3>
                <p>{Movie.release_date.split("-")[0]}</p>
            </div>
        </div>
    );


}

export default MovieCard