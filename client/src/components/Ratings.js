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
