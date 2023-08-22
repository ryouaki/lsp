import React, { createContext, useContext, useReducer } from 'react';

const SSStoreCtx = createContext();

function reducer(state, action) {
  return {};
}

export function StoreProvider(props = {}) {
  const [state, dispatch] = useReducer(reducer, {});

  return <SSStoreCtx.Provider value={{ state, dispatch }}>
    {props.children}
  </SSStoreCtx.Provider>
}

export function useStoreCtx() {
  const { state, dispatch } = useContext(SSStoreCtx);
  return { state, dispatch };
}