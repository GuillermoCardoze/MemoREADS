import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGenres } from '../thunks/genresThunks';
import { useNavigate } from 'react-router-dom';

const Genres = () => {
  const { user, loading, error } = useSelector((state) => state.users); // Access user from Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGenres()); // Fetch genres when the component mounts
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user || !user.books || user.books.length === 0) {
    return <p>No books available.</p>;
  }

  // Display genres from books
  const genresFromBooks = user.books.map((book, index) => (
    <li key={index}>
      <strong>Genre Name:</strong> {book.genre?.name || 'Unknown'} <br />
      <strong>Genre Description:</strong> {book.genre?.description || 'N/A'} <br />
    </li>
  ));

  return (
    <div>
      <h2>Genres from Books</h2>
      <button onClick={() => navigate('/add-genre')}>Add Genre</button>

      <ul>{genresFromBooks}</ul>
    </div>
  );
};

export default Genres;
