import { useEffect, useState, useContext } from "react";
import genreids from "../utilities/genre";
import { MovieContext } from "./MovieContext";

function Watchlist() {
  let { watchlist,  handleDelete } = useContext(MovieContext);

  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [currGenre, setcurrGenre] = useState("All Genres");

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleFilter(genre) {
    setcurrGenre(genre);
  }

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids?.[0]];
    });
    temp = new Set(temp);
    setGenreList(["All Genres", ...temp]);
    localStorage.setItem("movies", JSON.stringify(watchlist));

  }, [watchlist]);

  
  return (
    <>
      {/* Genre buttons */}
      <div className="flex flex-wrap w-full justify-center gap-3 my-4">
        {genreList.map((genre) => (
          <button
            key={genre}
            onClick={() => handleFilter(genre)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${
              currGenre === genre
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Search box */}
      <div className="flex justify-center w-full my-5">
        <input
          className="outline-none p-2 h-[3rem] w-[18rem] bg-gray-100"
          type="text"
          placeholder="Search Movies"
          onChange={handleSearch}
          value={search}
        />
      </div>

      {/* Table */}
      <div className="m-8 w-full overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className=" border border-gray-200 bg-gray-300">
            <tr>
              <th className="px-6 py-4 text-center">Name</th>
              <th className="px-6 py-4 text-center">Ratings</th>
              <th className="px-6 py-4 text-center">Popularity</th>
              <th className="px-6 py-4 text-center">Genre</th>
              <th className="px-6 py-4 text-center">Delete Movies</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {watchlist
              .filter((movieObj) => {
                if (currGenre === "All Genres") return true;
                return genreids[movieObj.genre_ids?.[0]] === currGenre;
              })
              .filter((movieObj) => {
                const title = movieObj.title || "";
                return title.toLowerCase().includes(search.toLowerCase());
              })
              .map((movieObj) => (
                <tr className="border-b-2" key={movieObj.id}>
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <img
                      className="h-[6rem] w-[10rem]"
                      src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                      alt="movieposter"
                    />
                    <div>{movieObj.title}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {movieObj.vote_average}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {movieObj.popularity}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {genreids[movieObj.genre_ids?.[0]] || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(movieObj.id)}
                      className="px-3 py-1 text-sm font-semibold bg-red-500 text-white rounded-md transition-all duration-300 hover:bg-red-600"
                    >
                      Delete ❌
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
