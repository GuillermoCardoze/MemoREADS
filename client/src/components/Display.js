import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
// import { fetchBooks } from './userSlice';  // Import your async thunk to fetch books

const Books = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Access books state from Redux
  const { books, loading, error } = useSelector((state) => state.users);

  // Fetch books data on component mount
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Loading and error handling
  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Books</h3>
      <button onClick={() => navigate('/add-book')}>Add New Book</button>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Books;
