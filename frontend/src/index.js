import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap.min.css';
import './index.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
