import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateBook } from '../slices/userSlice'; 

const Ratings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookId } = useParams(); 
  const { user } = useSelector((state) => state.users); 

  const book = user?.books?.find((b) => b.id === parseInt(bookId));

  const [rating, setRating] = useState(book?.rating || 0); 
  const [title, setTitle] = useState(book?.title || ''); 

  useEffect(() => {
    if (book) {
      setTitle(book.title); 
      setRating(book.rating); 
    }
  }, [book]);

  const handleRatingChange = (e) => {
    setRating(e.target.value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedRating = parseInt(rating, 10); // Convert the rating to an integer
    if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
      alert("Rating must be between 0 and 5.");
      return;
    }
  
    // Dispatch the updateBook thunk to update the book rating while keeping the title the same
    dispatch(updateBook({ id: book.id, title, rating: parsedRating }))
      .then(() => {
        navigate('/books'); 
      })
      .catch((error) => {
        console.error('Error updating book rating:', error);
      });
  };
  
  if (!book) {
    return <p>Book not found</p>; 
  }

  return (
    <div>
      <h2>Update Rating for {book.title}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            min="1"
            max="5"
            onChange={handleRatingChange}
          />
        </div>
        <button type="submit">Update Rating</button>
      </form>
    </div>
  );
};

export default Ratings;
