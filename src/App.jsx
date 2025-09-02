import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieRecommandations from "./components/MovieRecommandations";
import Watchlist from "./components/Watchlist";
import Movies from "./components/Movies";
import { MovieContext } from "./components/MovieContext";
function App() {
  const [watchlist, setWatchlist] = useState(() => {
  const saved = localStorage.getItem("movies");
  try {
    return saved ? JSON.parse(saved) : [];
  } catch {
    return []; // fallback if corrupted
  }
});

// Add to watchlist
const handleAddToWatchlist = (movie) => {
  let updated = [...watchlist, movie];
  setWatchlist(updated);
  localStorage.setItem("movies", JSON.stringify(updated));
};

// Deleting
const handleDelete = (movieId) => {
  const updated = watchlist.filter((movie) => movie.id !== movieId);
  setWatchlist(updated);
  localStorage.setItem("movies", JSON.stringify(updated));
};


  useEffect(() => {
    let moviesFromWL = localStorage.getItem("movies");
    if (!moviesFromWL) {
      return;
    }
    setWatchlist(JSON.parse(moviesFromWL));
  }, []);
  return (
    <>
      <MovieContext.Provider
        value={{watchlist, setWatchlist, handleAddToWatchlist, handleDelete }}
      >
        <BrowserRouter>
          <Navbar />
          <div className="space-y-10 flex flex-wrap">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Banner /> <Movies />
                  </>
                }
              />

              <Route
                path="/watchlist"
                element={<Watchlist watchlist={watchlist} />}
              />

              <Route path="/recommend" element={<MovieRecommandations />} />
            </Routes>
          </div>
        </BrowserRouter>
      </MovieContext.Provider>
    </>
  );
}

export default App;
