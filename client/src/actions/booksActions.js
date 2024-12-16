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
} from './actionTypes';

// Fetch Books Actions
export const fetchBooksRequest = () => ({
  type: FETCH_BOOKS_REQUEST,
});

export const fetchBooksSuccess = (books) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: books,
});

export const fetchBooksFailure = (error) => ({
  type: FETCH_BOOKS_FAILURE,
  payload: error,
});

// Add Book Actions
export const addBookRequest = () => ({
  type: ADD_BOOK_REQUEST,
});

export const addBookSuccess = (book) => ({
  type: ADD_BOOK_SUCCESS,
  payload: book,
});

export const addBookFailure = (error) => ({
  type: ADD_BOOK_FAILURE,
  payload: error,
});

// Update Book Actions
export const updateBookRequest = () => ({
  type: UPDATE_BOOK_REQUEST,
});

export const updateBookSuccess = (book) => ({
  type: UPDATE_BOOK_SUCCESS,
  payload: book,
});

export const updateBookFailure = (error) => ({
  type: UPDATE_BOOK_FAILURE,
  payload: error,
});

// Delete Book Actions
export const deleteBookRequest = () => ({
  type: DELETE_BOOK_REQUEST,
});

export const deleteBookSuccess = (id) => ({
  type: DELETE_BOOK_SUCCESS,
  payload: id,
});

export const deleteBookFailure = (error) => ({
  type: DELETE_BOOK_FAILURE,
  payload: error,
});
