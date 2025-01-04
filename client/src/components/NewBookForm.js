// components/NewBookForm.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postBook } from '../slices/userSlice';
// import { postBook } from '../features/userSlice'; // Assuming postBook is already defined in userSlice
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Assuming you fetch authors and genres from your API
const NewBookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  // Fetch authors and genres for the dropdowns (optional: could be passed as props)
  useEffect(() => {
    const fetchOptions = async () => {
      // Fetch authors and genres
      const authorsRes = await fetch('/authors');
      const authorsData = await authorsRes.json();
      setAuthors(authorsData);

      const genresRes = await fetch('/genres');
      const genresData = await genresRes.json();
      setGenres(genresData);
    };

    fetchOptions();
  }, []);

  // Formik validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').max(255, 'Title cannot exceed 255 characters'),
    rating: Yup.number()
      .nullable()
      .min(0, 'Rating must be between 0 and 5')
      .max(5, 'Rating must be between 0 and 5')
      .typeError('Rating must be a number'),
    author_id: Yup.number().required('Author is required').positive('Author must be selected').integer(),
    genre_id: Yup.number().required('Genre is required').positive('Genre must be selected').integer(),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Dispatch the postBook action with form data
      await dispatch(postBook(values)).unwrap();
      // Navigate to the book list or another page after submission
      navigate('/books'); // Or wherever you want to go
    } catch (error) {
      console.error('Failed to post book:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Add New Book</h1>
      <Formik
        initialValues={{
          title: '',
          rating: '',
          author_id: '',
          genre_id: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="title">Title</label>
              <Field type="text" id="title" name="title" />
              <ErrorMessage name="title" component="div" />
            </div>

            <div>
              <label htmlFor="rating">Rating (0-5)</label>
              <Field type="number" id="rating" name="rating" />
              <ErrorMessage name="rating" component="div" />
            </div>

            <div>
              <label htmlFor="author_id">Author</label>
              <Field as="select" id="author_id" name="author_id">
                <option value="">Select an Author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name} {/* Assuming author object has 'id' and 'name' */}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="author_id" component="div" />
            </div>

            <div>
              <label htmlFor="genre_id">Genre</label>
              <Field as="select" id="genre_id" name="genre_id">
                <option value="">Select a Genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name} {/* Assuming genre object has 'id' and 'name' */}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="genre_id" component="div" />
            </div>

            <div>
              <button type="submit" disabled={isSubmitting}>
                Add Book
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewBookForm;
