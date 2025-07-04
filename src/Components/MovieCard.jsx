import React from "react";

function MovieCard({
  movieObj,
  poster_path,
  name,
  handleAddtoWatchlist,
 handleremovefromwatchlist,
  watchlist,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }
  return (
    <div
      onClick={() => handleAddtoWatchlist(movieObj)}
      className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl flex flex-col hover:scale-110 hover:cursor-pointer flex-col justify-between items-end "
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div onClick={(e) => {  e.stopPropagation(); handleremovefromwatchlist(movieObj)} }
        className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60">&#10060; </div>
      ) : (
        <div
          onClick={() => handleAddtoWatchlist(movieObj)}
          className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
        >
          &#128525;
        </div>
      )}

      <div className="text-2xl text-white w-full p-2 text-center bg-gray-900/60">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
