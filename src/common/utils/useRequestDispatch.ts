import { useDispatch } from 'react-redux';
import { RequestAction } from '@redux-requests/core';
import { IRequestActionPromiseData } from '../types';

export function useRequestDispatch() {
  return useDispatch<
    (action: RequestAction) => Promise<IRequestActionPromiseData>
  >();
}
