// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchAuthors, deleteAuthor } from "../thunks/authorsThunks";

// const AuthorsList = () => {
//   const { authors, loading, error } = useSelector((state) => state.authors);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchAuthors());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     dispatch(deleteAuthor(id));
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h1>Authors</h1>
//       <ul>
//         {authors.map((author) => (
//           <li key={author.id}>
//             {author.name} - {author.description}
//             <button onClick={() => handleDelete(author.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AuthorsList;
