import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { deleteBook } from '../thunks/usersThunks';

const Display = () => {
  const { username } = useParams(); // Extract username from the URL
  const { user, loading, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllBooks, setShowAllBooks] = useState(true); // Toggle state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirect if the logged-in user's username doesn't match the one in the route
  if (!user || user.username !== username) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching user data: {error}</p>;
  }

  // Filter books based on the toggle state and search term
  const filteredBooks = user.books.filter((book) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(search) ||
      book.author?.name?.toLowerCase().includes(search) ||
      book.genre?.name?.toLowerCase().includes(search);

    // Show all books or only "Not Read" books based on toggle
    return showAllBooks ? matchesSearch : matchesSearch && book.rating === 0;
  });

  // Handle book deletion
  const handleDelete = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      dispatch(deleteBook(bookId)); // Dispatch the deleteBook action
    }
  };

  return (
    <div>
      <h2>{username}'s Books</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title, author, or genre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '50%' }}
      />
      {/* Toggle Button */}
      <button
        onClick={() => setShowAllBooks((prev) => !prev)}
        style={{ marginBottom: '50px', padding: '5px', width: '50%' }}
      >
        {showAllBooks ? 'Show Not Read Books' : 'Show All Books'}
      </button>

      {filteredBooks.length === 0 ? (
        <p>{showAllBooks ? 'No books found.' : 'No unread books found.'}</p>
      ) : (
        <ul>
          {filteredBooks.map((book) => (
            <li key={book.id}>
              <strong>Title:</strong> {book.title} <br />
              <strong>Rating:</strong> {book.rating === 0 ? 'Not Read' : book.rating}{' '}
              <button
                onClick={() => navigate(`/rating/${book.id}`)}
                style={{ marginLeft: '10px' }}
              >
                Update Rating
              </button>
              <br />
              <strong>Author:</strong> {book.author?.name || 'Unknown'} <br />
              <strong>Author Description:</strong> {book.author?.description || 'N/A'} <br />
              <strong>Genre:</strong> {book.genre?.name || 'Unknown'} <br />
              <strong>Genre Description:</strong> {book.genre?.description || 'N/A'} <br />
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(book.id)}
                style={{ marginTop: '10px', color: 'red' }}
              >
                Delete Book
              </button>
              <br />
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Display;
