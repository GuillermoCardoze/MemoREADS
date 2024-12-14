import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <ul>
                {/* <li><Link to="/">Homepage</Link></li> */}
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/books/user/id">My Book List</Link></li>
                {/* <li><Link to="/book">My Books</Link></li> */}
            </ul>
        </nav>
    );
}

export default NavBar;