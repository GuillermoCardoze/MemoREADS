import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

const NavBar = ({ user, handleLogout, handleSignin, handleSignup }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleLogin = () => {
    setShowLogin((prev) => !prev);
    if (showSignUp) setShowSignUp(false); // Close SignUp if it's open
  };

  const toggleSignUp = () => {
    setShowSignUp((prev) => !prev);
    if (showLogin) setShowLogin(false); // Close Login if it's open
  };

  return (
    <nav>
      <h1>MemoREADS App</h1>
      {user ? (
        <div>
          <h1>Welcome, {user.username}</h1>
          <button onClick={handleLogout}>Logout</button>
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
