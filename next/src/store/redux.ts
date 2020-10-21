import { useCallback } from 'react';
import { Action } from 'redux';

import { useDispatch } from 'react-redux';

type Callback<T extends any[]> = (...args: T) => any;

export const useAction = <T extends any[]>(
  action: (...args: T) => Action,
): Callback<T> => {
  const dispatch = useDispatch();

  return useCallback((...args: T) => dispatch(action(...args)), [
    dispatch,
    action,
  ]);
};
