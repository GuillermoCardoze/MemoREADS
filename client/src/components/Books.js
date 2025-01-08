import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook } from '../slices/userSlice';
import NewBookForm from './NewBookForm';
import { Link } from 'react-router-dom';

const Books = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.users); // Access user object from Redux store

  useEffect(() => {
    if (!user.books) {
      dispatch(fetchBooks()); // Fetch books if they are not loaded
    }
  }, [dispatch, user.books]);

  const handleDelete = (id) => {
    dispatch(deleteBook(id)); // Delete a book by its ID
  };

  // Map through user.books to display each book's details
  return (
    <div>
      <h2>Books</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {/* New Book Form */}
      <NewBookForm />

      {/* Link to User Genres */}
      <Link to="/user-genres">
        <button>My Genres</button>
      </Link>
      {/* Link to User Authors */}
      <Link to="/user-authors">
        <button>My Authors</button>
      </Link>
      
      {/* Display books */}
      <div>
        {user.books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          user.books.map((book) => {
            const { id, title, rating, author, genre } = book; // Destructure book data
            return (
              <div key={id}>
                <h3>{title}</h3>
                <p>
                  Rating: {rating === 0 ? 'Not Rated' : rating}
                  <Link to={`/ratings/${id}`}>
                    <button>Update Rating</button>
                  </Link>
                </p>
                
                {/* Display author and genre */}
                <p>Author: {author ? author.name : 'Unknown'}</p>
                <p>Genre: {genre ? genre.name : 'Unknown'}</p>
                
                {/* Delete button */}
                <button onClick={() => handleDelete(id)}>Delete</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Books;
