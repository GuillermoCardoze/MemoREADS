import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, addBook, updateBook, deleteBook } from '../thunks/booksThunks';

const BooksList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks()); // Fetch books on component mount
  }, [dispatch]);

  const handleAddBook = () => {
    const newBook = {
      title: 'New Book',
      rating: 4,
      author_id: 1,
      genre_id: 1,
      user_id: 1,
    };
    dispatch(addBook(newBook)); // Add a new book
  };

  const handleUpdateBook = (id) => {
    const updatedData = { title: 'Updated Book' };
    dispatch(updateBook(id, updatedData)); // Update the book by id
  };

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id)); // Delete the book by id
  };

  return (
    <div>
      <h1>Books List</h1>
      <button onClick={handleAddBook}>Add Book</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} - {book.rating}
            <button onClick={() => handleUpdateBook(book.id)}>Update</button>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;