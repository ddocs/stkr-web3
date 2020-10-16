import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../store/reducers';
import { CreateBeaconChain } from './screens/CreateBeaconChain';
import { ProviderDashboard } from './screens/ProviderDashboard';
import { UserActions, UserActionTypes } from '../../store/actions/UserActions';
import { useInitEffect } from '../../common/hooks/useInitEffect';
import { Query } from '@redux-requests/react';
import { IAuthorizeProviderResponse } from '../../store/apiMappers/authorizeProvider';
import { useAuthentication } from '../../common/utils/useAuthentications';
import { QueryError } from '../../components/QueryError/QueryError';
import { QueryLoading } from '../../components/QueryLoading/QueryLoading';
import { QueryEmpty } from '../../components/QueryEmpty/QueryEmpty';

interface IProviderStoreProps {
  isProvider: boolean;
}

interface IProviderProps extends IProviderStoreProps {
  authorizeProvider: typeof UserActions.authorizeProvider;
}

export const ProviderComponent = ({
  isProvider,
  authorizeProvider,
}: IProviderProps) => {
  const { isProviderAuthenticated } = useAuthentication();

  useInitEffect(() => {
    if (!isProviderAuthenticated) {
      authorizeProvider();
    }
  });

  const render = useCallback(() => {
    return isProvider ? <ProviderDashboard /> : <CreateBeaconChain />;
  }, []);

  return (
    <Query<IAuthorizeProviderResponse>
      type={UserActionTypes.AUTHORIZE_PROVIDER}
      errorComponent={QueryError}
      loadingComponent={QueryLoading}
      noDataMessage={<QueryEmpty />}
    >
      {render}
    </Query>
  );
};

export const Provider = connect(
  (state: IStoreState): IProviderStoreProps => {
    return {
      isProvider: true,
    };
  },
  {
    authorizeProvider: UserActions.authorizeProvider,
  },
)(ProviderComponent);
