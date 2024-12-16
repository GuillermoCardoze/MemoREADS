import {
    FETCH_GENRES_REQUEST,
    FETCH_GENRES_SUCCESS,
    FETCH_GENRES_FAILURE,
    ADD_GENRE_REQUEST,
    ADD_GENRE_SUCCESS,
    ADD_GENRE_FAILURE,
  } from '../actions/actionTypes';
  
  const initialState = {
    genres: [],
    loading: false,
    error: null,
  };
  
  export const genresReducer = (state = initialState, action) => {
    switch (action.type) {
      // Fetch Genres
      case FETCH_GENRES_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_GENRES_SUCCESS:
        return { ...state, loading: false, genres: action.payload };
      case FETCH_GENRES_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Add Genre
      case ADD_GENRE_REQUEST:
        return { ...state, loading: true, error: null };
      case ADD_GENRE_SUCCESS:
        return {
          ...state,
          loading: false,
          genres: [...state.genres, action.payload],
        };
      case ADD_GENRE_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  
  