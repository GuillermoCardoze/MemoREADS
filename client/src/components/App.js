// App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../thunks/booksThunks';
import { fetchAuthors } from '../thunks/authorsThunks';
import { fetchGenres } from '../thunks/genresThunks';
import BooksList from './BooksList';

const App = () => {
  // const dispatch = useDispatch();

  // const booksState = useSelector((state) => state.books);
  // const authorsState = useSelector((state) => state.authors);
  // const genresState = useSelector((state) => state.genres);

  // useEffect(() => {
  //   dispatch(fetchBooks());
  //   dispatch(fetchAuthors());
  //   dispatch(fetchGenres());
  // }, [dispatch]);

  // if (booksState.loading || authorsState.loading || genresState.loading) return <p>Loading...</p>;
  // if (booksState.error) return <p>Books Error: {booksState.error}</p>;
  // if (authorsState.error) return <p>Authors Error: {authorsState.error}</p>;
  // if (authorsState.error) return <p>Genres Error: {genresState.error}</p>;

  return (
    <div>
      {/* <h1>Books</h1>
      <ul>
        {booksState.books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
      <h1>Authors</h1>
      <ul>
        {authorsState.authors.map((author) => (
          <li key={author.id}>{author.name}</li>
        ))}
      </ul>
      <h1>Genres</h1>
      <ul>
        {genresState.genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))} */}
      {/* </ul> */}
        <BooksList />
    </div>
  );
};

export default App;








//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [user, setUser] = useState(null);
//   const [subname, setSubname] = useState("");
//   const [subpass, setSubpass] = useState("");

//   useEffect(() => {
//     fetch('/check_session').then((r) => {
//       if (r.ok) {
//         r.json().then((user) => setUser(user));
//       }
//     });
//   }, []);

//   function handleSubmit(e) {
//     e.preventDefault();
//     fetch("/signin", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username: subname, password: subpass }),
//     })
//       .then((res) => res.json())
//       .then((data) => setUser(data));
//   }

//   function handleSignup(e) {
//     e.preventDefault();
//     fetch("/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     })
//       .then((response) => response.json())
//       .then((data) => setUser(data));
//   }

//   function handleLogout() {
//     fetch("/logout", {
//       method: "DELETE",
//     }).then(() => setUser(null));
//   }

//   return user ? (
//     <>
//       <h1>Welcome, {user.username}</h1>
//       <button onClick={handleLogout}>Logout</button>
//     </>
//   ) : (
//     <>
//       <form onSubmit={handleSubmit}>
//         <h2>Username</h2>
//         <input
//           type="text"
//           value={subname}
//           onChange={(e) => setSubname(e.target.value)}
//         />
//         <h2>Password</h2>
//         <input
//           type="password"
//           value={subpass}
//           onChange={(e) => setSubpass(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//       <br />
//       <form onSubmit={handleSignup}>
//         <h2>Username</h2>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <h2>Password</h2>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//     </>
//   );
// }

//export default App;
