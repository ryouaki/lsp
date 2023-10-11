import React, { createContext, useContext, useReducer } from 'react';

const SSStoreCtx = createContext();

const CommiMaps = {};
const defaultAction = state => state;

function createStore(store, key = '') {
  const {
    state = {},
    modules = {},
    actions = {}
  } = store;

  for (let module in modules) {
    state[module] = createStore(modules[module], key + '/' + module);
  }

  for (let action in actions) {
    CommiMaps[key + '/' + action] = actions[action];
  }

  return state;
}

function reducer(state, action) {
  const {
    path,
    payload
  } = action;
  console.log(action)
  const cbFunc = CommiMaps[path] || defaultAction;
  const keys = path.split('/')
  keys.shift() // remove the blank element from array
  const newState = updateStateByPath(keys, state, payload, cbFunc)
  return { ...newState };
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
    dispatch({ path, payload });
  } };
}

function updateStateByPath(keys = [], state, payload, action) {
  if (keys.length > 1) {
    const key = keys.shift();
    const val = updateStateByPath(keys, state[key], payload, action);
    state[key] = val;
  } else {
    action(state, payload);
  }
  return state;
}

