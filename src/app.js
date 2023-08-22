import React from 'react';
import { useStoreCtx } from '../index';

export default function () {
  const { state, dispatch } = useStoreCtx({})
  return <div>Hello</div>
}