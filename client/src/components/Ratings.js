import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateBook } from '../slices/userSlice'; // Assuming the thunk is named updateBook

const Ratings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookId } = useParams(); // Get bookId from the URL params
  const { books } = useSelector((state) => state.users); // Get books from Redux state

  const [rating, setRating] = useState(0); // Local state for rating
  const [title, setTitle] = useState(''); // Local state for book title

  // Find the book by ID from the Redux state
  const book = books.find((b) => b.id === parseInt(bookId));

  useEffect(() => {
    if (book) {
      setTitle(book.title); // Set the book title
      setRating(book.rating); // Set the initial rating to the current rating of the book
    }
  }, [book]);

  const handleRatingChange = (e) => {
    setRating(e.target.value); // Update rating state when input changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert rating to an integer before dispatching
    const parsedRating = parseInt(rating, 10); // Convert the rating to an integer
    if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
      alert("Rating must be between 0 and 5.");
      return;
    }
  
    // Dispatch the updateBook thunk to update the book rating while keeping the title the same
    dispatch(updateBook({ id: book.id, title, rating: parsedRating }))
      .then(() => {
        navigate('/books'); // Redirect to the Books page after successful update
      })
      .catch((error) => {
        console.error('Error updating book rating:', error);
      });
  };
  
  if (!book) {
    return <p>Book not found</p>; // Show error if book is not found
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













// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// // import { updateBookRating } from '../actions/usersActions';
// import { updateRating } from '../thunks/usersThunks';

// const Rating = () => {
//   const { id } = useParams(); // Extract book ID from the URL
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.users);

//   // Find the book in the user's books
//   const book = user?.books?.find((b) => b.id === parseInt(id));
//   const [rating, setRating] = useState(book?.rating || 0);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (book) {
//       dispatch(updateRating(book.id, parseInt(rating, 10))); // Dispatch the rating update
//       navigate(-1); // Go back to the previous page
//     }
//   };

//   if (!book) return <p>Book not found</p>;

//   return (
//     <div>
//       <h2>Update Rating for "{book.title}"</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Rating (1-5):</label>
//         <input
//           type="number"
//           min="1"
//           max="5"
//           value={rating}
//           onChange={(e) => setRating(e.target.value)}
//         />
//         <button type="submit">Update Rating</button>
//       </form>
//     </div>
//   );
// };

// export default Rating;
