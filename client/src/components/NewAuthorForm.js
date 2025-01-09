// NewAuthorForm.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { postAuthor } from '../slices/userSlice'; // Import the postAuthor action

const NewAuthorForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',  
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Name is required';
      }
      if (!values.description) {
        errors.description = 'Description is required';
      }
      return errors;
    },
    onSubmit: (values) => {
      dispatch(postAuthor(values)); 
      formik.resetForm();  
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Add New Author</h2>
      
      {/* Name Field */}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div style={{ color: 'red' }}>{formik.errors.name}</div>
        ) : null}
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description ? (
          <div style={{ color: 'red' }}>{formik.errors.description}</div>
        ) : null}
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={formik.isSubmitting}>
        Add Author
      </button>
    </form>
  );
};

export default NewAuthorForm;
