import { useSelector } from 'react-redux';

const Display = () => {
  const { user } = useSelector(state => state.users); // access the users state

  if (!user) {
    return <p>No user is logged in</p>; // Display a message if there's no user
  }

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <p>Books:</p>
      <ul>
        {user.books && user.books.map(book => (
          <li key={book.id}>{book.title} - Rating: {book.rating}</li>
        ))}
      </ul>
    </div>
  );
};

export default Display;
