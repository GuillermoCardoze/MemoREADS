// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { addBook } from '../thunks/booksThunks';
// import { addAuthor } from '../thunks/authorsThunks';
// import { addGenre } from '../thunks/genresThunks';
// import { useNavigate } from 'react-router-dom';

// const NewBookForm = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.users);
//   const { loading, error } = useSelector((state) => state.books);
//   const navigate = useNavigate();

//   // Extract authors and genres from user.books
//   const authors = [...new Set(user.books.map((book) => book.author))];
//   const genres = [...new Set(user.books.map((book) => book.genre))];

//   const formik = useFormik({
//     initialValues: {
//       title: '',
//       authorId: '',
//       genreId: '',
//       authorName: '',
//       authorDescription: '',
//       genreName: '',
//       genreDescription: '',
//     },
//     validationSchema: Yup.object({
//       title: Yup.string().required('Book title is required'),
//       authorId: Yup.string().required('Author is required'),
//       genreId: Yup.string().required('Genre is required'),
//       authorName: Yup.string().when('authorId', {
//         is: '',
//         then: Yup.string().required('Author name is required when creating a new author'),
//       }),
//       authorDescription: Yup.string().when('authorId', {
//         is: '',
//         then: Yup.string().required('Author description is required when creating a new author'),
//       }),
//       genreName: Yup.string().when('genreId', {
//         is: '',
//         then: Yup.string().required('Genre name is required when creating a new genre'),
//       }),
//       genreDescription: Yup.string().when('genreId', {
//         is: '',
//         then: Yup.string().required('Genre description is required when creating a new genre'),
//       }),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         let authorResponse;
//         let genreResponse;

//         if (values.authorId) {
//           authorResponse = { id: values.authorId };
//         } else {
//           authorResponse = await dispatch(
//             addAuthor({ name: values.authorName, description: values.authorDescription })
//           );
//         }

//         if (values.genreId) {
//           genreResponse = { id: values.genreId };
//         } else {
//           genreResponse = await dispatch(
//             addGenre({ name: values.genreName, description: values.genreDescription })
//           );
//         }

//         const bookData = {
//           title: values.title,
//           rating: 0,
//           user_id: user.id,
//           author_id: authorResponse.id,
//           genre_id: genreResponse.id,
//         };

//         await dispatch(addBook(bookData)); // Dispatch addBook and update user session
//         resetForm();
//         navigate('/');
//       } catch (err) {
//         console.error('Error adding book:', err.message);
//       }
//     },
//   });

//   return (
//     <div>
//       <h2>Add New Book</h2>
//       <form onSubmit={formik.handleSubmit}>
//         <label>Book Title:</label>
//         <input
//           name="title"
//           onChange={formik.handleChange}
//           value={formik.values.title}
//         />
//         {formik.errors.title && <div>{formik.errors.title}</div>}
//         <br />

//         <label>Author:</label>
//         <select
//           name="authorId"
//           onChange={formik.handleChange}
//           value={formik.values.authorId}
//         >
//           <option value="">Select Author</option>
//           {authors &&
//             authors.map((author, index) => (
//               <option key={`${author.id}-${index}`} value={author.id}>
//                 {author.name}
//               </option>
//             ))}
//         </select>
//         {formik.errors.authorId && <div>{formik.errors.authorId}</div>}
//         <br />

//         {!formik.values.authorId && (
//           <>
//           </>
//         )}

//         <label>Genre:</label>
//         <select
//           name="genreId"
//           onChange={formik.handleChange}
//           value={formik.values.genreId}
//         >
//           <option value="">Select Genre</option>
//           {genres &&
//             genres.map((genre, index) => (
//               <option key={`${genre.id}-${index}`} value={genre.id}>
//                 {genre.name}
//               </option>
//             ))}
//         </select>
//         {formik.errors.genreId && <div>{formik.errors.genreId}</div>}
//         <br />

//         {!formik.values.genreId && (
//           <>
//           </>
//         )}

//         <button type="submit" disabled={loading}>
//           {loading ? 'Adding...' : 'Add Book'}
//         </button>
//       </form>
//       {error && <div style={{ color: 'red' }}>Error: {error}</div>}
//     </div>
//   );
// };

// export default NewBookForm;
