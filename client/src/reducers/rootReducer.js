// rootReducer.js
import { combineReducers } from 'redux';
import { booksReducer } from './booksReducer';
import { authorsReducer } from './authorsReducer';
// Import other reducers...

export const rootReducer = combineReducers({
  books: booksReducer,
  authors: authorsReducer,
  // Add other reducers...
});
