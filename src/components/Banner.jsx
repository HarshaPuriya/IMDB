import React, { useEffect, useState } from "react";
import axios from "axios";

function Banner() {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=f2494bf4670d3b9dd0f7817bb84c286f&language=en-US&page=1`
      )
      .then((response) => {
        const results = response.data.results.filter(
          (movie) => movie.backdrop_path
        );
        setMovies(results);
      })
      .catch((err) => console.log("Error fetching banners:", err));
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [movies]);

  if (movies.length === 0) {
    return <div className="h-[70vh] w-[100vw] bg-gray-800">Loading...</div>;
  }

  const currentMovie = movies[current];

  return (
    <div className="relative">
      {/* Backdrop */}
      <div
        className="h-[90vh] w-[100vw] bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path})`,
        }}
      ></div>

      {/* Title overlay */}
      <div className="absolute bottom-0 w-full bg-black/60 text-white text-center py-4 text-2xl font-bold">
        {currentMovie.title || currentMovie.name}
      </div>
    </div>
  );
}

export default Banner;
