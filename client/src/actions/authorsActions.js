// actions/authorsActions.js
import {
    FETCH_AUTHORS_REQUEST,
    FETCH_AUTHORS_SUCCESS,
    FETCH_AUTHORS_FAILURE,
  } from './actionTypes';
  
  export const fetchAuthorsRequest = () => ({ type: FETCH_AUTHORS_REQUEST });
  export const fetchAuthorsSuccess = (authors) => ({
    type: FETCH_AUTHORS_SUCCESS,
    payload: authors,
  });
  export const fetchAuthorsFailure = (error) => ({
    type: FETCH_AUTHORS_FAILURE,
    payload: error,
  });
  