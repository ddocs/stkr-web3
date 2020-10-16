import { useSelector } from 'react-redux';
import { IStoreState } from '../../store/reducers';
import { useQuery } from '@redux-requests/react';
import { UserActionTypes } from '../../store/actions/UserActions';

export function useAuthentication() {
  const { isConnected } = useSelector<IStoreState, { isConnected: boolean }>(
    state => ({
      isConnected: !!state.user.isConnected,
    }),
  );

  const { data } = useQuery({
    type: UserActionTypes.AUTHORIZE_PROVIDER,
  });

  return { isConnected, isProviderAuthenticated: !!data };
}
