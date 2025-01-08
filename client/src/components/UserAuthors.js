// src/components/UserAuthors.js

import React from 'react';
import { useSelector } from 'react-redux';

const UserAuthors = () => {
  const { user } = useSelector((state) => state.users); // Access user object from Redux store

  return (
    <div>
      <h2>My Authors</h2>
      {user.authors && user.authors.length > 0 ? (
        user.authors.map((author) => (
          <div key={author.id}>
            <h4>{author.name}</h4>
            <p>{author.description}</p>
          </div>
        ))
      ) : (
        <p>No authors available.</p>
      )}
    </div>
  );
};

export default UserAuthors;
