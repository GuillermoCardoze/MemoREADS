import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  UPDATE_BOOK_REQUEST,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAILURE,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  books: [],
  loading: false,
  error: null,
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Books
    case FETCH_BOOKS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BOOKS_SUCCESS:
      return { ...state, loading: false, books: action.payload };
    case FETCH_BOOKS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Add Book
    case ADD_BOOK_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_BOOK_SUCCESS:
      return { ...state, loading: false, books: [...state.books, action.payload] };
    case ADD_BOOK_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Update Book
    case UPDATE_BOOK_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case UPDATE_BOOK_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Delete Book
    case DELETE_BOOK_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    case DELETE_BOOK_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

//   export default booksReducer;
