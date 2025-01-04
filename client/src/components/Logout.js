import { useDispatch } from 'react-redux';
import { logout } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
// import { logout } from './userSlice'; // Import the logout action

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()) // Dispatch logout action
      .then(() => {
        // Optional: you can navigate the user to the login page if needed
        navigate('/login'); // If you're using react-router
      })
      .catch((error) => {
        console.error('Logout failed', error);
      });
  };

  return (
    <button onClick={handleLogout}>Logout</button> // The logout button
  );
};

export default Logout;
