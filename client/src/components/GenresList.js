import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchGenres, addGenre } from './thunks/genresThunk';
import { fetchGenres, addGenre } from '../thunks/genresThunks';

const GenresList = () => {
  const dispatch = useDispatch();
  const { genres, loading, error } = useSelector((state) => state.genres);
  const [genreData, setGenreData] = useState({ name: '', description: '' });

  // Fetch genres on mount
  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGenreData({ ...genreData, [name]: value });
  };

  const handleAddGenre = (e) => {
    e.preventDefault();
    dispatch(addGenre(genreData));
    setGenreData({ name: '', description: '' });
  };

  return (
    <div>
      <h1>Genres</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>

      <h2>Add Genre</h2>
      <form onSubmit={handleAddGenre}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={genreData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={genreData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Genre'}
        </button>
      </form>
    </div>
  );
};

export default GenresList;