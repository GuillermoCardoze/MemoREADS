import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice'

const store = configureStore({
  reducer: {
    users: userReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export default store;
