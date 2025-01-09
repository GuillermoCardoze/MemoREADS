import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunks for Users
export const signup = createAsyncThunk('users/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Signup failed');
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const signin = createAsyncThunk('users/signin', async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch('/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (response.status === 401) throw new Error('Invalid Credentials');
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('users/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('/logout', { method: 'DELETE' });
    if (!response.ok) throw new Error('Logout failed');
    return true;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const checkSession = createAsyncThunk('users/checkSession', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('/check_session');
    if (response.status === 401) throw new Error('Session not active');
    return await response.json(); // returns the user data
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async Thunks for Books
export const fetchBooks = createAsyncThunk('users/fetchBooks', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('/books');
    if (!response.ok) throw new Error('Failed to fetch books');
    return await response.json(); // Return the fetched books
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const postBook = createAsyncThunk('users/postBook', async (bookData, { rejectWithValue }) => {
  try {
    const response = await fetch('/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) throw new Error('Failed to post book');
    return await response.json(); // Return the newly created book
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateBook = createAsyncThunk('users/updateBook', async (bookData, { rejectWithValue }) => {
  try {
    const { id, ...data } = bookData;
    const response = await fetch(`/books/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update book');
    return await response.json(); // Return the updated book
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteBook = createAsyncThunk('users/deleteBook', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`/books/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete book');
    return id; // Return the deleted book's ID
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async Thunks for Authors
export const fetchAuthors = createAsyncThunk('users/fetchAuthors', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('/authors');
    if (!response.ok) throw new Error('Failed to fetch authors');
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const postAuthor = createAsyncThunk('users/postAuthor', async (authorData, { rejectWithValue }) => {
  try {
    const response = await fetch('/authors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authorData),
    });
    if (!response.ok) throw new Error('Author already exits');
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


// Async Thunks for Genres
export const fetchGenres = createAsyncThunk('users/fetchGenres', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('/genres');
    if (!response.ok) throw new Error('Failed to fetch genres');
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const postGenre = createAsyncThunk('users/postGenre', async (genreData, { rejectWithValue }) => {
    try {
      const response = await fetch('/genres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(genreData),
      });
  
      if (!response.ok) throw new Error('Genre already exist.');
      
      const data = await response.json();
      console.log("Posted Genre:", data);
      return data; // Return the genre data to be used in the reducer
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  });
  

// User Slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: {
        books: [],
        authors: [],
        genres: [],
    },
    authors: [],
    genres: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle user-related actions
    builder
      .addCase(signup.pending, (state) => { state.loading = true; state.error = null; })
    //   .addCase(signup.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(signup.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload; // Populate user data
        })
      .addCase(signup.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(signin.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signin.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
      .addCase(signin.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(logout.pending, (state) => { state.loading = true; })
      .addCase(logout.fulfilled, (state) => { state.loading = false; state.user = null; })
      .addCase(logout.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(checkSession.pending, (state) => { state.loading = true; })
      .addCase(checkSession.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload; 
          state.user.books = action.payload.books || [];
          state.user.authors = action.payload.authors || [];
          state.user.genres = action.payload.genres || [];
        })
      .addCase(checkSession.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; 
      state.user = null; 
      })  
      
      
     // Handle Books actions
      .addCase(fetchBooks.pending, (state) => { state.loading = true; })
      .addCase(fetchBooks.fulfilled, (state, action) => { 
        state.loading = false;
        state.user.books = action.payload 
    })
      .addCase(fetchBooks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(postBook.pending, (state) => { state.loading = true; })
      .addCase(postBook.fulfilled, (state, action) => { 
        state.loading = false 
        state.user = {...state.user, books: [...state.user.books, action.payload]}
        //if state.user authors does not have the action.payloads author add to state.user.authors
        // Add the author if not already present
        state.user = {
            ...state.user,
            authors: state.user.authors.includes(action.payload.author)
                ? state.user.authors
                : [...state.user.authors, action.payload.author],
        };
        //if state.user genres does not have the action.payloads genre add to state.user.genres
        // Add the genre if not already present
        state.user = {
            ...state.user,
            genres: state.user.genres.includes(action.payload.genre)
                ? state.user.genres
                : [...state.user.genres, action.payload.genre],
        };
    })

      .addCase(postBook.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateBook.pending, (state) => { state.loading = true; })
      .addCase(updateBook.fulfilled, (state, action) => { state.loading = false; state.user.books = state.user.books.map((book) => book.id === action.payload.id ? action.payload : book); })
      .addCase(updateBook.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(deleteBook.pending, (state) => { state.loading = true; })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
      
        // Filter out the deleted book
        const filteredBooks = state.user.books.filter(book => book.id !== action.payload);
      
        // Update state with the filtered books
        state.user = {
          ...state.user,
          books: filteredBooks,
          authors: filteredBooks.map(book => book.author),
          genres: filteredBooks.map(book => book.genre),
        };
      })
            .addCase(deleteBook.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Handle Authors actions
      .addCase(fetchAuthors.pending, (state) => { state.loading = true; })
      .addCase(fetchAuthors.fulfilled, (state, action) => { state.loading = false; state.authors = action.payload; })
      .addCase(fetchAuthors.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(postAuthor.pending, (state) => { state.loading = true; })
      .addCase(postAuthor.fulfilled, (state, action) => { state.loading = false; state.authors = [...state.authors, action.payload]; })
      .addCase(postAuthor.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Handle Genres actions
      .addCase(fetchGenres.pending, (state) => { state.loading = true; })
      .addCase(fetchGenres.fulfilled, (state, action) => { state.loading = false; state.genres = action.payload; })
      .addCase(fetchGenres.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(postGenre.pending, (state) => { state.loading = true; })
      .addCase(postGenre.fulfilled, (state, action) => {console.log('New Genre:', action.payload); state.loading = false; state.genres = [...state.genres, action.payload]; })
      .addCase(postGenre.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
  },
});

export default userSlice.reducer;