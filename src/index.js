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
    actions: {
      test1(state, payload) {
        state.a = payload
      }
    },
    modules: {test: {
      state: {
        a: 3
      },
      actions: {
        test1(state, payload) {
          state.a = payload
        }
      }
    }},
  }},
  actions: {
    test1(state, payload) {
      state.a = payload;
    }
  }
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);
