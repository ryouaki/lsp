import React from 'react';
import ReactDOM from 'react-dom/client';

import { StoreProvider } from '../index';

import App from './app';

const store = {
  state: {a:1, b: {c: 2}},
  modules: {user: {
    state: {
      a: 2
    },
    commits: {
      test1() {}
    }
  }},
  commits: {
    test1(state) { return state;}
  }
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);
