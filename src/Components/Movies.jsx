import React, { useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCard';
import axios from 'axios';
import Pagenation from './Pagenation';

function Movies({ handleAddtoWatchlist, handleremovefromwatchlist, watchlist }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

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
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=kn&sort_by=popularity.desc&page=${pageNo}`
      )
      .then(function (res) {
        setMovies(res.data.results);
      });
  }, [pageNo]);

  return (
    <div className='p-5'>
      <div className='text-2xl m-5 font-bold text-center'>Trending Kannada Movies</div>

      <div className='flex flex-row flex-wrap justify-around gap-8'>
        {movies.map((movieObj) => (
          <MovieCard
            movieObj={movieObj}
            key={movieObj.id}
            poster_path={movieObj.poster_path}
            name={movieObj.original_title || movieObj.title}
            handleAddtoWatchlist={handleAddtoWatchlist}
            handleremovefromwatchlist={handleremovefromwatchlist}
            watchlist={watchlist}
          />
        ))}
      </div>

      <Pagenation pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  );
}

export default Movies;
