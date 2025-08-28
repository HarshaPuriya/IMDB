import React from "react";

function MovieCard({ movieObject, handleAddToWatchlist, watchlist }) {
  function doesContain() {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id === movieObject.id) {
        return true;
      }
    }
    return false;
  }
  return (
    <div className="space-y-8  space-x-8">
      <div
        className="ml-10 mt-10 rounded-xl w-[200px] h-[40vh] bg-cover"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieObject.poster_path})`,
        }}
      >
        {doesContain(movieObject) ? (
          <div className="ml-40">&#10060;</div>
        ) : (
          <div
            onClick={() => handleAddToWatchlist(movieObject)}
            className="ml-40 "
          >
            &#128525;
          </div>
        )}
        <h5 className="text-white text-center mt-40 p-2 text-lg bg-gray-900/75 ">
          {movieObject.title}
        </h5>
      </div>
    </div>
  );
}

export default MovieCard;
