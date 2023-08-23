import React, { createContext, useContext, useReducer } from 'react';

const SSStoreCtx = createContext();

const CommiMaps = {};

function createStore(store, key = '') {
  const {
    state = {},
    modules = {},
    commits = {}
  } = store;

  for (let module in modules) {
    state[module] = createStore(modules[module], key + '/' + module);
  }

  for (let commit in commits) {
    CommiMaps[key + '/' + commit] = commits[commit];
  }

  return state;
}

function reducer(state, action) {
  return {};
}

export function StoreProvider(props = {}) {
  const {
    store = {},
    children
  } = props;
  const [state, dispatch] = useReducer(reducer, createStore(store));

  return <SSStoreCtx.Provider value={{ state, dispatch }}>
    {children}
  </SSStoreCtx.Provider>
}

export function useStoreCtx(stateMapProps) {
  const { state, dispatch } = useContext(SSStoreCtx);
  
  return { state: stateMapProps(state), dispatch: function (path, payload) {
    const commit = CommiMaps[path] || function () {};

  }};
}