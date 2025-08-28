import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieRecommandations from "./components/MovieRecommandations";
import Watchlist from "./components/Watchlist";
import Movies from "./components/Movies";
import Pagination from "./components/Pagination";
function App() {

  const [watchlist, setWatchlist] = useState([])

  const handleAddToWatchlist = (movieObj) => {
    let updatedWatchlist = [...watchlist, movieObj]
    setWatchlist(updatedWatchlist)
    localStorage.setItem('movies', JSON.stringify('movies'));
  }

  useEffect(()=> {
    let moviesFromWL = localStorage.getItem('movies');
    if(!moviesFromWL) {return}
    setWatchlist(JSON.parse(moviesFromWL));
  },[])
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="space-y-10 flex flex-wrap">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner /> <Movies handleAddToWatchlist={handleAddToWatchlist} watchlist={watchlist}/> 
                </>
              }
            />

            <Route path="/watchlist" element={<Watchlist watchlist={watchlist}/>} />

            <Route path="/recommend" element={<MovieRecommandations />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
