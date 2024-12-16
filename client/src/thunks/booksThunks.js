import { 
    fetchBooksRequest, 
    fetchBooksSuccess, 
    fetchBooksFailure,
    addBookRequest, 
    addBookSuccess, 
    addBookFailure, 
    updateBookRequest, 
    updateBookSuccess, 
    updateBookFailure,
    deleteBookRequest,
    deleteBookSuccess,
    deleteBookFailure 
  } from '../actions/booksActions';
  
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
  
  // Add Book Thunk
  export const addBook = (bookData) => async (dispatch) => {
    dispatch(addBookRequest());
    try {
      const response = await fetch('http://localhost:5555/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) throw new Error('Failed to add book');
      const newBook = await response.json();
      dispatch(addBookSuccess(newBook));
    } catch (error) {
      dispatch(addBookFailure(error.message));
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
  
  // Delete Book Thunk
  export const deleteBook = (id) => async (dispatch) => {
    dispatch(deleteBookRequest());
    try {
      const response = await fetch(`http://localhost:5555/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete book');
      dispatch(deleteBookSuccess(id));
    } catch (error) {
      dispatch(deleteBookFailure(error.message));
    }
  };
  