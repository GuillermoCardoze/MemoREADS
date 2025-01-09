// Genres.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres } from '../slices/userSlice'; 
import NewGenreForm from './NewGenreForm'; 


const Genres = () => {
  const dispatch = useDispatch();
  const { genres, loading, error } = useSelector((state) => state.users); // Access genres from Redux store

  // Fetch genres when the component is mounted
  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <div>
      <h2>All Genres</h2>
      <NewGenreForm /> {/* Display the new genre form */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            <span>
              Genre Name: {genre.name}
              <br />
              Genre Description: {genre.description}
              <br />
              <br />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genres;
