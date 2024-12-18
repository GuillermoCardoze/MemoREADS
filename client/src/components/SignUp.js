import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../thunks/usersThunks';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setError('Both fields are required.');
      return;
    }
    dispatch(signup(credentials)).then((res) => {
      if (res?.error) {
        setError('Signup failed.');
      } else {
        navigate(`/${credentials.username}/books-list`);
      }
    });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
