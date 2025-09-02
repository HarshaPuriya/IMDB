import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MovieContext } from "./MovieContext";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

function Movies() {
  const { handleAddToWatchlist, watchlist } = useContext(MovieContext);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); // 🔹 search state

  // Pagination handlers
  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${page}`
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((err) => console.log(err));
  }, [page]);

  // 🔹 Filter movies by search text
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white w-full">
      {/* Movies Section */}
      <div className="px-6 py-8">
        <h2 className="text-3xl font-bold mb-6 flex justify-center w-full ">
          Trending Movies
        </h2>
        {/* 🔹 Search Bar */}
        <div className="flex justify-center mb-6 bg-gray-100 w-100 ml-130">
          <input
            type="text"
            placeholder="Search Movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 w-full max-w-md rounded-md text-black outline-none"
          />
        </div>
        {/* Responsive Grid */}
        <div className="flex flex-wrap justify-center gap-6 min-h-[400px]">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movieObj) => (
              <div key={movieObj.id} className="w-[250px]">
                <MovieCard
                  movieObject={movieObj}
                  handleAddToWatchlist={handleAddToWatchlist}
                  watchlist={watchlist}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 w-full">
              No movies found 😢
            </p>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          page={page}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>
    </div>
  );
}

export default Movies;
