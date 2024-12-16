import React, { useState } from 'react';

const Login = ({ handleSignin, closeLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = 'Username is required.';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSignin({ username, password });
      closeLogin(); // Close the login form after successful validation
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={closeLogin}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Login;
