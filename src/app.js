import React from 'react';
import { useStoreCtx } from '../index';

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