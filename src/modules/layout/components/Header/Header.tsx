import { Query } from '@redux-requests/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { QueryEmpty } from '../../../../components/QueryEmpty/QueryEmpty';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import { IStoreState } from '../../../../store/reducers';
import { isConnected } from '../../../../store/reducers/userReducer';
import { HeaderComponent } from './HeaderComponent';

export const Header = () => {
  const isAuth = useSelector((state: IStoreState) => isConnected(state.user));

  const authorized = (
    <Query<IUserInfo | null>
      type={UserActionTypes.FETCH_ACCOUNT_DATA}
      errorComponent={QueryError}
      loadingComponent={QueryLoading}
      noDataMessage={<QueryEmpty />}
      showLoaderDuringRefetch={false}
    >
      {({ data }) => {
        return (
          <HeaderComponent
            isAuth={isAuth}
            walletAddress={data?.address}
            walletType={data?.walletType}
            ethereumBalance={data?.ethereumBalance}
            ankrBalance={data?.ankrBalance}
            bnbBalance={data?.bnbBalance}
          />
        );
      }}
    </Query>
  );

  const notAuthorized = <HeaderComponent isAuth={isAuth} />;

  return isAuth ? authorized : notAuthorized;
};
