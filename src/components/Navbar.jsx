import React from "react";
import Logo from "../movieLogo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-900 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      {/* Left: Logo + Brand */}
      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
        <img className="w-10 h-10" src={Logo} alt="logo" />
        <span className="text-lg sm:text-xl font-bold text-blue-400">MovieApp</span>
      </div>

      {/* Right: Navigation */}
      <div className="flex space-x-6 overflow-x-auto whitespace-nowrap">
        <Link
          to="/"
          className="hover:text-blue-400 transition duration-300"
        >
          Movies
        </Link>
        <Link
          to="/watchlist"
          className="hover:text-blue-400 transition duration-300"
        >
          Watchlist
        </Link>
        <Link
          to="/recommend"
          className="hover:text-blue-400 transition duration-300"
        >
          AI Recommender
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
