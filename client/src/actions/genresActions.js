import {
    FETCH_GENRES_REQUEST,
    FETCH_GENRES_SUCCESS,
    FETCH_GENRES_FAILURE,
    ADD_GENRE_REQUEST,
    ADD_GENRE_SUCCESS,
    ADD_GENRE_FAILURE,
  } from './actionTypes';
  
  // Fetch Genres Actions
  export const fetchGenresRequest = () => ({ type: FETCH_GENRES_REQUEST });
  export const fetchGenresSuccess = (genres) => ({ type: FETCH_GENRES_SUCCESS, payload: genres });
  export const fetchGenresFailure = (error) => ({ type: FETCH_GENRES_FAILURE, payload: error });
  
  // Add Genre Actions
  export const addGenreRequest = () => ({ type: ADD_GENRE_REQUEST });
  export const addGenreSuccess = (genre) => ({ type: ADD_GENRE_SUCCESS, payload: genre });
  export const addGenreFailure = (error) => ({ type: ADD_GENRE_FAILURE, payload: error });
  