import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
// import { deleteBook } from '../redux/actions'; // Make sure to import the deleteBook action
import { deleteBook } from '../thunks/booksThunks';

const Display = () => {
  const { username } = useParams(); // Extract username from the URL
  const booksState = useSelector((state) => state.books);
  const authorsState = useSelector((state) => state.authors);
  const genresState = useSelector((state) => state.genres);
  const { user } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllBooks, setShowAllBooks] = useState(true); // Toggle state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirect if the logged-in user's username doesn't match the one in the route
  if (!user || user.username !== username) {
    return <Navigate to="/login" replace />;
  }

  if (booksState.loading || authorsState.loading || genresState.loading) {
    return <p>Loading...</p>;
  }

  if (booksState.error) return <p>Error fetching books: {booksState.error}</p>;
  if (authorsState.error) return <p>Error fetching authors: {authorsState.error}</p>;
  if (genresState.error) return <p>Error fetching genres: {genresState.error}</p>;

  // Filter books belonging to the current user
  const userBooks = booksState.books.filter((book) => book.user_id === user.id);

  // Map userBooks to include additional data from authors and genres
  const booksWithDetails = userBooks.map((book) => {
    const author = authorsState.authors.find((author) => author.id === book.author_id);
    const genre = genresState.genres.find((genre) => genre.id === book.genre_id);

    return {
      ...book,
      authorName: author?.name || 'Unknown',
      authorDescription: author?.description || 'No description available',
      genreName: genre?.name || 'Unknown',
      genreDescription: genre?.description || 'No description available',
      formattedRating: book.rating === 0 ? 'Not Read' : book.rating, // Format rating here
    };
  });

  // Filter books based on the toggle state and search term
  const filteredBooks = booksWithDetails.filter((book) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(search) ||
      book.authorName.toLowerCase().includes(search) ||
      book.genreName.toLowerCase().includes(search);

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
              <strong>Rating:</strong> {book.formattedRating}{' '}
              <button
                onClick={() => navigate(`/rating/${book.id}`)}
                style={{ marginLeft: '10px' }}
              >
                Update Rating
              </button>
              <br />
              <strong>Author:</strong> {book.authorName} <br />
              <strong>Author Description:</strong> {book.authorDescription} <br />
              <strong>Genre:</strong> {book.genreName} <br />
              <strong>Genre Description:</strong> {book.genreDescription} <br />
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(book.id)}
                style={{ marginTop: '10px', color: 'red' }}
              >
                Delete Book
              </button>
              <br />
              <br></br>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Display;
