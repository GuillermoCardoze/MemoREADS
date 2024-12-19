import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';

const NavBar = ({ user }) => {
  const navigate = useNavigate();
  // const [showLogin, setShowLogin] = useState(false);
  // const [showSignUp, setShowSignUp] = useState(false);
  

  return (
    <nav>
      <h1>MemoREADS App</h1>
      {user ? (
        <div>
          <h1>Welcome, {user.username}</h1>
          <button onClick={() => navigate('/new-book-form')}>Add Book</button>
          <button onClick={() => navigate(`/${user.username}/books-list`)}>My Books</button>
          {/* <button onClick={() => navigate('/login')}>Logout</button> */}
          <Logout />
        </div>
      ) : (
        <div>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;