import { useSelector } from 'react-redux';
import { IStoreState } from '../../store/reducers';

export function useAuthentication() {
  return useSelector<IStoreState, { isAuthenticated: boolean }>(state => ({
    isAuthenticated: !!state.user.isAuthenticated,
  }));
}
