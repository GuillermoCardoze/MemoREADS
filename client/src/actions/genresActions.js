import {
  FETCH_GENRES_REQUEST,
  FETCH_GENRES_SUCCESS,
  FETCH_GENRES_FAILURE,
  ADD_GENRE_REQUEST,
  ADD_GENRE_SUCCESS,
  ADD_GENRE_FAILURE,
  UPDATE_GENRE_REQUEST,
  UPDATE_GENRE_SUCCESS,
  UPDATE_GENRE_FAILURE,
  DELETE_GENRE_REQUEST,
  DELETE_GENRE_SUCCESS,
  DELETE_GENRE_FAILURE,
} from './actionTypes';

// Fetch Genres Actions
export const fetchGenresRequest = () => ({
  type: FETCH_GENRES_REQUEST,
});

export const fetchGenresSuccess = (genres) => ({
  type: FETCH_GENRES_SUCCESS,
  payload: genres,
});

export const fetchGenresFailure = (error) => ({
  type: FETCH_GENRES_FAILURE,
  payload: error,
});

// Add Genre Actions
export const addGenreRequest = () => ({
  type: ADD_GENRE_REQUEST,
});

export const addGenreSuccess = (genre) => ({
  type: ADD_GENRE_SUCCESS,
  payload: genre,
});

export const addGenreFailure = (error) => ({
  type: ADD_GENRE_FAILURE,
  payload: error,
});

// Update Genre Actions
export const updateGenreRequest = () => ({
  type: UPDATE_GENRE_REQUEST,
});

export const updateGenreSuccess = (genre) => ({
  type: UPDATE_GENRE_SUCCESS,
  payload: genre,
});

export const updateGenreFailure = (error) => ({
  type: UPDATE_GENRE_FAILURE,
  payload: error,
});

// Delete Genre Actions
export const deleteGenreRequest = () => ({
  type: DELETE_GENRE_REQUEST,
});

export const deleteGenreSuccess = (id) => ({
  type: DELETE_GENRE_SUCCESS,
  payload: id,
});

export const deleteGenreFailure = (error) => ({
  type: DELETE_GENRE_FAILURE,
  payload: error,
});
