import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import './styles.css';

const NavBar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user); // Get user from Redux store

  return (
    <div className="navbar-container">
      <ul style={{ display: 'flex', margin: 0, padding: 0 }}>
        {/* Render different buttons based on whether the user is logged in */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="navbar-button" onClick={() => navigate('/books')}>My Books</button>
            <button className="navbar-button" onClick={() => navigate('/authors')}>All Authors</button>
            <button className="navbar-button" onClick={() => navigate('/genres')}>All Genres</button>
            <Logout />
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="navbar-button" onClick={() => navigate('/login')}>Login</button>
            <button className="navbar-button" onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
