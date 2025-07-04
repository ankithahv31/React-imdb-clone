import "./index.css";
import "./App.css";
import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";
import Watchlist from "./Components/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./Components/Banner";
import React, { useEffect, useState } from "react";

function App() {
  let [watchlist, setwatchlist] = useState([]);

  let handleAddtoWatchlist = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    localStorage.setItem("movieApp", JSON.stringify(newWatchList));
    setwatchlist(newWatchList);
    console.log(newWatchList);
  };
  let handleremovefromwatchlist = (movieObj) => {
    let filteredwatchlist = watchlist.filter((movie) => {
      return movie.id != movieObj.id;
    });
    setwatchlist(filteredwatchlist);
    localStorage.setItem("movieApp", JSON.stringify(filteredwatchlist));
    console.log(filteredwatchlist);
  };
  useEffect(() => {
    let moviesfromlocalStorage = localStorage.getItem("movieApp");
    if (moviesfromlocalStorage) {
      try {
        setwatchlist(JSON.parse(moviesfromlocalStorage));
      } catch (error) {
        console.error("Failed to parse watchlist from localStorage", error);
      }
    }
  }, []); // ✅ Empty array means run only once on mount

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  watchlist={watchlist}
                  handleAddtoWatchlist={handleAddtoWatchlist}
                  handleremovefromwatchlist={handleremovefromwatchlist}
                />
              </>
            }
          />
          <Route
            path="Watchlist"
            element={
              <Watchlist
                watchlist={watchlist}
                setwatchlist={setwatchlist}
                handleremovefromwatchlist={handleremovefromwatchlist}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
