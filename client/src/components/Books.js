// Books.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../slices/userSlice';
import NewBookForm from './NewBookForm'; // Import NewBookForm component

const Books = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.users); // Get books, loading, and error from Redux store

  useEffect(() => {
    dispatch(fetchBooks()); // Dispatch fetchBooks action on component mount
  }, [dispatch]);

  return (
    <div>
      <h2>Books</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {/* Display books */}
      <div>
        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          books.map((book) => (
            <div key={book.id}>
              <h3>{book.title}</h3>
              <p>Rating: {book.rating}</p>
              <p>Author: {book.author?.name}</p> {/* Display author's name */}
              <p>Author Description: {book.author?.description}</p> {/* Author description */}
              <p>Genre: {book.genre?.name}</p> {/* Display genre name */}
              <p>Genre Description: {book.genre?.description}</p> {/* Genre description */}
            </div>
          ))
        )}
      </div>

      {/* New Book Form */}
      <NewBookForm />
    </div>
  );
};

export default Books;
