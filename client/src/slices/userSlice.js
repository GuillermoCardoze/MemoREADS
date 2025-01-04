import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunks
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
  
// Slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    removeUserBook: (state, action) => {
      state.user.books = state.user.books.filter((book) => book.id !== action.payload);
    },
    updateBookRating: (state, action) => {
      const { bookId, rating } = action.payload;
      const book = state.user.books.find((book) => book.id === bookId);
      if (book) book.rating = rating;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Signin
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check Session
      .addCase(checkSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        const { id, username, books } = action.payload;
        state.loading = false;
        state.user = {
          id,
          username,
          books: books.map((book) => ({
            id: book.id,
            title: book.title,
            rating: book.rating,
            genre: {
              id: book.genre.id,
              name: book.genre.name,
              description: book.genre.description,
            },
            author: {
              id: book.author.id,
              name: book.author.name,
              description: book.author.description,
            },
          })),
        };
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Actions and Reducer Export
export const { removeUserBook, updateBookRating } = userSlice.actions;
export default userSlice.reducer;
