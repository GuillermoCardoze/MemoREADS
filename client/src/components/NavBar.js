// NavBar.js
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';

const NavBar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user); // Get user from Redux store

  return (
    <nav>
      <ul>
        {/* Render different links based on whether the user is logged in */}
        {user ? (
          <div>
          <button onClick={() => navigate('/books')}>My Book</button>
          <button onClick={() => navigate('/authors')}>My Authors</button>
          <button onClick={() => navigate('/genres')}>My Genres</button>
          {/* <button onClick={() => navigate('/login')}>Logout</button> */}
          <Logout />
        </div>
      ) : (
        <div>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>        )}
      </ul>
    </nav>
  );
};

export default NavBar;
