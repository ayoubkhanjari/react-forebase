import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieFullDetails } from '../services/api';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [videos, setVideos] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const { details, credits, videos, similar } = await getMovieFullDetails(id);
            setMovie(details);
            setCredits(credits);
            setVideos(videos.results);
            setSimilar(similar);
        }
        fetchData();
    }, [id]);

    if (!movie || !credits) return <div className="text-white text-center mt-10">Loading...</div>;

    const trailerKey = videos.find(v => v.type === "Trailer" && v.site === "YouTube")?.key;

    return (
        <div className="min-h-screen bg-black text-white">

            {/* Hero */}
            <section className="relative h-[500px]">
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    className="w-full h-full object-cover opacity-20 absolute inset-0"
                    alt="Backdrop"
                />
                <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-6">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="w-60 rounded-xl shadow-lg"
                        alt={movie.title}
                    />
                    <div>
                        <h1 className="text-4xl font-bold text-red-500">{movie.title}</h1>
                        <p className="italic text-red-300 mt-2">{movie.tagline}</p>
                        <p className="text-gray-300 mt-4">{movie.overview}</p>
                        <div className="mt-4 text-gray-400 space-y-1 text-sm">
                            <p><span className="text-white font-semibold">Genres:</span> {movie.genres.map(g => g.name).join(', ')}</p>
                            <p><span className="text-white font-semibold">Release Date:</span> {movie.release_date}</p>
                            <p><span className="text-white font-semibold">Runtime:</span> {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min</p>
                            <p><span className="text-white font-semibold">Rating:</span> ⭐ {movie.vote_average}/10</p>
                        </div>

                        {trailerKey && (
                            <button
                                onClick={() => setShowTrailer(true)}
                                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                ▶ Watch Trailer
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Cast */}
            <section className="max-w-6xl mx-auto px-4 py-6">
                <h2 className="text-2xl text-white font-semibold mb-4">Top Cast</h2>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {credits.cast.slice(0, 6).map(actor => (
                        <div key={actor.id} className="text-center text-gray-300">
                            <img
                                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                className="w-24 h-24 mx-auto rounded-full mb-2 object-cover"
                                alt={actor.name}
                            />
                            <p className="text-sm font-medium">{actor.name}</p>
                            <p className="text-xs text-gray-500">{actor.character}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Extra info */}
            <section className="max-w-6xl mx-auto px-4 py-6 text-gray-300 text-sm space-y-2">
                <p><b>Spoken Languages:</b> {movie.spoken_languages.map(l => l.name).join(', ')}</p>
                <p><b>Production Companies:</b> {movie.production_companies.map(c => c.name).join(', ')}</p>
                <p><b>Budget:</b> ${movie.budget.toLocaleString()}</p>
                <p><b>Revenue:</b> ${movie.revenue.toLocaleString()}</p>
            </section>

            {/* Similar Movies */}
            <section className="max-w-6xl mx-auto px-4 py-6">
                <h2 className="text-2xl text-white font-semibold mb-4">Similar Movies</h2>
                <div className="flex gap-4 overflow-x-auto">
                    {similar.map(movie => (
                        <Link to={`/movie/${movie.id}`} key={movie.id} className="min-w-[150px]">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                className="rounded shadow"
                                alt={movie.title}
                            />
                            <p className="text-gray-300 text-sm mt-1">{movie.title}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Trailer Modal */}
            {showTrailer && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                    <div className="w-[90%] max-w-3xl">
                        <iframe
                            className="w-full h-64 md:h-96"
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            title="YouTube trailer"
                            allowFullScreen
                        />
                        <button
                            onClick={() => setShowTrailer(false)}
                            className="mt-4 text-red-400 hover:text-red-600 text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetails;