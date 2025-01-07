import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook } from '../slices/userSlice';
import NewBookForm from './NewBookForm'; // Import NewBookForm component
import { Link } from 'react-router-dom'; // Import Link for navigation

const Books = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.users); // Get books, loading, and error from Redux store

  useEffect(() => {
    dispatch(fetchBooks()); // Dispatch fetchBooks action on component mount
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBook(id)); // Dispatch deleteBook action with the book ID
  };

  return (
    <div>
      <h2>Books</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {/* New Book Form */}
      <NewBookForm />
      
      {/* Display books */}
      <div>
        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          books.map((book) => (
            <div key={book.id}>
              <h3>{book.title}</h3>
              <p>Rating: {book.rating === 0 ? 'Not Rated' : book.rating}   
              <Link to={`/ratings/${book.id}`}>
                <button>Update Rating</button>
              </Link></p> {/* Display "Not Rated" if rating is 0 */}

              

              <p>Author: {book.author?.name}</p> {/* Display author's name */}
              {/* <p>Author Description: {book.author?.description}</p> Author description */}
              <p>Genre: {book.genre?.name}</p> {/* Display genre name */}
              {/* <p>Genre Description: {book.genre?.description}</p> Genre description */}
              
              
              {/* Delete button */}
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Books;
