// actions/genresActions.js
import {
    FETCH_GENRES_REQUEST,
    FETCH_GENRES_SUCCESS,
    FETCH_GENRES_FAILURE,
  } from './actionTypes';
  
  export const fetchGenresRequest = () => ({ type: FETCH_GENRES_REQUEST });
  export const fetchGenresSuccess = (genres) => ({
    type: FETCH_GENRES_SUCCESS,
    payload: genres,
  });
  export const fetchGenresFailure = (error) => ({
    type: FETCH_GENRES_FAILURE,
    payload: error,
  });
  