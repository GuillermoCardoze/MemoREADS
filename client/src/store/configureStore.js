import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';


const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools in non-production environments
  });

  return store;
};

export default configureAppStore;
