import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../thunks/usersThunks';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setErrors({ message: 'Both fields are required.' });
      return;
    }
    dispatch(signin(credentials)).then((res) => {
      if (res?.error) {
        setErrors({ message: 'Invalid username or password.' });
      } else {
        navigate(`/${credentials.username}/books-list`);
      }
    });
  };

  return (
    <div>
      <h2>Login</h2>
      {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
