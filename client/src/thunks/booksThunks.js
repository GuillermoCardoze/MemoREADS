// thunks/booksThunks.js
import {
    fetchBooksRequest,
    fetchBooksSuccess,
    fetchBooksFailure,
  } from '../actions/booksActions';
  
  export const fetchBooks = () => async (dispatch) => {
    dispatch(fetchBooksRequest());
    try {
      const response = await fetch('http://localhost:5555/books');
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      dispatch(fetchBooksSuccess(data));
    } catch (error) {
      dispatch(fetchBooksFailure(error.message));
    }
  };
  