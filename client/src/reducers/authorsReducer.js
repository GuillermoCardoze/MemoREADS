import {
  FETCH_AUTHORS_REQUEST,
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHORS_FAILURE,
  ADD_AUTHOR_SUCCESS,
  UPDATE_AUTHOR_SUCCESS,
  DELETE_AUTHOR_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  authors: [],
  loading: false,
  error: null,
};

export const authorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUTHORS_REQUEST:
      return { ...state, loading: true };
    case FETCH_AUTHORS_SUCCESS:
      return { ...state, loading: false, authors: action.payload };
    case FETCH_AUTHORS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_AUTHOR_SUCCESS:
      return { ...state, authors: [...state.authors, action.payload] };
    case UPDATE_AUTHOR_SUCCESS:
      return {
        ...state,
        authors: state.authors.map((author) =>
          author.id === action.payload.id ? action.payload : author
        ),
      };
    case DELETE_AUTHOR_SUCCESS:
      return {
        ...state,
        authors: state.authors.filter((author) => author.id !== action.payload),
      };
    default:
      return state;
  }
};

//   export default authorsReducer;
