import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres } from '../slices/userSlice'; // Redux action to fetch genres
// import { useNavigate } from 'react-router-dom';
import NewGenreForm from './NewGenreForm'; // Import the form

const Genres = () => {
  console.log('Genres component rendered');
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { genres, loading, error } = useSelector((state) => state.users); // Access genres from Redux store
  
  // Fetch genres when the component is mounted
  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(genres)

  return (
    <div>
      <h2>Genres List</h2>
      
      {/* NewGenreForm will be displayed below the genres list */}
      <NewGenreForm />

      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}: {genre.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Genres;
