import { useDispatch } from 'react-redux';
import { logout } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()) 
      .then(() => {
        navigate('/login'); 
      })
      .catch((error) => {
        console.error('Logout failed', error);
      });
  };

  return (
    <button onClick={handleLogout}>Logout</button> 
  );
};

export default Logout;
