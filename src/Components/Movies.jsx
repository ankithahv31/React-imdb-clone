import React, { useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCard';
import axios from 'axios';
import Pagenation from './Pagenation';

function Movies({ handleAddtoWatchlist, handleremovefromwatchlist, watchlist }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(true);      // ✅ Loading state
  const [error, setError] = useState(null);          // ✅ Error state

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=kn&sort_by=popularity.desc&page=${pageNo}`
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch(() => {
        setError("Something went wrong while fetching movies.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pageNo]);

  return (
    <div className='p-5'>
      <div className='text-2xl m-5 font-bold text-center'>Trending Kannada Movies</div>

      {/* ✅ Fallback UI */}
      {loading ? (
        <div className="text-center text-xl mt-8">Loading movies...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg mt-8">{error}</div>
      ) : (
        <>
          <div className='flex flex-row flex-wrap justify-around gap-8'>
            {movies.map((movieObj) => (
              <MovieCard
                movieObj={movieObj}
                key={movieObj.id}
                poster_path={movieObj.poster_path}
                //  name={movieObj.original_title || movieObj.title}
                handleAddtoWatchlist={handleAddtoWatchlist}
                handleremovefromwatchlist={handleremovefromwatchlist}
                watchlist={watchlist}
              />
            ))}
          </div>

          <Pagenation pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
        </>
      )}
    </div>
  );
}

export default Movies;
