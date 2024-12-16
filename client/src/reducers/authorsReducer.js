import {
    FETCH_AUTHORS_REQUEST,
    FETCH_AUTHORS_SUCCESS,
    FETCH_AUTHORS_FAILURE,
    ADD_AUTHOR_REQUEST,
    ADD_AUTHOR_SUCCESS,
    ADD_AUTHOR_FAILURE,
  } from '../actions/actionTypes';
  
  const initialState = {
    authors: [],
    loading: false,
    error: null,
  };
  
  export const authorsReducer = (state = initialState, action) => {
    switch (action.type) {
      // Fetch Authors
      case FETCH_AUTHORS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_AUTHORS_SUCCESS:
        return { ...state, loading: false, authors: action.payload };
      case FETCH_AUTHORS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Add Author
      case ADD_AUTHOR_REQUEST:
        return { ...state, loading: true, error: null };
      case ADD_AUTHOR_SUCCESS:
        return {
          ...state,
          loading: false,
          authors: [...state.authors, action.payload],
        };
      case ADD_AUTHOR_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  
  