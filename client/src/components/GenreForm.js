import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { addGenre, updateGenre, deleteGenre } from './genreActions';
import { addGenre, updateGenre, deleteGenre } from '../thunks/genresThunks';

const GenreForm = ({ genre = null, mode = 'add', onSuccess }) => {
  const dispatch = useDispatch();

  // Initialize state for form fields
  const [name, setName] = useState(genre ? genre.name : '');
  const [description, setDescription] = useState(genre ? genre.description : '');

  // Handlers for Add, Edit, and Delete
  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === 'add') {
      // Dispatch add action
      const newGenre = { name, description };
      dispatch(addGenre(newGenre)).then(() => onSuccess && onSuccess());
    } else if (mode === 'edit') {
      // Dispatch update action
      const updatedGenre = { name, description };
      dispatch(updateGenre(genre.id, updatedGenre)).then(() => onSuccess && onSuccess());
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this genre?')) {
      dispatch(deleteGenre(genre.id)).then(() => onSuccess && onSuccess());
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{mode === 'add' ? 'Add Genre' : 'Edit Genre'}</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Genre Name"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Genre Description"
          required
        />
        <button type="submit">{mode === 'add' ? 'Add Genre' : 'Update Genre'}</button>
      </form>
      {mode === 'edit' && (
        <button onClick={handleDelete} style={{ color: 'red' }}>
          Delete Genre
        </button>
      )}
    </div>
  );
};

export default GenreForm;
