import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession } from '../thunks/usersThunks';
import NavBar from './NavBar';
import Display from './Display';
import NewBookForm from './NewBookForm';
import Login from './Login';
import Logout from './Logout';
import SignUp from './SignUp';
import Rating from './Ratings';
import Genres from './Genres';
import NewGenreForm from './NewGenreForm';

const App = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <NavBar user={user} />
        {loading && <p>Loading...</p>}
        <Routes>
        <Route path="/rating/:id" element={<Rating />} />
          {/* Route for login */}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to={`/${user.username}/books-list`} />}
          />
          {/* Route for sign-up */}
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to={`/${user.username}/books-list`} />}
          />
          {/* Route for the user's books list */}
          <Route
            path="/:username/books-list"
            element={user ? <Display /> : <Navigate to="/login" />}
          />
          {/* Route for the new book form */}
          <Route
            path="/add-book"
            element={user ? <NewBookForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/genres"
            element={user ? <Genres /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-genre"
            element={user ? <NewGenreForm /> : <Navigate to="/login" />}
          />

          {/* Redirect all unknown routes */}
          <Route 
            path="/logout" 
            element={user ? <Logout /> : <Navigate to="/login" />}
            />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;