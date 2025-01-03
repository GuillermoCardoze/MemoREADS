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
  SET_GENRES,
  ADD_GENRE
} from "../actions/actionTypes";


const initialState = {
  genres: [],
  loading: false,
  error: null,
};

export const genresReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GENRES_REQUEST:
    case ADD_GENRE_REQUEST:
    case UPDATE_GENRE_REQUEST:
    case DELETE_GENRE_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_GENRES_SUCCESS:
      return { ...state, loading: false, genres: action.payload };
    case ADD_GENRE_SUCCESS:
      return { ...state, loading: false, genres: [...state.genres, action.payload] };
    case UPDATE_GENRE_SUCCESS:
      return {
        ...state,
        loading: false,
        genres: state.genres.map((genre) =>
          genre.id === action.payload.id ? action.payload : genre
        ),
      };
    case DELETE_GENRE_SUCCESS:
      return {
        ...state,
        loading: false,
        genres: state.genres.filter((genre) => genre.id !== action.payload),
      };

    case FETCH_GENRES_FAILURE:
    case ADD_GENRE_FAILURE:
    case UPDATE_GENRE_FAILURE:
    case DELETE_GENRE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SET_GENRES:
      return {
        ...state,
        genres: action.payload,  // Set genres from the API
      };
    case ADD_GENRE:
      return {
        ...state,
        genres: [...state.genres, action.payload],  // Add the new genre to the list
      };

    default:
      return state;
  }
};

//   export default genresReducer;
