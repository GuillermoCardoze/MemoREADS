// reducers/authorsReducer.js

import {
    FETCH_AUTHORS_REQUEST,
    FETCH_AUTHORS_SUCCESS,
    FETCH_AUTHORS_FAILURE,
  } from '../actions/actionTypes';
  
  const initialState = {
    loading: false,
    authors: [],
    error: '',
  };
  
  export const authorsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_AUTHORS_REQUEST:
        return { ...state, loading: true };
      case FETCH_AUTHORS_SUCCESS:
        return { loading: false, authors: action.payload, error: '' };
      case FETCH_AUTHORS_FAILURE:
        return { loading: false, authors: [], error: action.payload };
      default:
        return state;
    }
  };
  