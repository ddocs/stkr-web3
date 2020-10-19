import React from 'react';
import { connect } from 'react-redux';
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
import { useAction } from '../../store/redux';

interface IProviderProps {
  authorizeProvider: typeof UserActions.authorizeProvider;
}

export const BeaconCheck = () => {
  const dispatchFetchCurrentProviderSidecars = useAction(
    UserActions.fetchCurrentProviderSidecars,
  );
  useInitEffect(() => {
    dispatchFetchCurrentProviderSidecars();
  });

  return (
    <Query<IAuthorizeProviderResponse>
      type={UserActionTypes.FETCH_CURRENT_PROVIDER_SIDECARS}
      errorComponent={QueryError}
      loadingComponent={QueryLoading}
      noDataMessage={<CreateBeaconChain />}
    >
      {() => <ProviderDashboard />}
    </Query>
  );
};

export const ProviderComponent = ({ authorizeProvider }: IProviderProps) => {
  const { isProviderAuthenticated } = useAuthentication();

  useInitEffect(() => {
    authorizeProvider();
  });

  if (isProviderAuthenticated) {
    return <BeaconCheck />;
  }

  return (
    <Query<IAuthorizeProviderResponse>
      type={UserActionTypes.AUTHORIZE_PROVIDER}
      errorComponent={QueryError}
      loadingComponent={QueryLoading}
      noDataMessage={<QueryEmpty />}
    />
  );
};

export const Provider = connect(() => {}, {
  authorizeProvider: UserActions.authorizeProvider,
})(ProviderComponent);
