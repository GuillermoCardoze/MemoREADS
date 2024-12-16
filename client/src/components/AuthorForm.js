import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAuthor } from "../thunks/authorsThunks";

const AuthorForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAuthor({ name, description }));
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Add Author</button>
    </form>
  );
};

export default AuthorForm;
