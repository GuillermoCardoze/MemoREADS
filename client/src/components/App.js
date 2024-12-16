import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../thunks/booksThunks';
import { fetchAuthors } from '../thunks/authorsThunks';
import { fetchGenres } from '../thunks/genresThunks';
import { checkSession } from '../thunks/usersThunks';
import { signup, signin, logout } from '../thunks/usersThunks';

const App = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const booksState = useSelector((state) => state.books);
  const authorsState = useSelector((state) => state.authors);
  const genresState = useSelector((state) => state.genres);
  const { user, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchAuthors());
    dispatch(fetchGenres());
    dispatch(checkSession());
  }, [dispatch]);

  if (booksState.loading || authorsState.loading || genresState.loading) return <p>Loading...</p>;
  if (booksState.error) return <p>Books Error: {booksState.error}</p>;
  if (authorsState.error) return <p>Authors Error: {authorsState.error}</p>;
  if (genresState.error) return <p>Genres Error: {genresState.error}</p>;

  const handleSignin = (e) => {
    e.preventDefault();
    const credentials = { username, password };
    dispatch(signin(credentials));
  };

  const handleSignup = () => {
    const userData = { username: 'testuser', password: 'password123' };
    dispatch(signup(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Filter books by the logged-in user's ID
  const userBooks = user ? booksState.books.filter((book) => book.user_id === user.id) : [] || authorsState.books.filter((author)=> author.user_id === user.id) ||
genresState.books.filter((genre) => genre.book.user_id === user.id);
  return (
    <div>
      <h1>Authentication App</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {user ? (
        <div>
          <p>Welcome, {user.username}</p>
          
          <h2>Your Books</h2>
          <ul>
            {userBooks.map((book) => (
              <li key={book.id}>
                Book Title: {book.title}
                <br></br>
                Book Rating: {book.rating}
                <br></br>
                Author Name: {book.author.name}
                <br></br>
                Author Description: {book.author.description}
                <br></br>
                Genre: {book.genre.name}
                <br></br>
                Description: {book.genre.description}
                </li>
                
            ))}
          </ul>
          
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSignin}>
            <h2>Sign In</h2>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Sign In</button>
          </form>
          <br />
          <button onClick={handleSignup}>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default App;
