import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { checkSession } from '../slices/userSlice';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import LoginForm from './LoginForm'; 
import SignupForm from './SignupForm'; 
import Logout from './Logout'; 
import Books from './Books';
import Genres from './Genres';
import Authors from './Authors';
import NavBar from './NavBar';
import NewGenreForm from './NewGenreForm';
import NewBookForm from './NewBookForm';
import Ratings from './Ratings';
import UserAuthors from './UserAuthors';
import UserGenres from './UserGenres';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user); 

  // Dispatch checkSession on app load
  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  // If the user is logged in, they should be redirected to /books, else to /login
  const isLoggedIn = Boolean(user);

  return (
    <Router>
      <NavBar /> 
      <h1>MemoREADS App</h1>
       {/* Display username if logged in */}
       {isLoggedIn && (
        <div>
          <h1>Welcome, {user.username}!</h1>
        </div>
      )}
      <Routes>
        {/* Redirect to /books if logged in, else to /login */}
        {/* <Route path="/" element={isLoggedIn ? <Navigate to="/books" /> : <Navigate to="/login" />} /> */}

        {/* Routes for logged in users */}
        <Route path="/books" element={isLoggedIn ? <Books /> : <Navigate to="/login" />} />
        <Route path="/add-book" element={isLoggedIn ? <NewBookForm /> : <Navigate to="/login" />} />
        <Route path="/ratings/:bookId" element={isLoggedIn ? <Ratings /> : <Navigate to="/login" />} />
        <Route path="/genres" element={isLoggedIn ? <Genres /> : <Navigate to="/login" />} />
        <Route path="/add-genre" element={isLoggedIn ? <NewGenreForm /> : <Navigate to="/login" />} />
        <Route path="/user-genres" element={isLoggedIn ? <UserGenres /> : <Navigate to="/login" />} />
        <Route path="/authors" element={isLoggedIn ? <Authors /> : <Navigate to="/login" />} />
        <Route path="/user-authors" element={isLoggedIn ? <UserAuthors /> : <Navigate to="/login" />} />

        {/* Routes for login and signup */}
        <Route path="/login" element={!isLoggedIn ? <LoginForm /> : <Navigate to="/books" />} />
        <Route path="/signup" element={!isLoggedIn ? <SignupForm /> : <Navigate to="/books" />} />

        {/* Logout route */}
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;