import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


function Trending({ movies }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (container) {
            const scrollAmount = 300;
            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="mt-16 relative">
            <h2 className="text-white text-2xl font-bold mb-4 px-2">🔥 Trending Now</h2>

            {/* Scrollable container */}
            <div className="relative">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Scrollable movie list */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-4 px-8 pb-4 scroll-smooth hide-scrollbar"
                >
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="min-w-[160px] sm:min-w-[180px] flex-shrink-0 transform hover:scale-105 transition duration-300"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                alt={movie.title}
                                className="rounded-lg w-full object-cover"
                            />
                            <p className="text-white mt-2 text-sm font-bold truncate text-center">{movie.title}</p>
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </section>
    );
}

export default Trending;
        // <section className="mt-16">
        //     <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar px-2">
        //         <div className="min-w-[160px] sm:min-w-[180px] flex-shrink-0 transform hover:scale-105 transition duration-300">
        //             <img
        //                 key={Movie.id}
        //                 src={`https://image.tmdb.org/t/p/w300${Movie.poster_path}`}
        //                 alt={Movie.title}
        //                 className="rounded-lg w-[180px] hover:scale-105 transition"
        //             />
        //             <p className="text-white mt-2 text-sm truncate text-center">{Movie.title}</p>

        //         </div>
        //     </div>
        // </section>
