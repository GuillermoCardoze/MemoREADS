import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors } from '../slices/userSlice';
// import { fetchAuthors } from './userSlice';  // Import your async thunk to fetch authors

const Authors = () => {
  const dispatch = useDispatch();
  
  // Access authors state from Redux
  const { authors, loading, error } = useSelector((state) => state.users);

  // Fetch authors data on component mount
  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  // Loading and error handling
  if (loading) return <div>Loading authors...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Authors</h3>
      {authors.length === 0 ? (
        <p>No authors available.</p>
      ) : (
        <ul>
          {authors.map((author) => (
            <li key={author.id}>{author.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Authors;
