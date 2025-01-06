// Authors.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors } from '../slices/userSlice'; // Import the necessary actions
import NewAuthorForm from './NewAuthorForm';

const Authors = () => {
  const dispatch = useDispatch();
  const { authors, loading, error } = useSelector((state) => state.users); // Access authors from state

  useEffect(() => {
    dispatch(fetchAuthors()); // Fetch authors when component mounts
  }, [dispatch]);

//   const handleDelete = (id) => {
//     dispatch(deleteAuthor(id)); // Handle delete action
//   };

  return (
    <div>
      <h1>Authors</h1>
      <NewAuthorForm />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            
            <span>
                Author Name: {author.description}
                <br></br>
                Author Description: {author.name}
                <br></br>
                <br></br>
            </span>
            {/* <button onClick={() => handleDelete(author.id)}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Authors;
