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
  } from '../actions/actionTypes';
  
  const initialState = {
    user: null,
    loading: false,
    error: null,
  };
  
  export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      // Signup
      case SIGNUP_REQUEST:
        return { ...state, loading: true, error: null };
      case SIGNUP_SUCCESS:
        return { ...state, loading: false, user: action.payload };
      case SIGNUP_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Signin
      case SIGNIN_REQUEST:
        return { ...state, loading: true, error: null };
      case SIGNIN_SUCCESS:
        return { ...state, loading: false, user: action.payload };
      case SIGNIN_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Logout
      case LOGOUT_REQUEST:
        return { ...state, loading: true, error: null };
      case LOGOUT_SUCCESS:
        return { ...state, loading: false, user: null };
      case LOGOUT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Check Session
      case CHECK_SESSION_REQUEST:
        return { ...state, loading: true, error: null };
      case CHECK_SESSION_SUCCESS:
        return { ...state, loading: false, user: action.payload };
      case CHECK_SESSION_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  
  