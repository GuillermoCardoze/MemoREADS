import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../thunks/booksThunks';
import { fetchAuthors } from '../thunks/authorsThunks';
import { fetchGenres } from '../thunks/genresThunks';
import { checkSession, signin, signup, logout } from '../thunks/usersThunks';
import NavBar from './NavBar';
import Display from './Display';

const App = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchAuthors());
    dispatch(fetchGenres());
    dispatch(checkSession());
  }, [dispatch]);

  const handleSignin = (credentials) => {
    dispatch(signin(credentials));
  };

  const handleSignup = (credentials) => {
    dispatch(signup(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <NavBar
        user={user}
        handleLogout={handleLogout}
        handleSignin={handleSignin}
        handleSignup={handleSignup}
      />
      {loading && <p>Loading...</p>}
      {user ? (
        <Display />
      ) : (
        <p>Please log in or sign up to access your books.</p>
      )}
    </div>
  );
};

export default App;
