import {
    fetchGenresRequest,
    fetchGenresSuccess,
    fetchGenresFailure,
    addGenreRequest,
    addGenreSuccess,
    addGenreFailure,
  } from '../actions/genresActions';
  
  export const fetchGenres = () => async (dispatch) => {
    dispatch(fetchGenresRequest());
    try {
      const response = await fetch('/genres', { method: 'GET' });
      if (!response.ok) throw new Error('Failed to fetch genres');
      const genres = await response.json();
      dispatch(fetchGenresSuccess(genres));
    } catch (error) {
      dispatch(fetchGenresFailure(error.message));
    }
  };
  
  export const addGenre = (genreData) => async (dispatch) => {
    dispatch(addGenreRequest());
    try {
      const response = await fetch('/genres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(genreData),
      });
      if (!response.ok) throw new Error('Failed to add genre');
      const genre = await response.json();
      dispatch(addGenreSuccess(genre));
    } catch (error) {
      dispatch(addGenreFailure(error.message));
    }
  };