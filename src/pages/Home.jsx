import { use, useEffect, useState } from "react";
import { getPopularMovies, searchMovies , trendingMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import Trending from "../components/Trending";
import { Link } from "react-router-dom";
// import "../css/Home.css"
import "../index.css";

function Home() {

    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trending,setTrending]= useState([]);


    // when ever we fetch data from an api its a good practice to use try catch block to handle errors and
    // set two  variables (error and loading)

    useEffect(()=>{
        const loadTrending = async ()=>{
            try{
                const loadTrendingMovies = await trendingMovies();
                setTrending(loadTrendingMovies);
            }catch(err){
                console.log(err);
            }
        }

        loadTrending();

    },[]);


    useEffect(() => {
        async function LoadPopularMovies(pageNumber) {
            try {
                const LoadMovies = await getPopularMovies(pageNumber);
                setMovies((prev) => [...prev, ...LoadMovies]);
                
            } catch (err) {
                console.log(err);
                setError("Failed to load error");
            } finally {
                setLoading(false);
                console.log(page);
            }
        }

        LoadPopularMovies(page);
        console.log(movies);
    }, [page]);

    async function handleSearch(e) {

        e.preventDefault(); // this is required to stop form from reloading the page

        if (searchQuery.trim() === "") return;  // to not execute the function if the search field input is spaces 
        if (loading) return;  // execute the function only if the API is done loading data 

        setLoading(true);
        try {
            const loadMovie = await searchMovies(searchQuery);
            setMovies(loadMovie);

        } catch (err) {
            console.log(err);
            setError("Failed to load error");

        } finally {
            setLoading(false);
        }
    }

    function handleInput(e) {
        setSearchQuery(e.target.value);
    }

    return (
    <div className="bg-[url('/bg.jpg')] bg-cover bg-center bg-fixed min-h-screen w-full px-4 sm:px-6 py-8">
        <div className="w-full px-4 sm:px-6 py-8 sm:py-4 box-border " >
            <form
                onSubmit={handleSearch}
                className="max-w-xl mx-auto mb-8 sm:mb-4 flex gap-4 px-4 box-border"
            >
                <input
                    type="text"
                    onChange={handleInput}
                    value={searchQuery}
                    className="flex-1 py-3 px-4 border-red-800 border-1 bg-[#181010] text-white text-base rounded focus:outline-none focus:ring-2 focus:ring-[#666]  "
                />
                <button
                    type="submit"
                    className="py-3 px-6 bg-[#e50914] hover:bg-[#f40612] text-white font-medium rounded whitespace-nowrap transition-colors duration-200 cursor-pointer"
                >
                    Search
                </button>
            </form>
            

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            {loading ? (
                <div className="text-white text-center">Loading...</div>
            ) : (
                <>
                <h1 className="text-7xl font-bold mt-14 mb-14">Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 box-border">
                    {movies.map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id}>
                        <MovieCard Movie={movie} />
                        </Link>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="py-3 px-6 bg-[#e50914] hover:bg-[#f40612] text-white font-medium rounded whitespace-nowrap transition-colors duration-200 cursor-pointer"
                    >
                    Load More
                    </button>
                </div>
                        <Trending movies={trending} />
                </>
            )}
        </div>
    </div>
    );

}

export default Home