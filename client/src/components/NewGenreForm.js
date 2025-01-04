// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { addGenre } from "../thunks/genresThunks";

// const NewGenreForm = () => {
//   const dispatch = useDispatch();

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       description: "",
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required("Genre name is required"),
//       description: Yup.string().required("Genre description is required"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         await dispatch(addGenre(values)); // Add new genre
//         resetForm(); // Reset form fields
//       } catch (err) {
//         console.error("Error adding genre:", err.message);
//       }
//     },
//   });

//   return (
//     <div>
//       <h2>Add New Genre</h2>
//       <form onSubmit={formik.handleSubmit}>
//         <label>Genre Name:</label>
//         <input
//           name="name"
//           onChange={formik.handleChange}
//           value={formik.values.name}
//         />
//         {formik.errors.name && <div>{formik.errors.name}</div>}
//         <br />

//         <label>Genre Description:</label>
//         <textarea
//           name="description"
//           onChange={formik.handleChange}
//           value={formik.values.description}
//         />
//         {formik.errors.description && <div>{formik.errors.description}</div>}
//         <br />

//         <button type="submit">Add Genre</button>
//       </form>
//     </div>
//   );
// };

// export default NewGenreForm;
