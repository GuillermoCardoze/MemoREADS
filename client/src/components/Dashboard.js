import React from 'react';
import { useDispatch } from 'react-redux';
// import { logout } from '../actions/userThunks';
import { logout } from '../thunks/usersThunks';

const Dashboard = ({ user }) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
            <h1>Welcome, {user.username}!</h1>
            <h2>Your Data:</h2>
            <h3>Books:</h3>
            <ul>
                {user.books?.map((book) => (
                    <li key={book.id}>{book.title}</li>
                ))}
            </ul>
            <h3>Genres:</h3>
            <ul>
                {user.genres?.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
            <h3>Authors:</h3>
            <ul>
                {user.authors?.map((author) => (
                    <li key={author.id}>{author.name}</li>
                ))}
            </ul>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
