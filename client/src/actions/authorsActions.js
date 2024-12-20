import {
  FETCH_AUTHORS_REQUEST,
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHORS_FAILURE,
  ADD_AUTHOR_REQUEST,
  ADD_AUTHOR_SUCCESS,
  ADD_AUTHOR_FAILURE,
  UPDATE_AUTHOR_SUCCESS,
  DELETE_AUTHOR_SUCCESS,
} from "./actionTypes";

export const fetchAuthorsRequest = () => ({ type: FETCH_AUTHORS_REQUEST });
export const fetchAuthorsSuccess = (authors) => ({
  type: FETCH_AUTHORS_SUCCESS,
  payload: authors,
});
export const fetchAuthorsFailure = (error) => ({
  type: FETCH_AUTHORS_FAILURE,
  payload: error,
});

export const addAuthorRequest = () => ({ type: ADD_AUTHOR_REQUEST });
export const addAuthorSuccess = (author) => ({
  type: ADD_AUTHOR_SUCCESS,
  payload: author,
});
export const addAuthorFailure = (error) => ({
  type: ADD_AUTHOR_FAILURE,
  payload: error,
});

export const updateAuthorSuccess = (author) => ({
  type: UPDATE_AUTHOR_SUCCESS,
  payload: author,
});

export const deleteAuthorSuccess = (id) => ({
  type: DELETE_AUTHOR_SUCCESS,
  payload: id,
});
