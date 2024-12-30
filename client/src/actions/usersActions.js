import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CHECK_SESSION_REQUEST,
  CHECK_SESSION_SUCCESS,
  CHECK_SESSION_FAILURE,
} from './actionTypes';

// Signup Actions
export const signupRequest = () => ({ type: SIGNUP_REQUEST });
export const signupSuccess = (user) => ({ type: SIGNUP_SUCCESS, payload: user });
export const signupFailure = (error) => ({ type: SIGNUP_FAILURE, payload: error });

// Signin Actions
export const signinRequest = () => ({ type: SIGNIN_REQUEST });
export const signinSuccess = (user) => ({ type: SIGNIN_SUCCESS, payload: user });
export const signinFailure = (error) => ({ type: SIGNIN_FAILURE, payload: error });

// Logout Actions
export const logoutRequest = () => ({ type: LOGOUT_REQUEST });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
export const logoutFailure = (error) => ({ type: LOGOUT_FAILURE, payload: error });

// Check Session Actions
export const checkSessionRequest = () => ({ type: CHECK_SESSION_REQUEST });
export const checkSessionSuccess = (user) => ({ type: CHECK_SESSION_SUCCESS, payload: user });
export const checkSessionFailure = (error) => ({ type: CHECK_SESSION_FAILURE, payload: error });

// Update UserBooks Actions
export const updateUserBooks = (newBook) => ({
  type: 'UPDATE_USER_BOOKS',
  payload: newBook,
});

export const removeUserBook = (bookId) => ({
  type: 'REMOVE_USER_BOOK',
  payload: bookId,
});

export const updateBookRating = (bookId, rating) => ({
  type: 'UPDATE_BOOK_RATING',
  payload: { bookId, rating },
});
