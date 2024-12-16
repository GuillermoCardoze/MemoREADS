import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAuthor } from "../thunks/authorsThunks";

const AuthorEditForm = ({ currentAuthor, onClose }) => {
  const [name, setName] = useState(currentAuthor.name);
  const [description, setDescription] = useState(currentAuthor.description);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { name, description };
    dispatch(updateAuthor(currentAuthor.id, updatedData));
    onClose(); // Optional: close the form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Author</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Author Name"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Author Description"
        required
      />
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default AuthorEditForm;
