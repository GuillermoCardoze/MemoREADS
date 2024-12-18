import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
// import Display from './Display';
// import NewBookForm from './NewBookForm';
// import { Link } from react-router-dom

import { useNavigate } from 'react-router-dom'; // Import useNavigate

const NavBar = ({ user, handleLogout, handleSignin, handleSignup }) => {
  const navigate = useNavigate(); // Initialize navigate
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleLogin = () => {
    setShowLogin((prev) => !prev);
    if (showSignUp) setShowSignUp(false);
  };

  const toggleSignUp = () => {
    setShowSignUp((prev) => !prev);
    if (showLogin) setShowLogin(false);
  };

  const goToAddBook = () => {
    navigate('/new-book-form'); // Navigate to the NewBookForm page
  };
  const goToDisplay = () => {
    navigate('/'); // Navigate to the NewBookForm page
  };

  return (
    <nav>
      <h1>MemoREADS App</h1>
      {user ? (
        <div>
          <h1>Welcome, {user.username}</h1>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={goToAddBook}>Add Book</button> {/* Navigate to /new-book-form */}
          <button onClick={goToDisplay}>My Books</button> {/* Navigate to / */}

        </div>
      ) : (
        <div>
          {showLogin && <Login handleSignin={handleSignin} closeLogin={toggleLogin} />}
          {showSignUp && <SignUp handleSignup={handleSignup} closeSignUp={toggleSignUp} />}
          {!showLogin && !showSignUp && (
            <>
              <button onClick={toggleLogin}>Login</button>
              <button onClick={toggleSignUp}>Sign Up</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
