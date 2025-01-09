import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { postBook } from '../slices/userSlice';

const NewBookForm = () => {
  const dispatch = useDispatch();
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [authorsResponse, genresResponse] = await Promise.all([
          fetch('/authors'),
          fetch('/genres'),
        ]);

        if (authorsResponse.ok) {
          setAuthors(await authorsResponse.json());
        }

        if (genresResponse.ok) {
          setGenres(await genresResponse.json());
        }
      } catch (error) {
        console.error('Error fetching authors or genres:', error);
      }
    };

    fetchOptions();
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: '',
      authorId: '',
      genreId: '',
    },
    onSubmit: (values) => {
      const bookData = {
        title: values.title,
        rating: 0,
        author_id: values.authorId,
        genre_id: values.genreId,
      };

      dispatch(postBook(bookData));

      formik.resetForm();
    },
  });

  return (
    <div>
      <h3>Add a New Book</h3>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <select
            name="authorId"
            value={formik.values.authorId}
            onChange={formik.handleChange}
            required
          >
            <option value="" disabled>Select an Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Genre:</label>
          <select
            name="genreId"
            value={formik.values.genreId}
            onChange={formik.handleChange}
            required
          >
            <option value="" disabled>Select a Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default NewBookForm;
