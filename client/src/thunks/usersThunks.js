import {
    signupRequest,
    signupSuccess,
    signupFailure,
    signinRequest,
    signinSuccess,
    signinFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    checkSessionRequest,
    checkSessionSuccess,
    checkSessionFailure,
  } from '../actions/usersActions';
import { fetchBooks } from './booksThunks';
import { fetchAuthors } from './authorsThunks';
import { fetchGenres } from './genresThunks';
  
  // Signup Thunk
  export const signup = (userData) => async (dispatch) => {
    dispatch(signupRequest());
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Signup failed');
      const user = await response.json();
      dispatch(signupSuccess(user));
    } catch (error) {
      dispatch(signupFailure(error.message));
    }
  };
  
  // Signin Thunk
  export const signin = (credentials) => async (dispatch) => {
    dispatch(signinRequest());
    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (response.status === 401) throw new Error('Invalid Credentials');
      const user = await response.json();
      dispatch(signinSuccess(user));
    } catch (error) {
      dispatch(signinFailure(error.message));
    }
  };
  
  // Logout Thunk
  export const logout = () => async (dispatch) => {
    dispatch(logoutRequest());
    try {
      const response = await fetch('/logout', {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Logout failed');
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailure(error.message));
    }
  };
  
  // Check Session Thunk
  export const checkSession = () => async (dispatch) => {
    dispatch(checkSessionRequest());
    try {
      const response = await fetch('/check_session');
      if (response.status === 401) throw new Error('Session not active');
      const user = await response.json();
      dispatch(checkSessionSuccess(user));
       // Fetch user-specific data
        dispatch(fetchBooks());
        dispatch(fetchAuthors());
        dispatch(fetchGenres());
    } catch (error) {
      dispatch(checkSessionFailure(error.message));
    }
  };
  