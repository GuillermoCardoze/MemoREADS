import {
  fetchAuthorsRequest,
  fetchAuthorsSuccess,
  fetchAuthorsFailure,
  addAuthorRequest,
  addAuthorSuccess,
  addAuthorFailure,
  updateAuthorSuccess,
  deleteAuthorSuccess,
} from "../actions/authorsActions";

export const fetchAuthors = () => async (dispatch) => {
  dispatch(fetchAuthorsRequest());
  try {
    const response = await fetch("/authors");
    if (!response.ok) throw new Error("Failed to fetch authors");
    const authors = await response.json();
    dispatch(fetchAuthorsSuccess(authors));
  } catch (error) {
    dispatch(fetchAuthorsFailure(error.message));
  }
};

export const addAuthor = (authorData) => async (dispatch) => {
  dispatch(addAuthorRequest());
  try {
    const response = await fetch("/authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authorData),
    });
    if (!response.ok) throw new Error("Failed to add author");
    const author = await response.json();
    dispatch(addAuthorSuccess(author));
    return author;
  } catch (error) {
    dispatch(addAuthorFailure(error.message));
    throw error;
  }
};

export const updateAuthor = (id, authorData) => async (dispatch) => {
  try {
    const response = await fetch(`/authors/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authorData),
    });
    if (!response.ok) throw new Error("Failed to update author");
    const updatedAuthor = await response.json();
    dispatch(updateAuthorSuccess(updatedAuthor));
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteAuthor = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/authors/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete author");
    dispatch(deleteAuthorSuccess(id));
  } catch (error) {
    console.error(error.message);
  }
};
