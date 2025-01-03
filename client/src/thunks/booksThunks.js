import { 
  fetchBooksRequest, 
  fetchBooksSuccess, 
  fetchBooksFailure,
  // addBookRequest, 
  // addBookSuccess, 
  // addBookFailure, 
  updateBookRequest, 
  updateBookSuccess, 
  updateBookFailure,
  // deleteBookRequest,
  // deleteBookSuccess,
  // deleteBookFailure 
} from '../actions/booksActions';
// import { checkSession } from './usersThunks';

// Fetch Books Thunk
export const fetchBooks = () => async (dispatch) => {
  dispatch(fetchBooksRequest());
  try {
    const response = await fetch('http://localhost:5555/books');
    if (!response.ok) throw new Error('Failed to fetch books');
    const data = await response.json();
    dispatch(fetchBooksSuccess(data));
  } catch (error) {
    dispatch(fetchBooksFailure(error.message));
  }
};

// thunks/booksThunks.js
export const addBook = (bookData) => async (dispatch) => {
  try {
    const response = await fetch('/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData),
    });
    const newBook = await response.json();
    
    const updatedUser = await fetch('/check_session'); // Re-fetch the session user data
    const user = await updatedUser.json();
    dispatch({ type: 'USER_UPDATE', payload: user }); // Update Redux state
    return newBook;
  } catch (error) {
    console.error('Error adding book:', error);
    dispatch({ type: 'USER_ERROR', payload: error.message });
  }
};

// Update Book Thunk
export const updateBook = (id, bookData) => async (dispatch) => {
  dispatch(updateBookRequest());
  try {
    const response = await fetch(`http://localhost:5555/books/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) throw new Error('Failed to update book');
    const updatedBook = await response.json();
    dispatch(updateBookSuccess(updatedBook));
  } catch (error) {
    dispatch(updateBookFailure(error.message));
  }
};

// thunks/usersThunks.js
export const deleteBook = (bookId) => async (dispatch) => {
  try {
    await fetch(`/api/books/${bookId}`, { method: 'DELETE' }); // Adjust URL if needed
    const updatedUser = await fetch('/api/session'); // Re-fetch the session user data
    const user = await updatedUser.json();
    dispatch({ type: 'USER_UPDATE', payload: user }); // Update Redux state with new user data
  } catch (error) {
    console.error('Error deleting book:', error);
    dispatch({ type: 'USER_ERROR', payload: error.message });
  }
};
