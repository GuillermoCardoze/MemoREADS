import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors } from '../slices/userSlice'; 
import NewAuthorForm from './NewAuthorForm';


const Authors = () => {
  const dispatch = useDispatch();
  const { authors, loading, error } = useSelector((state) => state.users); // Access authors from state

  useEffect(() => {
    dispatch(fetchAuthors()); // Fetch authors when component mounts
  }, [dispatch]);


  return (
    <div>
      <h2>All Authors</h2>
      <NewAuthorForm />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            
            <span>
                Author Name: {author.name}
                <br></br>
                Author Description: {author.description}
                <br></br>
                <br></br>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Authors;
