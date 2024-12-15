// thunks/genresThunks.js
import {
    fetchGenresRequest,
    fetchGenresSuccess,
    fetchGenresFailure,
  } from '../actions/genresActions';
  
  export const fetchGenres = () => async (dispatch) => {
    dispatch(fetchGenresRequest());
    try {
      const response = await fetch('http://localhost:5555/genres');
      if (!response.ok) throw new Error('Failed to fetch genres');
      const data = await response.json();
      dispatch(fetchGenresSuccess(data));
    } catch (error) {
      dispatch(fetchGenresFailure(error.message));
    }
  };
  