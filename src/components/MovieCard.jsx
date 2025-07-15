// import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function MovieCard({ Movie }) {
  const { id, title, vote_average, poster_path, release_date, original_language } = Movie;
    const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
    const favorite = isFavorite(id);

    function onFavoriteClick(e) {
        e.preventDefault();
        favorite ? removeFromFavorites(id) : addToFavorites(Movie);
        console.log("isFavorite:", id, favorite);
    }

    return (
        <div className="movie-card">
          <button
            onClick={onFavoriteClick}
            className={`absolute top-4 right-4 text-[1.5rem] p-4 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center
            transition-colors duration-200 hover:bg-black/80 z-30
            ${favorite ? "text-[#ff4757]" : "text-white"}`}>
              ♥
          </button>
            {/* <button
              onClick={onFavoriteClick}
              className={`absolute top-8 right-8 text-white text-[1.5rem] p-4 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 hover:bg-black/80 z-30
                ${favorite ? "text-[#ff4757]" : ""} md:w-8 md:h-8 md:text-[1.2rem]`}
              >
              ♥
            </button> */}
          <img
            src={poster_path ?
              `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
            alt={title}
          />
    
          <div className="mt-4">
            <h3>{title}</h3>
    
            <div className="content">
              <div className="rating">
                <img src="star.svg" alt="Star Icon" />
                <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
              </div>
    
              <span>•</span>
              <p className="lang">{original_language}</p>
    
              <span>•</span>
              <p className="year">
                {release_date ? release_date.split('-')[0] : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      )
    }


export default MovieCard;    

    // return (
    //     // <div className="group relative p-5 rounded-lg shadow-inner shadow-light-100/10 overflow-hidden bg-red-950 transition-transform duration-200 hover:-translate-y-1 h-full flex flex-col text-sm md:text-[0.9rem]">    
    //     <div className="movie-card">   
    //         {/* Image */}
    //             <img
    //                 src={`https://image.tmdb.org/t/p/w500${Movie.poster_path}`}
    //                 alt={Movie.title}
    //                 className="w-full h-full object-cover"
    //             />




    //         {/* Overlay - now moved directly under `.group` */}
    //         {/* <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4 z-10"> */}
    //         {/* <div>
    //             <button
    //                 onClick={onFavoriteClick}
    //                 className={`absolute top-8 right-8 text-white text-[1.5rem] p-4 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 hover:bg-black/80
    //         ${favorite ? "text-[#ff4757]" : ""} md:w-8 md:h-8 md:text-[1.2rem]`}
    //             >
    //                 ♥
    //             </button>
    //         </div> */}




    //         {/* Info */}

    //         {/* <div className="p-4 flex-1 flex flex-col gap-2 md:p-3"> */}
            
            


    //         {/* <div className="content">
    //             <h3 className="text-white text-base m-0">{Movie.title}</h3>
    //             <p className="text-[#999] text-sm">
    //                 {Movie.release_date.split("-")[0]}
    //             </p>
    //             <div className="rating">
    //             <img src="../star.svg" alt="Star Icon" />
    //             <p>{Movie.vote_average ? Movie.vote_average.toFixed(1) : 'N/A'}</p>
    //         </div>
    //         </div> */}

    //         <div className="mt-4">
    //             <h3>{Movie.title}</h3>

    //             <div className="content">
    //                 <div className="rating">
    //                     <img src="star.svg" alt="Star Icon" />
    //                     <p>{Movie.vote_average ? Movie.vote_average.toFixed(1) : 'N/A'}</p>
    //                 </div>

    //                 <span>•</span>
    //                 <p className="lang">{Movie.original_language}</p>

    //                 <span>•</span>
    //                 <p className="year">
    //                     {Movie.release_date ? Movie.release_date.split('-')[0] : 'N/A'}
    //                 </p>
    //             </div>
    //         </div>


    //     </div>
    // );

// <div className="relative rounded-lg overflow-hidden bg-[#1a1a1a] transition-transform duration-200 hover:-translate-y-1 h-full flex flex-col">
//     <div className="relative aspect-[2/3] w-full">
//         <img src={`https://image.tmdb.org/t/p/w500${Movie.poster_path}`} alt={Movie.title} className="w-full h-full object-cover"/>
//         <div className="movie-overlay">
//         <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
//             ♥
//         </button>
//         </div>
//     </div>
//     <div className="movie-info">
//         <h3>{Movie.title}</h3>
//         <p>{Movie.release_date.split("-")[0]}</p>
//     </div>
// </div>