import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors, addAuthor } from '../thunks/authorsThunks';


const AuthorsList = () => {
  const dispatch = useDispatch();
  const { authors, loading, error } = useSelector((state) => state.authors);
  const [authorData, setAuthorData] = useState({ name: '', description: '' });

  // Fetch authors on mount
  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthorData({ ...authorData, [name]: value });
  };

  const handleAddAuthor = (e) => {
    e.preventDefault();
    dispatch(addAuthor(authorData));
    setAuthorData({ name: '', description: '' });
  };

  return (
    <div>
      <h1>Authors</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {authors.map((author) => (
          <li key={author.id}>{author.name}</li>
        ))}
      </ul>

      <h2>Add Author</h2>
      <form onSubmit={handleAddAuthor}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={authorData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={authorData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Author'}
        </button>
      </form>
    </div>
  );
};

export default AuthorsList;
