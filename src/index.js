import React from 'react';
import ReactDOM from 'react-dom/client';

import { StoreProvider } from '../index';

import App from './app';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
