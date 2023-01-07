import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import App from './App';
import store from './store';
import './styles/index.scss';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.transformRequest.unshift(data => decamelizeKeys(data));
axios.defaults.transformResponse.push(data => camelizeKeys(data));

const Root = () => (
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
