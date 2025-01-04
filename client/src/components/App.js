import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkSession } from '../slices/userSlice';
// import { checkSession } from './userSlice'; // Import the checkSession thunk
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm'; // Login form
import SignupForm from './SignupForm'; // Signup form
import Logout from './Logout'; // Logout component
import Display from './Display';
import Genres from './Genres';
import Authors from './Authors';
import NavBar from './NavBar';
import NewGenreForm from './NewGenreForm';
import NewBookForm from './NewBookForm';


function App() {
  const dispatch = useDispatch();
  

  // Dispatch checkSession on app load
  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  return (
    <Router>
      <NavBar /> 
      <h1>MemoREADS</h1>
      <Routes>
        <Route path="/books" element={<Display />} /> 
        <Route path="/add-book" element={<NewBookForm />} />
        <Route path="/genres" element={<Genres />} /> 
        <Route path="/add-genre" element={<NewGenreForm />} />
        <Route path="/authors" element={<Authors />} /> 
        <Route path="/login" element={<LoginForm />} /> 
        <Route path="/signup" element={<SignupForm />} /> 
        <Route path="/logout" element={<Logout />} /> 
      </Routes>
    </Router>
  );
}

export default App;
