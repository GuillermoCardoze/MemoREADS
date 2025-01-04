// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice'
// import userReducer from './slices/userSlice'; // Adjust path as needed

// Configure the store
const store = configureStore({
  reducer: {
    users: userReducer, // Integrating the user slice reducer
    // Add other reducers here as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // If you encounter non-serializable values (e.g., Dates), tweak this
    }),
});

export default store;
