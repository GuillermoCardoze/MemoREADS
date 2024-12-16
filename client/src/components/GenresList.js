import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres, addGenre, updateGenre, deleteGenre } from '../thunks/genresThunks';

const GenresList = () => {
  const dispatch = useDispatch();
  const { genres, loading, error } = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(fetchGenres()); // Fetch genres on component mount
  }, [dispatch]);

  const handleAddGenre = () => {
    const newGenre = {
      name: 'New Genre',
      description: 'A newly added genre.',
    };
    dispatch(addGenre(newGenre)); // Add a new genre
  };

  const handleUpdateGenre = (id) => {
    const updatedData = { name: 'Updated Genre', description: 'Updated description.' };
    dispatch(updateGenre(id, updatedData)); // Update the genre by id
  };

  const handleDeleteGenre = (id) => {
    dispatch(deleteGenre(id)); // Delete the genre by id
  };

  return (
    <div>
      <h1>Genres List</h1>
      <button onClick={handleAddGenre}>Add Genre</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            {genre.name} - {genre.description}
            <button onClick={() => handleUpdateGenre(genre.id)}>Update</button>
            <button onClick={() => handleDeleteGenre(genre.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenresList;
