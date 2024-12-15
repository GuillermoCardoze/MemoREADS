// rootReducer.js
import { combineReducers } from 'redux';
import { booksReducer } from './booksReducer';
import { authorsReducer } from './authorsReducer';
import { genresReducer } from './genresReducer';
// Import other reducers...

export const rootReducer = combineReducers({
  books: booksReducer,
  authors: authorsReducer,
  genres: genresReducer,
  // Add other reducers...
});
