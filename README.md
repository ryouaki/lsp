# react-single-store
A single store state managment for react hooks.

# use
```js
  // index.js
  ...
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

  // app.js
  import React from 'react';
  import { useStoreCtx } from 'react-single-store';

  export default function () {
    const { state, dispatch } = useStoreCtx((rootState) => {
      console.log(rootState)
      return rootState.a +' ' + rootState.user.a + ' ' + rootState.user.test.a
    })
    console.log(state)

    function clickHandle () {
      dispatch("/test1", Date.now())
    }
    function clickHandle1 () {
      dispatch("/user/test1", Date.now())
    }
    function clickHandle2 () {
      dispatch("/user/test/test1", Date.now())
    }
    return <>
      <div onClick={clickHandle}>Hello {state}</div>
      <div onClick={clickHandle1}>Hello {state}</div>
      <div onClick={clickHandle2}>Hello {state}</div>
    </>
  }
```