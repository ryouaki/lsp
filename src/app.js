import React from 'react';
import { useStoreCtx } from '../index';

export default function () {
  const { state, dispatch } = useStoreCtx((rootState) => {
    console.log(rootState)
    return rootState.a
  })
  console.log(state)
  return <div>Hello {state}</div>
}