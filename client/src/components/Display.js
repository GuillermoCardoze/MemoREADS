import React from 'react';
import { useSelector } from 'react-redux';

const Display = () => {
  const booksState = useSelector((state) => state.books);
  const authorsState = useSelector((state) => state.authors);
  const genresState = useSelector((state) => state.genres);
  const { user } = useSelector((state) => state.users);

  if (!user) {
    return <p>Please log in to see your books.</p>;
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
    };
  });

  return (
    <div>
      <h2>Your Books</h2>
      {booksWithDetails.length === 0 ? (
        <p>You have no books yet.</p>
      ) : (
        <ul>
          {booksWithDetails.map((book) => (
            <li key={book.id}>
              <strong>Title:</strong> {book.title} <br />
              <strong>Rating:</strong> {book.rating} <br />
              <strong>Author:</strong> {book.authorName} <br />
              <strong>Author Description:</strong> {book.authorDescription} <br />
              <strong>Genre:</strong> {book.genreName} <br />
              <strong>Genre Description:</strong> {book.genreDescription} <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Display;
