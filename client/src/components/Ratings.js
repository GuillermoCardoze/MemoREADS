import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook } from '../thunks/booksThunks';

const Rating = () => {
  const { id } = useParams(); // Extract book ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const booksState = useSelector((state) => state.books);

  // Get the book details for the given ID
  const book = booksState.books.find((b) => b.id === parseInt(id));
  const [rating, setRating] = useState(book?.rating || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateBook(id, { rating: parseInt(rating, 10) }));
      navigate(-1); // Go back to the previous page
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  if (!book) return <p>Book not found</p>;

  return (
    <div>
      <h2>Update Rating for "{book.title}"</h2>
      <form onSubmit={handleSubmit}>
        <label>Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button type="submit">Update Rating</button>
      </form>
    </div>
  );
};

export default Rating;
