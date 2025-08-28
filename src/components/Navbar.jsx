import React from "react";
import Logo from "../movieLogo.png";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="flex space-x-8 pl-3 py-4 items-center text-2xl font-bold text-blue-400  ">
      <img className="w-[40px]" src={Logo} />

      <Link to="/">Movies</Link>
      <Link to="/watchlist">Watchlist</Link>
      <Link to="/recommend">Movie Recommandations AI</Link>
    </div>
  );
}

export default Navbar;
