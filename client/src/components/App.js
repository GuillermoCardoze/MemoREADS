import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../thunks/booksThunks';
import { fetchAuthors } from '../thunks/authorsThunks';
import { fetchGenres } from '../thunks/genresThunks';
import { checkSession, signin, signup, logout } from '../thunks/usersThunks';
import NavBar from './NavBar';
import Display from './Display';
import NewBookForm from './NewBookForm';

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
    <Router>
      <div>
        <NavBar
          user={user}
          handleLogout={handleLogout}
          handleSignin={handleSignin}
          handleSignup={handleSignup}
        />
        {loading && <p>Loading...</p>}

        {/* Conditionally render Display only if the user is logged in */}
        <Routes>
          {/* Route for Display, only accessible if user is logged in */}
          <Route 
            path="/" 
            element={user ? <Display /> : <p>Please log in or sign up to access your books.</p>} 
          />
          
          {/* Route for NewBookForm, only accessible when logged in */}
          <Route 
            path="/new-book-form" 
            element={user ? <NewBookForm /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
