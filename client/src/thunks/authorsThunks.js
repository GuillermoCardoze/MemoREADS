// thunks/authorsThunks.js
import {
    fetchAuthorsRequest,
    fetchAuthorsSuccess,
    fetchAuthorsFailure,
  } from '../actions/authorsActions';
  
  export const fetchAuthors = () => async (dispatch) => {
    dispatch(fetchAuthorsRequest());
    try {
      const response = await fetch('http://localhost:5555/authors');
      if (!response.ok) throw new Error('Failed to fetch authors');
      const data = await response.json();
      dispatch(fetchAuthorsSuccess(data));
    } catch (error) {
      dispatch(fetchAuthorsFailure(error.message));
    }
  };
  