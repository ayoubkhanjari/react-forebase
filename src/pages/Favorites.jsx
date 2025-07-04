import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites(){

    const {favorites} = useMovieContext();
    let gridClassName = "";

    if(favorites.length === 1){
        gridClassName= "movies-grid-custom1";
    }else gridClassName= "movies-grid";

    if(favorites){
        return(
            <div>
                <h2 style={{textAlign:"center"}}>your favorite</h2>
                <div className="favorites">
                    {/* {favorites.length == 1 ?  */}
                    <div className={gridClassName} >
                        {favorites.map((movie)=>(<MovieCard Movie={movie} key={movie.id}/>))}
                    </div> 
                    
                </div>
            </div>
        );

    }

    return(
        <div className="favorites-empty">
            <h2>No favorite movies yet</h2>
            <p>start adding your favorite movies</p>
        </div>
    );
}

export default Favorites