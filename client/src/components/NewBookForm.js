import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../thunks/booksThunks';
import { addAuthor } from '../thunks/authorsThunks';
import { addGenre } from '../thunks/genresThunks';
import { useNavigate } from 'react-router-dom';
import { updateUserBooks } from '../actions/usersActions';

const NewBookForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { loading, error } = useSelector((state) => state.books);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      authorName: '',
      authorDescription: '',
      genreName: '',
      genreDescription: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Book title is required'),
      authorName: Yup.string().required('Author name is required'),
      authorDescription: Yup.string().required('Author description is required'),
      genreName: Yup.string().required('Genre name is required'),
      genreDescription: Yup.string().required('Genre description is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const authorResponse = await dispatch(
          addAuthor({ name: values.authorName, description: values.authorDescription })
        );

        const genreResponse = await dispatch(
          addGenre({ name: values.genreName, description: values.genreDescription })
        );

        const bookData = {
          title: values.title,
          rating: 0,
          user_id: user.id,
          author_id: authorResponse.id,
          genre_id: genreResponse.id,
        };
    
        const bookResponse = await dispatch(addBook(bookData));

        // Prepare the full book object with related details
    const newBook = {
      ...bookResponse, // Assume addBook returns the newly created book
      author: { id: authorResponse.id, ...authorResponse },
      genre: { id: genreResponse.id, ...genreResponse },
    };

        // Step 4: Dispatch addBook
        // Dispatch action to update user state
      dispatch(updateUserBooks(newBook));        
      resetForm();
      } catch (err) {
        console.error('Error adding book:', err.message);
      }
      navigate('/');
    },
  });

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Book Title */}
        <label>Book Title:</label>
        <input name="title" onChange={formik.handleChange} value={formik.values.title} />
        {formik.errors.title && <div>{formik.errors.title}</div>}

        {/* Author Name */}
        <label>Author Name:</label>
        <input
          name="authorName"
          onChange={formik.handleChange}
          value={formik.values.authorName}
        />
        {formik.errors.authorName && <div>{formik.errors.authorName}</div>}

        {/* Author Description */}
        <label>Author Description:</label>
        <input
          name="authorDescription"
          onChange={formik.handleChange}
          value={formik.values.authorDescription}
        />
        {formik.errors.authorDescription && <div>{formik.errors.authorDescription}</div>}

        {/* Genre Name */}
        <label>Genre Name:</label>
        <input
          name="genreName"
          onChange={formik.handleChange}
          value={formik.values.genreName}
        />
        {formik.errors.genreName && <div>{formik.errors.genreName}</div>}

        {/* Genre Description */}
        <label>Genre Description:</label>
        <input
          name="genreDescription"
          onChange={formik.handleChange}
          value={formik.values.genreDescription}
        />
        {formik.errors.genreDescription && <div>{formik.errors.genreDescription}</div>}

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </form>

      {/* Error Message */}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
};

export default NewBookForm;