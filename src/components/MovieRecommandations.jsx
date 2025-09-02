import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "./MovieContext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaRegSadCry } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import { GEMINI_API_KEY } from "../utilities/constant";


const genAI = new GoogleGenerativeAI(GEMINI_API_KEY); // replace with your Gemini key


function MovieRecommandations() {
  const { watchlist } = useContext(MovieContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecommendations = async () => {
      if (!Array.isArray(watchlist) || watchlist.length === 0) return;
      setLoading(true);
      setError(null);

      try {
        const watchlistData = watchlist.map((movie) => ({
          title: movie.title,
          genre: movie.genre_ids?.[0],
        }));

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Here is my watchlist: ${JSON.stringify(watchlistData)}.
        Suggest 5 similar movies.
        Return the result strictly as a JSON array in this format:
        [
          {
            "id": number (random unique id),
            "title": "string",
            "overview": "string (2-3 sentences)",
            "poster_path": "string (use placeholder like https://via.placeholder.com/300x450 if unknown)"
          }
        ]
        Do NOT include any extra explanation or formatting.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        let parsed;
        try {
          // remove ```json ... ``` if Gemini wrapped the response
          const cleanText = text.replace(/```json|```/g, "").trim();
          parsed = JSON.parse(cleanText);
        } catch (jsonErr) {
          console.error("Gemini response not valid JSON:", text);
          throw new Error("Invalid response format from Gemini.");
        }

        setRecommendations(parsed);
      } catch (err) {
        setError("Failed to get recommendations. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, [watchlist]);

  if (!Array.isArray(watchlist) || watchlist.length === 0) {
    return (
      <div className="bg-gray-900 text-white min-h-screen w-full flex flex-col items-center justify-center text-center">
        <MdMovie className="text-6xl text-gray-500 mb-4" />
        <h2 className="text-2xl font-semibold">Your watchlist is empty!</h2>
        <p className="text-gray-400 mt-2">
          Add some movies to get recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen w-full p-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        Recommended Movies 🎬
      </h2>

      {loading && (
        <div className="flex justify-center items-center mt-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500 bg-red-100 p-4 rounded-md text-center flex items-center justify-center gap-2 w-full max-w-lg mx-auto shadow-md">
          <FaRegSadCry className="text-xl" /> {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {recommendations.map((movie) => (
            <div
              key={movie.id}
              className="relative w-[250px] rounded-lg overflow-hidden shadow-lg p-4 bg-white text-black transform transition-transform hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="font-bold text-lg truncate">{movie.title}</h3>
              <p className="text-sm mt-2 text-gray-600 ">
                {movie.overview}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieRecommandations;
