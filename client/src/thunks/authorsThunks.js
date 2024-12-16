import {
    fetchAuthorsRequest,
    fetchAuthorsSuccess,
    fetchAuthorsFailure,
    addAuthorRequest,
    addAuthorSuccess,
    addAuthorFailure,
  } from '../actions/authorsActions';
  
  //Fetch Authors
  export const fetchAuthors = () => async (dispatch) => {
    dispatch(fetchAuthorsRequest());
    try {
      const response = await fetch('/authors', { method: 'GET' });
      if (!response.ok) throw new Error('Failed to fetch authors');
      const authors = await response.json();
      dispatch(fetchAuthorsSuccess(authors));
    } catch (error) {
      dispatch(fetchAuthorsFailure(error.message));
    }
  };
  
  // Add Author
  export const addAuthor = (authorData) => async (dispatch) => {
    dispatch(addAuthorRequest());
    try {
      const response = await fetch('/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authorData),
      });
      if (!response.ok) throw new Error('Failed to add author');
      const author = await response.json();
      dispatch(addAuthorSuccess(author));
    } catch (error) {
      dispatch(addAuthorFailure(error.message));
    }
  };