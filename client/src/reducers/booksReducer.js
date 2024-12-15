// reducers/booksReducer.js
import {
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_FAILURE,
} from '../actions/actionTypes';
  
  const initialState = {
    loading: false,
    books: [],
    error: '',
  };
  
  export const booksReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BOOKS_REQUEST:
        return { ...state, loading: true };
      case FETCH_BOOKS_SUCCESS:
        return { loading: false, books: action.payload, error: '' };
      case FETCH_BOOKS_FAILURE:
        return { loading: false, books: [], error: action.payload };
      default:
        return state;
    }
  };
  