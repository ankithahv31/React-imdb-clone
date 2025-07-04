import React, { useEffect, useState } from "react";
import genreids from "../Utility/genre";

function Watchlist({ watchlist, setwatchlist, handleremovefromwatchlist }) {
  const [search, setsearch] = useState("");
  const [genreList, setgenreList] = useState(["All Genres"]);
  const [currGenre, setcurrGenre] = useState("All Genres");

  const handlesearch = (e) => {
    setsearch(e.target.value);
  };

  const handleFilter = (genre) => {
    setcurrGenre(genre);
  };

  const sortIncreasing = () => {
    const sorted = [...watchlist].sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setwatchlist(sorted);
  };

  const sortDecreasing = () => {
    const sorted = [...watchlist].sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setwatchlist(sorted);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => genreids[movieObj.genre_ids?.[0]]);
    temp = new Set(temp);
    temp.delete(undefined); // remove undefined values if any
    setgenreList(["All Genres", ...temp]);
    console.log(temp);
  }, [watchlist]);

  return (
    <>
      <div className="flex justify-center flex-wrap m-4 ">
        {genreList.map((genre, index) => {
          return (
            <div
              key={index}
              onClick={() => handleFilter(genre)}
              className={
                currGenre === genre
                  ? "flex justify-center items-center h-[3rem] w-[9rem] rounded-xl text-white font-bold bg-blue-400 mx-4"
                  : "flex justify-center items-center h-[3rem] w-[9rem] rounded-xl text-white font-bold bg-gray-400 mx-4"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center my-4">
        <input
          onChange={handlesearch}
          value={search}
          type="text"
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
        />
      </div>

      <div className="overflow-hidden rounded=lg border border-gray-200 m-8">
        <table className="w-full text-center text-gray-500">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center">
                <div onClick={sortIncreasing} className="p-2 cursor-pointer">
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div className="p-2">Ratings</div>
                <div onClick={sortDecreasing} className="p-2 cursor-pointer">
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchlist
              .filter((movieObj) => {
                if (currGenre === "All Genres") {
                  return true;
                } else {
                  return genreids[movieObj.genre_ids?.[0]] === currGenre;
                }
              })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movieObj, index) => {
                return (
                  <tr className="border-b-2" key={movieObj.id || index}>
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[6rem] w-[10rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        alt="movie poster"
                      />
                      <div className="mx-10">{movieObj.title}</div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids?.[0]]}</td>
                    <td
                      onClick={() => handleremovefromwatchlist(movieObj)}
                      className="text-red-800 cursor-pointer"
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
