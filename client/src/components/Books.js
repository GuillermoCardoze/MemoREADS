import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook } from '../slices/userSlice';
import NewBookForm from './NewBookForm';
import { Link } from 'react-router-dom';

const Books = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.users); // Access user object from Redux store
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  useEffect(() => {
    if (!user.books || user.books.length === 0) {
      dispatch(fetchBooks()); // Fetch books if they are not loaded
    }
  }, [dispatch, user.books]);

  const handleDelete = (id) => {
    dispatch(deleteBook(id)); // Delete a book by its ID
  };

  const toggleUnreadFilter = () => {
    setShowUnreadOnly((prev) => !prev);
  };

  // Filter books based on unread state
  const filteredBooks = showUnreadOnly
    ? user.books.filter((book) => book.rating === 0)
    : user.books;

  return (
    <div>
      <h2>Books</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {/* New Book Form */}
      <NewBookForm />

      


      {/* Button to toggle unread books filter */}
      <button onClick={toggleUnreadFilter}>
        {showUnreadOnly ? 'Show All Books' : 'Show Unread Books'}
      </button>
      <br></br>
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
        {filteredBooks.length === 0 ? (
          <p>No books available.</p>
        ) : (
          filteredBooks.map((book) => {
            const { author, genre } = book; // Assuming book has 'author' and 'genre' properties
            return (
              <div key={book.id}>
                <h3>{book.title}</h3>
                <p>
                  Rating: {book.rating === 0 ? 'Not Rated' : book.rating}
                  <Link to={`/ratings/${book.id}`}>
                    <button>Update Rating</button>
                  </Link>
                </p>
                
                {/* Display author and genre */}
                <p>Author: {author ? author.name : 'Unknown'}</p>
                <p>Genre: {genre ? genre.name : 'Unknown'}</p>
                
                {/* Delete button */}
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Books;
