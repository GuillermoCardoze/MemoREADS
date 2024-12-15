
// import React from "react";
// import App from "./components/App";
// import "./index.css";
// import { createRoot } from "react-dom/client";

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App />);


import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import configureAppStore from './store/configureStore';
import App from './components/App';

const store = configureAppStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

