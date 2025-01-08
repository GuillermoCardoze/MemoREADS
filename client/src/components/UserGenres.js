// src/components/UserGenres.js

import React from 'react';
import { useSelector } from 'react-redux';

const UserGenres = () => {
  const { user } = useSelector((state) => state.users); // Access user object from Redux store

  return (
    <div>
      <h2>My Genres</h2>
      {user.genres && user.genres.length > 0 ? (
        user.genres.map((genre) => (
          <div key={genre.id}>
            <h4>{genre.name}</h4>
            <p>{genre.description}</p>
          </div>
        ))
      ) : (
        <p>No genres available.</p>
      )}
    </div>
  );
};

export default UserGenres;
