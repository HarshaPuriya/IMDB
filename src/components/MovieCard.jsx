import React, { useContext } from "react";
import { MovieContext } from "./MovieContext";

function MovieCard({ movieObject }) {
  let { handleAddToWatchlist, watchlist } = useContext(MovieContext);

  function doesContain() {
  if (!Array.isArray(watchlist)) return false;
  return watchlist.some((movie) => movie.id === movieObject.id);
}


  return (
    <div className="relative group cursor-pointer">
      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/original/${movieObject.poster_path}`}
        alt={movieObject.title}
        className="w-full h-[350px] sm:h-[400px] object-cover rounded-md"
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl flex flex-col justify-end p-3">
        <h3 className="text-lg font-semibold mb-2 text-center">
          {movieObject.title}
        </h3>
        <div className="flex justify-between items-center text-sm">
          <span>⭐ {movieObject.vote_average.toFixed(1)}</span>
          {doesContain() ? (
            <button className="bg-red-500 px-2 py-1 rounded text-xs">
              In Watchlist
            </button>
          ) : (
            <button
              onClick={() => handleAddToWatchlist(movieObject)}
              className="bg-blue-500 px-2 py-1 rounded text-xs hover:bg-blue-600"
            >
              + Watchlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
