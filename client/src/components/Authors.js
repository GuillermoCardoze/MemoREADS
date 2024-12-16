import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAuthors, deleteAuthor } from "../thunks/authorsThunks";
import AuthorEditForm from "./AuthorEditForm";

const Authors = () => {
  const { authors, loading, error } = useSelector((state) => state.authors);
  const dispatch = useDispatch();
  const [editingAuthor, setEditingAuthor] = useState(null);

  React.useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteAuthor(id));
  };

  const handleEdit = (author) => {
    setEditingAuthor(author);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Authors</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            {author.name} - {author.description}
            <button onClick={() => handleEdit(author)}>Edit</button>
            <button onClick={() => handleDelete(author.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingAuthor && (
        <AuthorEditForm
          currentAuthor={editingAuthor}
          onClose={() => setEditingAuthor(null)}
        />
      )}
    </div>
  );
};

export default Authors;
