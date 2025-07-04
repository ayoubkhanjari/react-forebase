import { useEffect,useState } from "react";
import { getPopularMovies,searchMovies } from "../services/api"; 
import MovieCard from "../components/MovieCard";
import "../css/Home.css"

function Home(){

    const [searchQuery,setSearchQuery] = useState("");
    const [movies,setMovies]=useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);


    // when ever we fetch data from an api its a good practice to use try catch block to handle errors and
    // set two  variables (error and loading)

    useEffect(()=>{
        async function LoadPopularMovies() {
            try{
                const LoadMovies = await getPopularMovies();
                setMovies(LoadMovies);
                console.log(LoadMovies);
            }catch(err){
                console.log(err);
                setError("Failed to load error");
            }finally{
                setLoading(false);
            }
        }

        LoadPopularMovies();
    },[]);

    async function handleSearch(e){

        e.preventDefault(); // this is required to stop form from reloading the page

        if(searchQuery.trim() ==="") return;  // to not execute the function if the search field input is spaces 
        if(loading) return;  // execute the function only if the API is done loading data 

        setLoading(true);
            try{
                const loadMovie = await searchMovies(searchQuery);
                setMovies(loadMovie);          

            }catch(err){
                console.log(err);
                setError("Failed to load error");

            }finally{
                setLoading(false);
            }
    }

    function handleInput(e){
        setSearchQuery(e.target.value);
    }

    return(
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" onChange={handleInput} className="search-input" value={searchQuery}></input>
                <button type="submit" className="search-button">Search</button>
            </form>
            {/* if some thing went wrong while loading data from the API */}
            {error && <div className="error-message">{error}</div>} 

            {/* show loadin... when the API is loading data otherwise show data */}
            {loading ?(<div className="loading">Loading...</div>) :
            (<div className="movies-grid">
                {movies.map((movie)=>(<MovieCard Movie={movie} key={movie.id}/>))}
            </div>)}
            
        </div>
    );

}

export default Home