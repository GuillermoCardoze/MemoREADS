import React from 'react';
import { useDispatch } from 'react-redux';
import { postGenre } from '../slices/userSlice'; // The action to post genre
import { useFormik } from 'formik';
import * as Yup from 'yup';

const NewGenreForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required('Genre name is required'),
    description: Yup.string().required('Genre description is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const resultAction = await dispatch(postGenre(values));

        if (resultAction.type === 'users/postGenre/fulfilled') {
          resetForm(); 
        } else {
          console.error('Failed to add genre');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <div>
      <h2>Add New Genre</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Genre Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div>{formik.errors.name}</div>
          )}
        </div>

        <div>
          <label htmlFor="description">Genre Description</label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <div>{formik.errors.description}</div>
          )}
        </div>

        <button type="submit">Add Genre</button>
      </form>
    </div>
  );
};

export default NewGenreForm;
