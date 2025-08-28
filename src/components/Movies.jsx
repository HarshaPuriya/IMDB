import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({handleAddToWatchlist, watchlist}) {

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1)
    
    //pagination next
    const handleNext=()=> {
      setPage(page+1)
    }

    const handlePrev=()=> {
      if(page > 1) {
        setPage(page-1)
      }
    }

  useEffect(() => {
    axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=f2494bf4670d3b9dd0f7817bb84c286f&language=en-US&page=${page}`
    ).then((response)=> {
        setMovies(response.data.results);
        
    }).catch((err)=> {
        console.log(err + 'Cannot fetch API data');
    })
  }, [page]);
  return (
    <div>
    <div className="flex justify-evenly flex-wrap">
      {
        movies.map((movieObj)=> (
            <MovieCard movieObject={movieObj} handleAddToWatchlist={handleAddToWatchlist} watchlist={watchlist}/>
        ))
      }
    </div>
    <Pagination pageNumber={page} nextFn={handleNext} previousFn={handlePrev}/>
    </div>
  );
}

export default Movies;
