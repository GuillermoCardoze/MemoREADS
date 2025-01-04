import { useSelector } from 'react-redux';

const Authors = () => {
  const { user } = useSelector(state => state.users); // access the users state

  if (!user) {
    return <p>No user is logged in</p>; // Display a message if there's no user
  }

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <p>Authors:</p>
      <ul>
        {user.books && user.books.map(book => (
          <li key={book.author.id}>{book.author.name} - Description: {book.author.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Authors;
