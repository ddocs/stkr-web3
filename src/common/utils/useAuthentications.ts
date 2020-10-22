import { useSelector } from 'react-redux';
import { IStoreState } from '../../store/reducers';

export function useAuthentication() {
  const { isConnected, isProviderAuthenticated } = useSelector<
    IStoreState,
    { isConnected: boolean; isProviderAuthenticated: boolean }
  >(state => ({
    isConnected: !!state.user.isConnected,
    isProviderAuthenticated: !!state.user.providerAccessToken,
  }));

  return { isConnected, isProviderAuthenticated };
}
