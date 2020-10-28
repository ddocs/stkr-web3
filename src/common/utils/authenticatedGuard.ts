import { RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { IStoreState } from '../../store/reducers';
import { StkrSdk } from '../../modules/api';
import { t } from './intl';
import { UserActions } from '../../store/actions/UserActions';

export const authenticatedGuard = function (
  request: any,
  action: RequestAction,
  store: Store<IStoreState>,
) {
  const stkrSdk = StkrSdk.getLastInstance();
  const providerAccessToken = store.getState().user.providerAccessToken;

  return {
    promise: (async () => {
      const isAuthorized = await stkrSdk.isAuthorized(providerAccessToken);

      if (!isAuthorized) {
        store.dispatch(UserActions.disconnect());
        throw new Error(t('error.not-authenticated'));
      }

      return await request.promise();
    })(),
  };
};
